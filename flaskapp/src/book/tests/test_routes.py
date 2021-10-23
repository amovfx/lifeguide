"""

Testing for the book_bp
"""

from ddt import ddt, idata
from ...app.tests.test import TestBaseCase
from .. import book_bp


@ddt
class TestRoutes(TestBaseCase):
    """

    Test routes of the book_bp

    """

    def test_home(self):
        """

        Tests reroute with error handles to the book page.
        :return:
        """

        response = self.client.get('/', content_type='html/text')
        self.assertEqual(302, response.status_code)
        self.assertRedirects(response, '/book/')

    @idata(range(5))
    def test_badroutes(self, value):
        """

        Tests reroute with error handles to the book page.
        :return:
        """

        response = self.client.get(f'/{value}', content_type='html/text')
        self.assertEqual(302, response.status_code)
        self.assertRedirects(response, '/book/')

    def test_cover(self):
        """

        test direct cover route.

        :return:
        """
        response = self.client.get('/book/', content_type='html/text')
        self.assertEqual(200, response.status_code)

    @idata(range(len(book_bp.files)))
    def test_book_pages(self, value):
        """

        Test for testing book page. This is going to need to be redone.
        :param value:
        :return:
        """
        response = self.client.get(f'/book/content/{value}', content_type='html/text')
        self.assertEqual(200, response.status_code)

    @idata(range(5))
    def test_missing_book_pages(self, value):
        """

        Test for testing book page. This is going to need to be redone.
        :param value:
        :return:
        """
        value += len(book_bp.files) + 1
        response = self.client.get(f'/book/content/{value}', content_type='html/text')
        self.assertEqual(404, response.status_code)


