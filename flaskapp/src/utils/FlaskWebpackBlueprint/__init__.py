from flask import Blueprint, url_for
from functools import lru_cache
import pathlib
import subprocess as sp


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
        if webpack_cfg.is_file():
            result = sp.check_call("npm run packjs", shell=True, cwd=js_path,)
            print(result)
        else:
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
        self.dist_folder = "/dist"

        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        """

        Mutate the app
        :param app:
        :return:
        """
        self.app = app
        app.add_template_global(self.webpacked_url_for)

    @lru_cache(maxsize=16)
    def webpacked_url_for(self, endpoint, **values):
        """

        This function builds a map between the entry file for your js file
        and the webpacked file.

        :param endpoint:
        :param values:
        :return:
        """

        filename = values.get("filename")
        if not filename:
            raise ValueError("filename is not an argument.")

        if not (filename.endswith("js") and filename.startswith("js")):
            raise ValueError(
                f"webpacked_bp_url_for_js filename: {filename} does not start or end with 'js'."
            )

        if not "." in endpoint:
            raise ValueError(
                f"webpacked_bp_url_for_js endpoint: {endpoint} doesn't look like it is pointint to a blueprint."
            )

        bp_name, _ = endpoint.split(".")
        if not (self.app.blueprints[bp_name].is_webpacked):
            raise ValueError(
                f"f{self.app.blueprints[bp_name]} has not been webpacked. "
            )

        folder = self.app.blueprints[bp_name].static_folder + self.dist_folder
        paths = list(pathlib.Path(folder).glob("*.js"))
        js_file_name = filename.split("/")[1].split(".")[0]
        packed_js_file = [
            path
            for path in paths
            if path.is_file() and path.name.startswith(js_file_name)
        ][0]
        js_file_name = pathlib.Path(self.dist_folder) / packed_js_file.name
        return url_for(endpoint, filename=js_file_name.as_posix())
