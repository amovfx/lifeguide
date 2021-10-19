"""

Routes for book_bp

"""

import datetime

from flask import render_template, make_response, request, jsonify
from flask_misaka import markdown

from . import book_bp


@book_bp.route("/")
def page():
    """

    Access the sorted content from book_bp.files and renders a page.
    This book should be a content hash in ipfs.

    :return:
        response
    """

    print (len(book_bp.files))
    res = make_response(render_template("book_page.html", page_count = len(book_bp.files)))

    if request.cookies.get('acceptCookies') == 'true':

        expire_date = datetime.datetime.now()
        expire_date = expire_date + datetime.timedelta(days=366)

        res.set_cookie('page_num',
                       "0", expires=expire_date)
    print (res)
    return res

@book_bp.get("/content/<page_num>")
def page_content(page_num):
    """

    Returns a book page to be injected into the webpage.

    :param page_num:
        The page number of the book.

    :return:
        json book content

    """
    page_num = int(page_num)

    read_file = open(book_bp.files[page_num], "r")
    md_template_string = markdown(read_file.read())


    return jsonify(md_template_string)