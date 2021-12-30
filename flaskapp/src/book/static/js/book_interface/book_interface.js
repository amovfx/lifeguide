import Logger from "js-logger";
import {CBookmark} from "../bookmark/bookmark";

import {buildMenu, SideBarBuilder} from "../sidebar_builder/sidebar_builder";


export const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}



//rename this book
export class CBookInterface
{
    constructor()
    {
        Logger.info("Constructing lifeguide interface");
        this.Bookmark = new CBookmark();
    }

    set_book = (book) =>
    {
        this.book = book;
        this.set_page_data(this.Bookmark.get_page_number())
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
            this.Bookmark.set_page_number(current_page);
            this.set_page_data(current_page);
        }

    }
    set_page(page_num)
    {
        this.Bookmark.set_page_number(page_num);
        this.set_page_data(page_num);
    }

    //strip this out to a renderer class.
    set_page_data(page_num)
    {
        if (this.book !== undefined)
        {
            this.book.set_page(page_num);
        }
        else
        {
            Logger.warn(`${this.constructor.name} has no book set when calling ${name} function.`);
        }
    }
}