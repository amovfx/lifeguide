import {CBookInterface,DELTA} from "./book_interface";
import {mock_book} from "../book/book";
import {PAGE_COOKIE_NAME} from "../bookmark/bookmark";
import Cookies from "js-cookie";
import { when } from 'jest-when';

const fn = jest.fn();

when(fn).calledWith(PAGE_COOKIE_NAME).mockReturnValue(5);

Cookies.get = fn;



describe("Book Interface", () => {

    let Book;
    let BookInterface = new CBookInterface();

    beforeAll(() => {
        return new Promise(resolve => {
        // Asynchronous task
        // ...
        resolve();
        });
    })

    it("Initialize", async () => {
        expect(Book).toBeDefined();
    })

    describe("Methods",  () => {

        it("set/get_book", () => {
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