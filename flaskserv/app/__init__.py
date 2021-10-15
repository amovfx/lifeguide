from flask import Flask
from flask_misaka import Misaka


def create_app():
    app = Flask(__name__)

    from ..book import book_bp
    app.register_blueprint(book_bp)

    Misaka(app, autolink=True)

    return app
