from . import book_bp

import markdown
import markdown.extensions.fenced_code

import pathlib
import random

@book_bp.route("/home")
@book_bp.route("/")
def home():
    md_files = [ x.as_posix() for x in pathlib.Path(book_bp.static_folder).rglob("*/*.md")]
    read_file = open(random.choice(md_files), "r")
    md_template_string = markdown.markdown(read_file.read(), extensions=["fenced_code"])
    return md_template_string