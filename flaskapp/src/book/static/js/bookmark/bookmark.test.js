import {ACCEPT_COOKIES, CBookmark, PAGE_COOKIE_NAME, hasAcceptedCookies} from "./bookmark";

import Cookies from "js-cookie";
import { when } from 'jest-when';

const fn = jest.fn();
when(fn).calledWith(ACCEPT_COOKIES).mockReturnValue(1);
when(fn).calledWith(PAGE_COOKIE_NAME).mockReturnValue(5);

Cookies.get = fn;


describe("CBookmark", () =>
{
    const Bookmark = new CBookmark();

    it("Initializing", () =>
    {
        expect(Bookmark).toBeInstanceOf(CBookmark);
    })

    it("Cookie test", () =>
    {
        expect(Cookies.get(PAGE_COOKIE_NAME)).toBe(5);
    })

    it("Accept Cookies", () =>
    {
        expect(Cookies.get(ACCEPT_COOKIES)).toBe(1);
    })

    it ("hasAcceptCookies", () =>
    {
        expect(hasAcceptedCookies()).toBe(true);
    })

    describe("Methods", () =>
    {
        it("get/set_page_number", () =>
        {
            Bookmark.set_page_number(10);
            expect(Bookmark.page_num).toBe(10);
        })

    })





})