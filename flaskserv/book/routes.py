from . import book_bp

from flask_misaka import markdown

import pathlib
import random

from flask import render_template

@book_bp.route("/home")
@book_bp.route("/")
def home():
    #md_files = [ x.as_posix() for x in pathlib.Path(book_bp.static_folder).rglob("*/*.md")]
    read_file = open(random.choice(book_bp.files), "r")
    md_template_string = markdown(read_file.read())
    return render_template("book_page.html", text = md_template_string)