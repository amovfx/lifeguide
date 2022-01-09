"""

Routes for book_bp

"""
from functools import lru_cache
import os
import pathlib


from flask import (
    render_template,
    jsonify,
    render_template_string,
    url_for
)


from flask_cors import cross_origin

if not (DIGEST_FOLDER_NAME := os.environ.get("DIGEST_FOLDER_NAME")):
    raise EnvironmentError("DIGEST_FOLDER_NAME environment var not set")

from flask_misaka import markdown
from . import book_bp

def remove_hash(x):
    return x.stem.split(".")[0] + x.suffix

@lru_cache(1)
def reset_cache(mtime):
    get_digested_template_map.cache_clear()
    return None

def validate_cache(folder):
    reset_cache(folder.stat().st_mtime)
    return None

@lru_cache(1)
def get_digested_template_map(folder):
    template_map = {}
    for file in folder.rglob('*html'):
        template_map[remove_hash(file)] = file.relative_to(folder.parent)
    return template_map

def get_digested_html(html: str):
    template_path = pathlib.Path(book_bp.root_path) / pathlib.Path(book_bp.template_folder) / DIGEST_FOLDER_NAME
    validate_cache(template_path)
    digested_templates = get_digested_template_map(template_path)

    return digested_templates[html].as_posix()



@book_bp.route("/")
def cover():
    """

    Access the sorted content from book_bp.files and renders a page.
    This lifeguide should be a content hash in ipfs.

    :return:
        response
    """

    return render_template(get_digested_html("book_page.html"), page_count=len(book_bp.files))

@book_bp.get("/sidebar_builder")
def book_contents():
    """

    Return a books' table of sidebar_builder

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
    if pathlib.Path(file).suffix == '.md':
        with open(book_bp.files[page_num], "r", encoding="utf-8") as md_file:
            text = md_file.read()
        print(text)
        template_string = render_template_string(text,
                                                 static_path="/book.static")

        md_template_string = markdown(template_string)
        return jsonify(md_template_string)
    else:
        static_folder = pathlib.Path(__file__).parent
        illustration_path = pathlib.Path(file).relative_to(static_folder).as_posix()

        jpg_template = render_template(get_digested_html("illustration.html"), illustration=illustration_path)
        response = jsonify(jpg_template)
        print(response)
        return response
