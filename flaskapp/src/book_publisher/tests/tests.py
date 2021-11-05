from ..publisher import Publisher
from unittest import TestCase
import zlib
from flask import url_for

class IPFSTest(TestCase):

    def setUp(self) -> None:
        self.book_publisher = Publisher()
        self.ipfs_data = [1,741,"GME","BTC"]

    def test_init(self):
        publisher = Publisher()
        self.assertIsNotNone(publisher)

    def test_ipfs_cat(self):
        hash = self.book_publisher.client.add_json(self.ipfs_data)
        print (hash)
        self.assertEqual(self.ipfs_data, self.book_publisher.client.get_json(hash))

    def test_ipfs_string(self):
        generic_string = "THis is a test string"
        hash = self.book_publisher.client.add_json(generic_string)
        print(hash)
        self.assertEqual(generic_string, self.book_publisher.client.get_json(hash))

    def ipfs_compressed_string(self):
        generic_string = "THis is a test string that needs to be compressed"
        hash = self.book_publisher.client.add_json(zlib.compress(str.encode(generic_string)))
        print(hash)
        self.assertEqual(generic_string, zlib.decompress(self.book_publisher.client.get_json(hash)).decode())

    def test_get_content(self):
        self.book_publisher.publish()
        print (self.book_publisher.get_table_of_contents_hash())


