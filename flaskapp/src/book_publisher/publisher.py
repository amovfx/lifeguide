import ipfsapi
import pathlib
import re

from ..book import book_bp


class BookContents:
    pass

class BookImage:
    pass

class BookPage:
    pass

class Publisher:

    def __init__(self):
        try:
            self.api = ipfsapi.connect('127.0.0.1',5001)
        except ipfsapi.exceptions.ConnectionError as IPFSConnectionError:
            print(str(IPFSConnectionError))


    def get_files(self):
        self.files = [x.as_posix() for x in pathlib.Path(book_bp.static_folder).rglob("*/*.md") if
                 re.search(r'\d{2}\.md$', x.as_posix())]

    def pubilsh_file(self):
        #publish to ipfs and store content hash.
        #list of content hashes need to be turned into

    def publish_contents(self):
        #publish the list of contents

