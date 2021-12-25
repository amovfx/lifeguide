import Logger from "js-logger";
import {Bookmark} from "../bookmark/bookmark";
import {render_page} from "../page/page";
import {buildMenu, MenuManager} from "../menu_manager/menu_manager";


export const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

export class Book
{
    constructor(menuman, pageman)
    {
        this.MenuManager = menuman;
        this.PageManager = pageman;
        this.Bookmark = new Bookmark();

        //this listens to the events that menu manager broadcasts
        document.addEventListener('set_page', (e) =>
        {
            this.set_page(e.detail.page);
        })

    }

    set_book(book)
    {
        this.book = book;
        this.MenuManager.render_menu();
        this.set_page(this.Bookmark.get_page_number())
    }

    turn_page(dX)
    {
        let current_page = this.Bookmark.get_page_number();
        if (Math.abs(dX) >= DELTA)
        {
            current_page -= Math.sign(dX);
            current_page = mod(current_page, this.book.pages.length);
            this.set_page(current_page);
        }
    }

    set_page(page_num)
    {
        page_num = mod(page_num, this.book.pages.length);
        this.current_page = page_num;
        this.Bookmark.set_page_number(page_num);
        this.MenuManager.set_active_menu_item(page_num);
        this.PageManager.render_page(page_num);
    }
}

//rename this book
export class BookInterface
{
    constructor(book)
    {
        Logger.info("Constructing lifeguide interface");
        this.book = book;
        this.Bookmark = new Bookmark();
        this.MenuManager = menuman;
        this.PageManager = pageman;
    }

    set_book = (book) =>
    {
        this.book = book;
        this.set_contents()
        this.set_page_data(this.Bookmark.get_page_number())
    }
    set_contents = () =>
    {
        Logger.info("Setting table of menu_manager")
        this.MenuManager.initialize_menu(this.book.get_pages(), this).then(() =>
        {
            Logger.info("Menu Built");
        })
    }

    get_book()
    {
        return this.book;
    }

    turn_page(dX)
    {
        let current_page = this.Bookmark.get_page_number();
        if (Math.abs(dX) >= DELTA)
        {
            current_page -= Math.sign(dX);
            current_page = mod(current_page, this.book.pages.length);
            this.Bookmark.set_page_number(current_page);
            this.set_page_data(current_page);
        }

    }
    goto_page(page_num)
    {
        page_num = mod(page_num, this.book.pages.length);
        this.Bookmark.set_page_number(page_num);
        this.set_page_data(page_num);
    }

    //strip this out to a renderer class.
    set_page_data(page_num)
    {
        if (this.book !== undefined)
        {
            this.MenuManager.set_active_menu_item(page_num);
            this.PageManager.render_page(page_num);
        }
        else
        {
            Logger.warn(`${this.constructor.name} has no book set when calling ${name} function.`);
        }
    }
}