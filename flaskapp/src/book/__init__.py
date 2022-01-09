from collections import defaultdict
from itertools import starmap
import json
import os
import pathlib

from ..utils.FlaskWebpackBlueprint import FlaskWebpackedBlueprint

counter = 0


def path_to_menu_item_name(file_path):
    """
    Converts a file path to a menu name.
    /blah/blah/index.01.md -> Index
    doesnt/matter/blah/blah/super_cool_file.01.md -> Super Cool File
    :param file_path:
        string of file path
    :return:
        string
    """
    name = pathlib.Path(file_path).name.split(".")[0]

    if "_" in name:
        split_name = name.split("_")
        joined_name = ""
        for item in split_name[1:]:
            if len(joined_name) > 0:
                joined_name += " "
            joined_name += item.capitalize()
        name = joined_name

    else:
        name = name.capitalize()
    return name



def get_sorted_content(root):

    pages = []
    menu = defaultdict(list)

    def item_sort(x):
        parts = x.split(".")
        if len(parts) == 3:
            return int(parts[-2])
        else:
            return 0

    def build_book_menu(file_path, menu=defaultdict(list)):
        """

        This builds the book data structure
        :param file_path:
        :param menu:
        :return:
        """

        global counter

        def pairing(a, b):
            """

            This creates the relevant data for our book.
            We need the page number for js to call a flask route
            and the title for the menu entry.

            :param a:
            :param b:
            :return:
            """
            return [a + counter, path_to_menu_item_name(b)]

        file_path, dirs, files = next(os.walk(file_path))

        branch_name = path_to_menu_item_name(file_path)
        if files:
            files.sort(key=item_sort)
            sorted_files = list(starmap(pairing, enumerate(files)))
            counter += len(files)
            pages.extend(list(map(lambda x: os.path.join(file_path, x), files)))
            menu[branch_name].extend(sorted_files)

        dirs.sort()
        for dir in dirs:
            branch = defaultdict(list)
            build_book_menu(os.path.join(file_path, dir), branch)
            menu[branch_name].append(branch)

    build_book_menu(root, menu=menu)
    menu = json.loads(json.dumps(dict(menu)))
    return menu, pages


book_bp = FlaskWebpackedBlueprint.create_blueprint("/book", file_name=__name__)

path = pathlib.Path(book_bp.static_folder) / "content/lifeguide"
path = path.as_posix()

book_bp.menu, book_bp.files = get_sorted_content(path)

from . import routes
