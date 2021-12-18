from flask import Blueprint, redirect, url_for

error_handler_bp = Blueprint("error_handlers", __name__)


@error_handler_bp.app_errorhandler(404)
def handle404(e):
    """

    Missing resources sends us back to the beginning of the book.

    :param e:
    :return:
    """
    return redirect(url_for("/book.cover"))
