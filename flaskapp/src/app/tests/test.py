

from flask_testing import TestCase
from flaskapp.src.app import create_app


class TestBaseCase(TestCase):


    def setUp(self):
        print(self._testMethodDoc)

    def create_app(self):
        return create_app()