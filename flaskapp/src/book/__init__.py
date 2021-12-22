from flask import Blueprint, request, url_for
from ..utils.FlaskWebpackBlueprint import FlaskWebpackedBlueprint
import re
import pathlib
import subprocess as sp

def get_sorted_content():
    """

    Scoops all the static content and sorts it into a list.

    :return:
    """
    content_path = pathlib.Path(book_bp.static_folder) / 'content'
    files = [
        x.as_posix()
        for x in pathlib.Path(content_path).rglob("*.md")
        if re.search(r"\d{2}\.md$", x.as_posix())
    ]
    files.sort(key=lambda x: int(x.split(".")[-2]))
    return files


book_bp = FlaskWebpackedBlueprint.create_ES6_blueprint("/lifeguide", file_name=__name__)
book_bp.files = get_sorted_content()

from . import routes
