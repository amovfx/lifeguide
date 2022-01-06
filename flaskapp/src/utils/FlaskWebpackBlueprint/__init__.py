from flask import Blueprint, url_for
from functools import lru_cache
from datetime import datetime, timezone
import pathlib
import re
import subprocess as sp


def remove_hash(x):
    return x.suffix[1:] + "/" + x.stem.split(".")[0] + x.suffix


def validate_filename_arg(filename):
    if not filename:
        raise ValueError("filename is not an argument.")

    if not re.match(r"^((js|css).*\.(js|css)$)", filename):
        raise ValueError(
            f"webpacked_bp_url_for_js filename: {filename} does not start or end with 'js'."
        )


class FlaskWebpackedBlueprint(object):
    webpack_config = """
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
mode: "production",
entry : "./main.js",
output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist/")
},
plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()]
}
    """

    @classmethod
    def create_ES6_blueprint(cls, name, file_name=__name__, js_dir="js"):
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

        Initialize and mutate
        :param app:
        """
        self.app = app
        self.dist_folder = "/dist/"

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

    def get_bp_name_from_endpoint(self, endpoint):
        if not "." in endpoint:
            raise ValueError(
                f"webpacked_bp_url_for_js endpoint: {endpoint} doesn't look like it is pointint to a blueprint."
            )

        bp_name, _ = endpoint.split(".")
        if not (self.app.blueprints[bp_name].is_webpacked):
            raise ValueError(
                f"f{self.app.blueprints[bp_name]} has not been webpacked. "
            )
        return bp_name

    def get_static_folder(self, endpoint):
        bp_name = self.get_bp_name_from_endpoint(endpoint)
        if not (bp_name in self.app.blueprints):
            raise ValueError(f"{bp_name} is not a registered blueprpint.")

        return self.app.blueprints[bp_name].static_folder

    @lru_cache(1)
    def get_hash_file_map(self, static_folder):
        print("Recalculating hash_file_map")
        folder_path = pathlib.Path(static_folder + self.dist_folder)
        static_files = folder_path.rglob("*.*.*s")
        return {remove_hash(v): v.relative_to(static_folder) for v in static_files}

    @lru_cache(2)
    def check_mtime(self, mtime):
        self.get_hash_file_map.cache_clear()
        return None

    def validate_cache(self, static_folder):
        """

        Check over dist sub folders

        :param static_folder:
        :return:
        """
        folders = pathlib.Path(static_folder + self.dist_folder).glob("*s")
        for folder in folders:
            self.check_mtime(folder.stat().st_mtime)

    def webpacked_url_for(self, endpoint, **values):
        """

        This function builds a map between the entry file for your js file
        and the webpacked file.

        THis should be modified to check the directorys modified time
        to invalidate the cache.

        :param endpoint:
        :param values:
        :return:
        """
        # validate filename
        filename = values.get("filename")

        validate_filename_arg(filename)

        static_folder = self.get_static_folder(endpoint)
        self.validate_cache(static_folder)

        file_map = self.get_hash_file_map(static_folder)

        return url_for(endpoint, filename=file_map[filename].as_posix())
