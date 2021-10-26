import ipfshttpclient
import pathlib
import re

#for each md file
    #replace images for matching gateway ipfs content hash
    #add to ipfs
    #return content hash

#js
    #load content
    #load


from ..book import book_bp


class BookContents:
    pass

class BookImage:
    pass

class BookPage:
    def __init__(self, file):
        self._file = file
        self._file

url_for_to_ipfs()




class Publisher:

    def __init__(self):
        try:
            self.client = ipfshttpclient.connect()
        except ipfshttpclient.exceptions.ConnectionError as IPFSConnectionError:
            print(str(IPFSConnectionError))


    def get_files(self):
        self.files = [x.as_posix() for x in pathlib.Path(book_bp.static_folder).rglob("*/*.md") if
                 re.search(r'\d{2}\.md$', x.as_posix())]

        self.files.sort(key=lambda x: int(x.split(".")[-2]))

        self.images = self.client.add(pathlib.Path(book_bp.static_folder), pattern='*.jpg', recursive=True)
        self.pages = self.client.add(pathlib.Path(book_bp.static_folder), pattern='*.md', recursive=True)


        self.contents = [self.client.add(my_file) for my_file in self.files]
        print(self.contents)

        self.json_data = [{response['Name']: response['Hash']} for response in self.contents]

        self.contents_hash = self.client.add_json(self.json_data)

    def pubilsh_file(self):
        pass
        #publish to ipfs and store content hash.
        #list of content hashes need to be turned into

    def publish_contents(self):
        pass
        #publish the list of contents

