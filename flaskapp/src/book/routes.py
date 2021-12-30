"""

Routes for book_bp

"""
import os.path
from pathlib import Path

from flask import (
    render_template,
    jsonify,
    render_template_string,
    url_for
)
from flask_cors import cross_origin

from flask_misaka import markdown
from . import book_bp


@book_bp.route("/")
def cover():
    """

    Access the sorted content from book_bp.files and renders a page.
    This lifeguide should be a content hash in ipfs.

    :return:
        response
    """
    return render_template("book_page.html", page_count=len(book_bp.files))

@book_bp.get("/menu_manager")
def book_contents():
    """

    Return a books' table of menu_manager

    """
    #todo: fix what I'm doing to the menu


    return jsonify(book_bp.menu)

@book_bp.get("/content/", defaults={"page_num": 0})
@book_bp.get("/content/<page_num>")
def page_content(page_num):
    """

    Returns a lifeguide page to be injected into the webpage.

    :param page_num:
        The page number of the lifeguide.

    :return:
        json lifeguide content

    """
    page_num = int(page_num)

    # turn this into a error handler. Handle JPGS
    if page_num > len(book_bp.files):
        return "Page does not exist for this lifeguide", 404

    file = book_bp.files[page_num]
    if Path(file).suffix == '.md':
        with open(book_bp.files[page_num], "r", encoding="utf-8") as md_file:
            text = md_file.read()

        template_string = render_template_string(text,
                                                 static_path="/book.static")

        md_template_string = markdown(template_string)
        return jsonify(md_template_string)
    else:
        static_folder = Path(__file__).parent
        illustration_path = Path(file).relative_to(static_folder).as_posix()

        jpg_template = render_template("illustration.html", illustration=illustration_path)
        response = jsonify(jpg_template)
        print(response)
        return response
