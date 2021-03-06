import BookModule from "./book";
import {DOMAINS} from "../data_resolver/data_resolver";

describe("Test BookModule", () => {

    it("Initialize BookModule", async () => {
        let book = await BookModule.Initialize(DOMAINS.LOCAL);
        expect(book.length).toBe(27);
    })
})