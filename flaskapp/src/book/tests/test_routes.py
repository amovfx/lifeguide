"""

Testing for the book_bp routes

"""

import json

from ddt import ddt, idata, unpack
from tabulate import tabulate

from ...app_factory.tests.test import TestBaseCase
from .. import book_bp


def annotate(expected, actual):
    """

    Output formatter for a test.

    :param expected:
        Expected string
    :param actual:
        Actual data in string form that the test returns
    """
    msg = tabulate([["Expected:", expected], ["Actual: ", actual]])
    print(msg)


@ddt
class TestRoutes(TestBaseCase):
    """

    Test routes of the book_bp

    """

    def test_home(self):
        """

        Testing Home Route. This route should allows redirect to <domain>/lifeguide.

        response.status_code == 302
        response.location == 'http://localhost/book/'

        """

        response = self.client.get("/", content_type="html/text")
        annotate("response.status_code = 302", f"{response.status_code = }")
        annotate(
            "response.location = 'http://localhost/book/'", f"{response.location = }"
        )

        self.assertEqual(302, response.status_code)
        self.assertRedirects(response, "/lifeguide/")

    @idata(range(5))
    def test_badroutes(self, value):
        """

        Tests reroute with error handles to the lifeguide page.

        """

        response = self.client.get(f"/{value}", content_type="html/text")
        self.assertEqual(302, response.status_code)
        self.assertRedirects(response, "/lifeguide/")

    def test_cover(self):
        """

        test direct cover route.


        """
        response = self.client.get("/lifeguide/", content_type="html/text")
        self.assertEqual(200, response.status_code)

    @idata(range(len(book_bp.files)))
    def test_book_pages(self, value):
        """

        Test for testing lifeguide page. This is going to need to be redone.
        :param value:
            tests each page.

        """
        response = self.client.get(f"/lifeguide/content/{value}", content_type="html/text")
        self.assertEqual(200, response.status_code)

    @idata(range(5))
    def test_missing_book_pages(self, value):
        """

        Test for testing lifeguide page. This is going to need to be redone.
            :param value:

        """
        value += len(book_bp.files) + 1
        response = self.client.get(f"/lifeguide/content/{value}", content_type="html/text")
        self.assertEqual(404, response.status_code)

    @idata(zip(("Intro.01.md", "Autonomy.02.md", "01_current_mindset.03.md"), range(3)))
    @unpack
    def test_book_contents(self, key, value):
        """

        Test for testing lifeguide table of menu_manager route.

        :param value:

        """
        print("\n")
        print(f"Testing lifeguide menu_manager {value}...")
        response = self.client.get("/lifeguide/menu_manager", content_type="json")
        first_entry = json.loads(response.data)[value]
        self.assertIn(key, first_entry)
        self.assertEqual(f"/lifeguide/content/{value}", first_entry[key])
        print(f"Expected: /lifeguide/content/{value} Acctual: {first_entry[key]}")
