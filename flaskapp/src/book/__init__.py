from flask import Blueprint, request
import re
import pathlib
def create_bp(name):
    return Blueprint(name,
                     __name__,
                     template_folder='templates',
                     static_url_path=f'/static',
                     static_folder='static',
                     url_prefix=f'/book')

def get_sorted_content():
    """

    Scoops all the static content and sorts it into a list.

    :return:
    """
    files = [x.as_posix() for x in pathlib.Path(book_bp.static_folder).rglob("*/*.md") if
             re.search(r'\d{2}\.md$', x.as_posix())]
    files.sort(key=lambda x: int(x.split(".")[-2]))
    return files


book_bp = create_bp('/book')
book_bp.files = get_sorted_content()

from . import routes