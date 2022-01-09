"""

Jinja template for handling js and css files to aid in cache busting
from webpacked js and css files.

"""

from flask import Blueprint, url_for

from functools import lru_cache
import os
import pathlib
import re

if not (DIGEST_FOLDER_NAME := os.environ.get("DIGEST_FOLDER_NAME")):
    raise EnvironmentError("DIGEST_FOLDER_NAME environment var not set")

print(DIGEST_FOLDER_NAME)


def strip_hash_from_filename(x):
    """

    Removes the hash from the filename.
    filename.12345asdfg.ext -> filename.ext

    :param x:
    :return:
    """

    return x.suffix[1:] + "/" + x.stem.split(".")[0] + x.suffix


def validate_filename_arg(filename):
    """

    Validate the file name, make sure only js and css files are processed.

    :param filename:
    :return:

    """
    if not filename:
        raise ValueError("filename is not an argument.")

    if not re.match(r"^((js|css).*\.(js|css)$)", filename):
        raise ValueError(
            f"webpacked_bp_url_for_js filename: {filename} does not start or end with 'js'."
        )


class FlaskWebpackedBlueprint(object):
    @classmethod
    def create_blueprint(cls, name, file_name=__name__, js_dir="js"):
        """
        Create a blueprint and run webpack on relevant js files.
        This handles the ES6 modules by calling webpack as a subprocess.

        :param name:
        :return:
        """
        bp = Blueprint(
            name,
            file_name,
            template_folder="templates",
            static_url_path=f"/static",
            static_folder="static",
            url_prefix=name,
        )

        # make entry point?

        # webpacking static js files
        js_path = pathlib.Path(bp.static_folder) / js_dir

        # verify webpack config
        webpack_cfg = js_path / "webpack.config.js"

        # run webpack
        if not webpack_cfg.is_file():
            raise FileExistsError(f"{webpack_cfg.as_posix()} is missing.")

        bp.is_webpacked = True
        bp.js_dir = js_dir
        return bp

    def __init__(self, app=None):
        """

        Initialize and mutate the app

        :param app:
        """
        self.app = app
        self.dist_folder = "dist"  # hardcoded and gross

        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        """

        Mutate the app_factory

        :param app:
        :return:
        """
        self.app = app
        app.add_template_global(self.webpacked_url_for)

    def _get_bp_name_from_endpoint(self, endpoint) -> str:
        """

        Get the blueprint name from the endpoint.

        :param endpoint:
        :return:
            blueprint name
        """
        if not "." in endpoint:
            raise ValueError(
                f"Webpacked_bp_url_for_js endpoint: {endpoint} doesn't look like it is pointint to a blueprint."
            )

        bp_name, _ = endpoint.split(".")
        if not (self.app.blueprints[bp_name].is_webpacked):
            raise ValueError(
                f"f{self.app.blueprints[bp_name]} has not been been created by \
                 FlaskWebPackedBlueprint.create_blueprint class method.. "
            )

        return bp_name

    def get_static_resource_folder(self, endpoint: str, ext: str) -> pathlib.Path:
        """

        Gets the static folder from the endpoint.

        :param endpoint:
        :return:
            static dist folder pathlib.Path
        """
        bp_name = self._get_bp_name_from_endpoint(endpoint)
        if not (bp_name in self.app.blueprints):
            raise ValueError(f"{bp_name} is not a registered blueprpint.")

        return pathlib.Path(self.app.blueprints[bp_name].static_folder) / ext


    @lru_cache(1)
    def get_minified_file_map(self, static_folder: pathlib.Path) -> dict:
        """

        This function is cached to avoid disk reads. This only should fire
        if the contents of the dist files have changed from a webpack.

        :param static_folder:
            str of the static folder.
        :return:
            dict of { file.(js|css) : file.[md5hash].(js|css)
        """

        print("Recalculating hash_file_map")
        static_files = static_folder.rglob("*.*.*s")

        return {strip_hash_from_filename(v): v.relative_to(static_folder.parent) for v in static_files}

    @lru_cache(2) # this needs to match the amount of directories in the dist folder, gross
    def reset_get_hash_file_map_cache(self, mtime: float) -> None:
        """

        If cache holds a different modified time, we want to clear the cache
        of the get_hash_file_map function.

        :param mtime:
            folders modified time
        :return:
            None

        """
        self.get_minified_file_map.cache_clear()
        return None

    def validate_cache(self, static_folder: pathlib.Path):
        """

        Check over dist sub folders

        :param static_folder:
        :return:
        """

        for folder in static_folder.iterdir():
            if not folder.stem.startswith('.'): #skip hidden folders
                self.reset_get_hash_file_map_cache(folder.stat().st_mtime)

    def webpacked_url_for(self, endpoint: str, **values) -> str:
        """

        This function builds a map between the entry file for your js file
        and the webpacked file.

        THis should be modified to check the directorys modified time
        to invalidate the cache.

        :param endpoint:
        :param values:
        :return:
        """
        filename = values.get("filename")
        ext = filename.split(os.sep)[0]

        validate_filename_arg(filename)

        static_folder = self.get_static_resource_folder(endpoint, ext)

        self.validate_cache(static_folder)

        file_map = self.get_minified_file_map(static_folder)

        return url_for(endpoint, filename=file_map[filename].as_posix())
