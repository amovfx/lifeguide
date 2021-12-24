from collections import defaultdict
from itertools import starmap
import json
import os
import pathlib

from ..utils.FlaskWebpackBlueprint import FlaskWebpackedBlueprint

counter = 0
def get_sorted_content(root):

    pages = []
    menu = defaultdict(list)

    def item_sort(x):
        parts = x.split(".")
        if len(parts) == 3:
            return int(parts[-2])
        else:
            return 0

    def build_book_menu(path, menu=defaultdict(list)):
        global counter
        path, dirs, files = next(os.walk(path))

        def pairing(a, b):
            return [a + counter, os.path.join(path, b)]

        branch_name = path.split(os.sep)[-1]
        if files:
            files.sort(key=item_sort)
            sorted_files = list(starmap(pairing, enumerate(files)))
            counter += len(files)
            pages.extend(list(map(lambda x: os.path.join(path, x), files)))
            menu[branch_name].extend(sorted_files)

        dirs.sort()
        for dir in dirs:
            branch = defaultdict(list)
            build_book_menu(os.path.join(path, dir), branch)
            menu[branch_name].append(branch)

    build_book_menu(root, menu)
    menu = json.loads(json.dumps(dict(menu)))
    return menu, pages


book_bp = FlaskWebpackedBlueprint.create_ES6_blueprint("/book", file_name=__name__)

path = pathlib.Path(book_bp.static_folder) / "content/lifeguide"
path = path.as_posix()

book_bp.menu, book_bp.files = get_sorted_content(path)

from . import routes
