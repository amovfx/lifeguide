from flask import Flask
from flask_misaka import Misaka
from flaskapp.src.app.config import *

from .cache import cache

from .config import (DevelopmentConfig,
                     TestConfig,
                     ProductionConfig)

ENV_CONFIGS = {'development': DevelopmentConfig,
               'testing': TestConfig,
               'production': ProductionConfig}

def set_config(app, env_name:str =os.environ.get("FLASK_ENV")) -> None:


    if (env_name):
        if (config_class := ENV_CONFIGS.get(env_name)):
            app.config.from_object(config_class)
            return config_class
        else:
            raise ValueError("Config class not available.")

    else:
        raise ValueError("Env not available.")


def create_app():
    """

    App factory

    :return:
        Flask app

    """
    app = Flask(__name__)

    #set configuration
    set_config(app)


    #plugins
    Misaka(app, autolink=True)


    cache.init_app(app)

    #blueprints
    from ..book import book_bp
    from .error_handlers import error_handler_bp

    app.register_blueprint(book_bp)
    app.register_blueprint(error_handler_bp)

    return app
