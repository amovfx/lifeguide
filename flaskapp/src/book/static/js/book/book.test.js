import Book from "./book";
import {DOMAINS} from "../data_resolver/data_resolver";

describe("Test Book", () => {

    it("Initialize Book", async () => {
        let book = await Book.Initialize(DOMAINS.LOCAL);
        expect(book.length).toBe(27);
    })
})