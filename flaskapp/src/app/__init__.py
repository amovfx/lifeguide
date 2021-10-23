
import secrets

from flask import Flask
from flask_misaka import Misaka

from .cache import cache

def create_app():
    """

    App factory

    :return:
        Flask app

    """
    app = Flask(__name__)

    app.config.update(
        SECRET_KEY=secrets.token_hex(512)
    )


    #plugins
    Misaka(app, autolink=True)


    cache.init_app(app)

    #blueprints
    from ..book import book_bp
    from .error_handlers import error_handler_bp

    app.register_blueprint(book_bp)
    app.register_blueprint(error_handler_bp)

    return app
