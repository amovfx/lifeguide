
import {CPage, PageManager} from "../page/page.js";
import Logger from "js-logger";
import {SideBarBuilder} from "../sidebar_builder/sidebar_builder";
import {CBookmark} from "../bookmark/bookmark";
import {DELTA} from "../book_interface/book_interface";

function mod(n, m) {
    return ((n % m) + m) % m;
}

export class CBookFactory
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
            let menu_builder = new SideBarBuilder();

            const iterate = (table_of_contents, category, depth) =>
            {
                Object.keys(table_of_contents).forEach((chapter) =>
                {
                    let new_category_element = menu_builder.create_menu_category(chapter, depth, category);
                    category.append(new_category_element);
                    if (Array.isArray(table_of_contents[chapter]))
                    {
                        table_of_contents[chapter].forEach((page_data) => {
                            if (!Array.isArray(page_data))
                            {
                                iterate(page_data, new_category_element, depth+1);
                            }
                            else
                            {
                                let page_num = page_data[0];
                                let page_title = page_data[1];

                                page_manager.create_page(resolver, page_num);
                                let menu_item = menu_builder.create_menu_element(page_title, page_num);
                                new_category_element.append(menu_item);
                                if (page_num === 0)
                                {
                                    menu_builder.set_active_menu_item(new_category_element);
                                }
                            }
                        })
                    }
                })
            }
            iterate(result, menu_builder.sidebar_element,0);
            return new this.book_class(page_manager, menu_builder)

        })
    }
}

export class CBook
{
    constructor(pageman, menuman)
    {
        this.PageManager = pageman;
        this.MenuManager = menuman;

        this.page_count = this.PageManager.pages.length

        //this listens to the events that menu manager broadcasts
        document.addEventListener('set_page', (e) =>
        {
            this.set_page(e.detail.page);
        })

    }
    get_title()
    {
        return this.title
    }

    set_title(title)
    {
        this.title = title;
    }

    get_page_count()
    {
        return this.page_count;
    }

    set_page(page_num)
    {
        page_num = mod(page_num, this.get_page_count());
        this.MenuManager.set_active_menu_item_by_index(page_num);
        this.PageManager.render(page_num);
    }
}