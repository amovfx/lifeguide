"""

Quick utility to copy html files for cache busting.

"""

import hashlib
import pathlib
import shutil


CWD = pathlib.Path.cwd()


def clean_old_files(ext: str = "html"):
    """

    Remove old html files created by this file.

    :return:
    """
    dist_path = CWD / "dist"
    for file in dist_path.rglob(f"*{ext}"):
        file.unlink()


def get_files(ext: str = "html") -> list[pathlib.Path]:
    """

    Get a recursive glob of all files in a working directory.

    :return:
    """
    files = list(pathlib.Path(CWD).rglob(f"*{ext}"))

    if not len(files):
        raise FileNotFoundError(f"No {ext} files found in {CWD}")
    return files


def generate_digest(file: pathlib.Path) -> str:
    """

    Read contents of the file and return a 16 character length md5 hash.

    :param file:
        pathlib.Path object of an html file
    :return:
    """
    digest = None

    with open(file, "rb") as f:
        digest = hashlib.md5(f.read()).hexdigest()

    return digest[:16]


def hashed_filename(file: pathlib.Path) -> str:
    """

    create a file name of format filename.[md5hash].[ext]

    :param file:
        pathlib.Path object of a file
    :return:
    """
    path = ".".join([file.stem, generate_digest(file)]) + file.suffix
    return path


def digested_file_output_path(file: pathlib.Path) -> pathlib.Path:
    """

    Build output path for digested file.

    :param file:
    :return:
    """
    return CWD / "dist" / hashed_filename(file)


def write_digested_file(file: pathlib.Path):
    """

    Write file.html to file.[md5hash].html.

    :param file:
        pathlib.Path object of a file

    """
    shutil.copy2(file, digested_file_output_path(file))


def main():
    """

    Get all files in all sub directories in current working directory
    and copy them appending hash in the extension.

    """

    clean_old_files()
    for file in get_files():
        write_digested_file(file)


if __name__ == "__main__":
    main()
