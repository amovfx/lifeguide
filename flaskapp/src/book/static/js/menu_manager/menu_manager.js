import {Page, PageManager} from "../page/page";
import {Book} from "../book/book";
import Logger from "js-logger";

function create_menu_category(name, category)
{
    Logger.info(`Creating menu category : ${name}`)
    let category_text = document.createElement("span");
    category_text.innerHTML = name;

    let category_div = document.createElement("div");
    category_div.classList.add("menu-cat");
    category_div.append(category_text);

    return category_div
}

function create_menu_element(chapter)
{
    Logger.info(`Creating menu element : ${name}`)
    let menu_text = document.createElement("p");
    menu_text.innerHTML = chapter;

    let menu_div = document.createElement("div");
    menu_div.classList.add("menu-item");
    menu_div.append(menu_text);

    return menu_div;
}

function format_title(title)
{
    let formatted_title = title.replace('_',' ');
    let capitalized_title = formatted_title.charAt(0).toUpperCase() + formatted_title.slice(1)
    return capitalized_title;
}



export class BookBuilder
{
    constructor() {
        this.pages = [];
        this.sidebar_element = document.getElementById("page-sidebar-contents")
    }

    static create = async (resolver) =>
    {

        let book = new Book();
        let pages = [];
        let PageManager = new PageManager();
        let MenuManager = new MenuManager();
        const iterate = (obj, category) =>
        {
            Logger.info(``)
            Object.keys(obj).forEach((key) =>
            {
                if (typeof obj[key] === 'object')
                {
                    let category = create_menu_category(key, category);
                    iterate(obj[key], category);
                }
                else
                {
                    //create a page for the book
                    let page = new Page(resolver, obj[key])
                    let page_title = format_title(item.get_title())
                    pages.append(pages);
                    let menu_item = create_menu_element(key);
                    category.append(menu_item);
                }
            })
        }

        return new Book(MenuManager, PageManager)
    }
}

export class MenuManager
{
    constructor()
    {
        this.last_item = undefined;
        this.sidebar_element = document.getElementById("page-sidebar-contents")

    }

    async initialize_menu(pages, book_interface)
    {
        pages.forEach((item, index) =>
        {
            let title = format_title(item.get_title());
            let new_item = create_menu_element(title);

            if (index === 0)
            {
                this.last_item = new_item;
                new_item.classList.toggle("menu-active");
            }

            new_item.onclick = () =>
            {
                const event = new CustomEvent('set_page',
                {
                    detail: {
                        page: index,
                    }
                })
                new_item.dispatchEvent(event);
            }
            this.sidebar_element.append(new_item);
        })
    }

    set_active_menu_item(page_num)
    {
        this.last_item.classList.toggle("menu-active");
        let menu_item = this.sidebar_element.children[page_num];
        menu_item.classList.toggle("menu-active");
        this.last_item = menu_item;
    }

}

export class MenuInterface
{
    constructor() {
    }


}