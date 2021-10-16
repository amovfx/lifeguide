from flask import (Blueprint,
                      redirect,
                      url_for,
                      request)

error_handler_bp = Blueprint('error_handlers', __name__)

@error_handler_bp.app_errorhandler(404)
def handle404(e):
    page_cookie = request.cookies.get('page_num')
    prev_page = page_cookie if page_cookie else 0

    return redirect(url_for('/book.page', page_num=prev_page))