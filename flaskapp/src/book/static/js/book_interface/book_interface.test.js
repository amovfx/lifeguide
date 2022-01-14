import {CBookInterface,DELTA} from "./book_interface";
import {mock_book} from "../book/book";
import {PAGE_COOKIE_NAME} from "../bookmark/bookmark";
import Cookies from "js-cookie";
import { when } from 'jest-when';

const fn = jest.fn();

when(fn).calledWith(PAGE_COOKIE_NAME).mockReturnValue(5);

Cookies.get = fn;

describe("Book Interface", () => {

    let BookInterface = new CBookInterface();

    it("Initialize", () => {
        expect(BookInterface).toBeInstanceOf(CBookInterface);
    })

    describe("Methods",  () => {

        let Book;

        beforeEach(async () => {
            Book = await mock_book();
            BookInterface.set_book(Book);
        })

        it("set/get_book", async () => {

            expect(BookInterface.get_book()).toBe(Book);
        })

        it("turn_page", () => {

            BookInterface.turn_page(DELTA);
            expect(BookInterface.Bookmark.get_page_number()).toBe(-1);
        })

        it("turn_page", () => {
            BookInterface.turn_page(DELTA *-1);
            BookInterface.turn_page(DELTA *-1);
            expect(BookInterface.Bookmark.get_page_number()).toBe(1);
        })
        it("set_page", () => {
            BookInterface.set_page(5);
            expect(BookInterface.Bookmark.get_page_number()).toBe(5);
        })

    })
})