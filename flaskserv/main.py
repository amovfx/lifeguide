import secrets

from flaskserv.app import create_app
from flask import redirect, url_for, request

app = create_app()

@app.errorhandler(Exception)
def missing_page(e):
    page_cookie = request.cookies.get('page_num')
    prev_page = page_cookie if page_cookie else 0

    return redirect(url_for('/book.page', page_num=prev_page))

app.config.update(
    SECRET_KEY = secrets.token_hex(128)
)

app.register_error_handler(404, missing_page)
app.run(debug=True)