"""

Routes for book_bp

"""
import os.path

from flask import render_template, jsonify, render_template_string, url_for

from flask_misaka import markdown

from ..app.cache import cache
from . import book_bp


@book_bp.route("/")

def cover():
    """

    Access the sorted content from book_bp.files and renders a page.
    This book should be a content hash in ipfs.

    :return:
        response
    """

    return render_template("book_page.html", page_count=len(book_bp.files))

@book_bp.get("/contents")
def book_contents():
    """

    Return a books' table of contents

    """
    page_content_url = url_for('/book.page_content')
    return jsonify([{os.path.basename(v) : f'{page_content_url}{i}'} for i, v in enumerate(book_bp.files)])

@book_bp.get('/content/', defaults={'page_num': 0})
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

    # turn this into a error handler.
    if page_num > len(book_bp.files):
        return "Page does not exist for this book", 404

    with open(book_bp.files[page_num], "r", encoding="utf-8") as md_file:
        text = md_file.read()

    template_string = render_template_string(text, static_path="/book.static")
    md_template_string = markdown(template_string)

    return jsonify(md_template_string)
