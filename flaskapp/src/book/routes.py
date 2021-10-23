"""

Routes for book_bp

"""

from flask import render_template, make_response, jsonify, render_template_string
from flask_misaka import markdown

from ..app.cache import cache
from . import book_bp

@book_bp.route("/")
@cache.memoize()
def cover():
    """

    Access the sorted content from book_bp.files and renders a page.
    This book should be a content hash in ipfs.

    :return:
        response
    """

    return make_response(render_template("book_page.html", page_count = len(book_bp.files)))

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

    md_file = open(book_bp.files[page_num], "r")
    text = md_file.read()
    md_file.close()

    template_string = render_template_string(text,
                                             static_path=f'/book.static' ) #we use this to properly render images in our md files.
    md_template_string = markdown(template_string)

    return jsonify(md_template_string)