from flask import Flask, Blueprint

def create_app():
    app = Flask(__name__)

    from ..book import book_bp
    app.register_blueprint(book_bp)
    return app
