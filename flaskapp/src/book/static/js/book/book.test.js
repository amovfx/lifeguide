import Book from "./book";
import Table_of_Contents from "../table_of_contents/table_of_contents";

describe("Test Book", () => {
    it("Initialize Book", async () => {
        let toc = await Table_of_Contents.Local();

        expect(toc.count()).toBe(27)

        let book = new Book(toc);
        expect(book.page_count()).toBe(27);


    })

    it("Initializing book", async () => {
        let toc = await Table_of_Contents.Local();
        let book = new Book(toc);
        await book.set_page(3);
        console.log(book.pages[3])
    })
})