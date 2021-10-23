

from flask_testing import TestCase
from flaskapp.src.app import create_app


class TestBaseCase(TestCase):

    def create_app(self):
        return create_app()