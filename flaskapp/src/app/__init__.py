"""

App factory/

"""
import os
from flask import Flask, url_for
from flask_misaka import Misaka

from ..utils.FlaskWebpackBlueprint import FlaskWebpackedBlueprint

from .cache import cache
from .config import DevelopmentConfig, TestConfig, ProductionConfig

ENV_CONFIGS = {
    "development": DevelopmentConfig,
    "testing": TestConfig,
    "production": ProductionConfig,
}


def set_config(app, env_name: str = os.environ.get("FLASK_ENV")) -> None:

    """

    Set the apps configuration object from the environment variable.

    :param app:
        Flask app
    :param env_name:
        environment variable
    :return:
    """
    if env_name:
        if (config_class := ENV_CONFIGS.get(env_name)) :
            app.config.from_object(config_class)
        else:
            raise ValueError("Config class not available.")

    else:
        raise ValueError("Env not available.")


def register_blueprints(app):
    """

    Register blueprints.

    :param app:
    :return:
    """
    # blueprints
    from ..book import book_bp
    from .error_handlers import error_handler_bp

    app.register_blueprint(book_bp)
    app.register_blueprint(error_handler_bp)


def register_plugins(app):
    """

    Register flask plugins

    :param app:
    :return:
    """
    # a markdown renderer
    Misaka(app, autolink=True)

    flask_webpacked_blueprint = FlaskWebpackedBlueprint()
    flask_webpacked_blueprint.init_app(app)

def create_app():
    """

    App factory

    :return:
        Flask app

    """

    app = Flask(__name__)

    # set configuration
    set_config(app)

    # plugins
    register_plugins(app)

    # cache.init_app(app)

    register_blueprints(app)

    return app
