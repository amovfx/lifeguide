from . import book_bp

from flask_misaka import markdown

import datetime

from flask import render_template, make_response, request


@book_bp.route("/<page_num>")
def page(page_num):
    """

    Access the sorted content from book_bp.files and renders a page.

    :param page_num:
    :return:
    """
    page_num = int(page_num)

    read_file = open(book_bp.files[page_num], "r")
    md_template_string = markdown(read_file.read())

    next_page = int(page_num+1) % len(book_bp.files)
    prev_page = int(page_num-1) % len(book_bp.files)

    res = make_response(render_template("book_page.html",
                                        text=md_template_string,
                                        cur_page =page_num,
                                        next_page=next_page,
                                        prev_page=prev_page))

    if request.cookies.get('acceptCookies') == 'true':

        expire_date = datetime.datetime.now()
        expire_date = expire_date + datetime.timedelta(days=366)

        res.set_cookie('page_num',
                       str(page_num), expires=expire_date)

    return res