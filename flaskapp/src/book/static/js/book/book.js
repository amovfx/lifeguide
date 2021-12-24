
import {Page} from "../page/page.js";
import Logger from "js-logger";
import {MenuManager} from "../menu_manager/menu_manager";

export class BookFactory
{
    constructor()
    {
        Logger.info("Constructing BookFactory. ");
    }

    static make_book = async (resolver) =>
    {
        let book = new Book();
        let menu_manager = new MenuManager();

        return resolver.async_load().then((result) =>
        {
            let page_array = new Array(result.length);
            book.title = Object.keys(result)[0]
            result[book.title]

            //build menu and create book at the same time
            const iterate = (obj) =>
            {
                Object.keys(obj).forEach(key =>
                {
                    console.log(`key: ${key}, value: ${obj[key]}`)
                    //create category


                    if (typeof obj[key] === 'object')
                    {
                            iterate(obj[key])
                    }
                    else
                    {
                        let page = new Page(resolver, obj[key]);
                        page_array[index] = page;
                    }
                })
            }

            iterate(result)

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
        Logger.info("Constructing lifeguide.");
    }
    get_title()
    {
        return this.title
    }

    set_title(title)
    {
        this.title = title;
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

    get_table_of_contents()
    {
        return this.table_of_contents;
    }

    get_page(id)
    {
        if (this.pages !== undefined)
        {
            return this.pages[id];
        }
    }

}