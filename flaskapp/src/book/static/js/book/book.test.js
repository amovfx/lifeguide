import {mock_book} from "./book";
import {CDataResolver} from "../data_resolver/data_resolver";

require('jest-fetch-mock').enableMocks()



describe("Test BookModule", () => {

    it("Initialize BookModule", async () => {
        let book = await mock_book()
        expect(book.get_page_count()).toBe(36);
    })
})