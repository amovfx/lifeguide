
"""

Quick utility to copy html files for cache busting.

"""
import hashlib
import pathlib
import shutil

def clean_old_files():
    """

    Remove old html files created by this file.

    :return:
    """
    dist_path = pathlib.Path.cwd() / 'dist'
    for file in dist_path.rglob("*html"):
        file.unlink()


def get_html_files():
    """

    Get a recusive glob of all html files in a working directory.
    :return:
    """
    return list(pathlib.Path(pathlib.Path.cwd()).rglob("*html"))

def generate_digest(file: pathlib.Path) -> str:
    """

    read contents of the file and return a 16 character length md5 hash.

    :param file:
        pathlib.Path object of an html file
    :return:
    """
    digest = None

    with open(file, "rb") as f:
        digest = hashlib.md5(f.read()).hexdigest()

    return digest[:16]



def hashed_filename(file : pathlib.Path) -> str:
    """

    create a file name of format filename.[md5hash].[ext]

    :param file:
        pathlib.Path object of an html file
    :return:
    """
    path = ".".join([file.stem, generate_digest(file)]) + file.suffix
    return path

def digested_file_output_path(file : pathlib.Path) -> pathlib.Path:
    """

    this is out outputpath
    :param file:
    :return:
    """
    return pathlib.Path.cwd() / 'dist' / hashed_filename(file)

def write_digested_file(file):
    shutil.copy2(file, digested_file_output_path(file))

def main():
    clean_old_files()
    for file in get_html_files():
        write_digested_file(file)

if __name__ == "__main__":
    main()