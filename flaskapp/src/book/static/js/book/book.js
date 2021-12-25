
import {Page, PageManager} from "../page/page.js";
import Logger from "js-logger";
import {MenuManager} from "../menu_manager/menu_manager";

export class BookFactory
{
    constructor(book_class)
    {
        Logger.info("Constructing BookFactory. ");
        this.book_class = book_class

    }

    make_book = async (resolver) =>
    {



        return resolver.async_load().then((result) =>
        {
            //build menu and create book at the same time
            let page_manager = new PageManager();
            let menu_manager = new MenuManager();
            Logger.info(`Making book: ${result}`)
            const iterate = (obj, category) =>
            {
                console.log(obj)

                Object.keys(obj).forEach((key) =>
                {
                    let category = menu_manager.create_menu_category(key, category);
                    let value = obj[key];
                    Logger.info(`key: ${key} value: ${value}`)
                    if (Array.isArray(value))
                    {
                        obj[key].forEach((item) => {
                            if (!Array.isArray(item))
                            {
                                Logger.info(`recursing on: ${typeof item}`)
                                iterate(item, category);
                            }
                            else
                            {

                                let i = item[0];
                                Logger.info(`Creating page from: ${i}`);
                                let p = item[1];
                                Logger.info(`Item: ${i}, Path: ${p}`);
                                page_manager.create_page(resolver, p);
                                let menu_item = menu_manager.create_menu_element(p);
                                category.append(menu_item);
                            }
                        })
                    }

                })
            }
            iterate(result, menu_manager.sidebar_element);
            return new this.book_class(page_manager, menu_manager)

        })
    }
}

export class Book
{
    constructor(page_manager, menu_manager)
    {
        Logger.info("Constructing Book.");
        this.page_manager = page_manager;
        this.menu_manager = menu_manager;
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

    set_page = (page_num) =>
    {
        this.menu_manager.set_active_menu_item(page_num);
        this.page_manager.render(page_num);
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