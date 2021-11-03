"""

Testing for the book_bp

Notes:
    -Convert output to the test to a string
    -Have an expected string
    -Every Test works the same way

"""

from ddt import ddt, idata, unpack
import json
from tabulate import tabulate
from ...app.tests.test import TestBaseCase
from .. import book_bp




def annotate(expected, actual):
    msg = tabulate([["Expected:", expected], ["Actual: ", actual]])
    print(msg)

@ddt
class TestRoutes(TestBaseCase):
    """

    Test routes of the book_bp

    """





    def test_home(self):
        """

        Testing Home Route. This route should allows redirect to <domain>/book.

        response.status_code == 302
        response.location == 'http://localhost/book/'

        """

        response = self.client.get('/', content_type='html/text')
        annotate("response.status_code = 302", f"{response.status_code = }")
        annotate("response.location = 'http://localhost/book/'", f'{response.location = }')

        self.assertEqual(302, response.status_code)
        self.assertRedirects(response, '/book/')


    @idata(range(5))
    def test_badroutes(self, value):
        """

        Tests reroute with error handles to the book page.
        :return:
        """
        self.longMessage = True
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

    @idata(zip(('Intro.01.md', 'Autonomy.02.md', 'current_mindset.03.md'), range(3)))
    @unpack
    def test_book_contents(self, key, value):
        """

        Test for testing book table of contents route.

        :param value:
        :return:
        """
        print('\n')
        print(f'Testing book contents {value}...')
        response = self.client.get('/book/contents', content_type='json')
        first_entry = json.loads(response.data)[value]
        self.assertIn(key, first_entry)
        self.assertEqual(f'/book/content/{value}', first_entry[key])
        print(f'Expected: /book/content/{value} Acctual: {first_entry[key]}')



