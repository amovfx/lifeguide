import Logger from "js-logger";
import {Bookmark} from "../bookmark/bookmark";

const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

export class BookInterface
{
    constructor()
    {
        Logger.info("Constructing book interface");
        this.Bookmark = new Bookmark();
        this.book = undefined;
    }

    set_book = (book) =>
    {
        this.book = book;
        this.set_page_data()
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
            current_page = mod((current_page), this.book.pages.length);
            this.Bookmark.set_page_number(current_page);
        }
        this.set_page_data();
    }
    goto_page(page_num)
    {
        page_num = mod((page_num), this.book.pages.length);
        this.Bookmark.set_page_number(page_num);
        this.set_page_data();
    }

    //strip this out to a renderer class.
    set_page_data()
    {
        if (this.book !== undefined) {
            let page = this.book.get_page(this.Bookmark.get_page_number());
            page.async_load().then(() => {
                document.getElementById("page-contents").innerHTML = page.get_content();
                document.getElementById("page-number-text").innerHTML = page.get_page_num()
                document.getElementById("title").innerHTML = page.get_title();
            });
        }
        else
        {
            Logger.warn(`${this.constructor.name} has no book set when calling ${name} function.`);
        }
    }
}