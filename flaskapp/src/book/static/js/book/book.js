
import {Page} from "../page/page.js";
import Logger from "js-logger";

export class BookFactory
{
    constructor()
    {
        Logger.info("Constructing BookFactory. ");
    }

    static make_book = async (resolver) =>
    {
        let book = new Book();

        return resolver.async_load().then((result) =>
        {
            let page_array = new Array(result.length);

            result.forEach((item, index) => {
                let page = new Page(resolver, item);
                page_array[index] = page;
            });

            book.set_table_of_contents(result);
            book.set_pages(page_array);

            return book;
        })
    }
}

export class Book
{
    constructor()
    {
        Logger.info("Constructing book.");
    }

    get_pages()
    {
        return this.pages;
    }

    set_pages = (pages) =>
    {
        this.pages = pages;
    }

    set_table_of_contents = (table_of_contents) =>
    {
        this.table_of_contents = table_of_contents;
    }

    get_page(id)
    {
        if (this.pages !== undefined)
        {
            return this.pages[id];
        }
    }

}