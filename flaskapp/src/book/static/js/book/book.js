
import {Page} from "../page/page.js";
import {Bookmark} from "../bookmark/bookmark.js";
import {Data_Resolver} from "../data_resolver/data_resolver.js";


const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

export class BookFactory
{
    constructor()
    {
        console.log("Constructor book factory")
    }

    static make_book = async (resolver, book_interface) =>
    {
        let book = new Book();

        return resolver.async_load().then((result) =>
        {
            let page_array = new Array(result.length);

            result.forEach((item, index) => {
                let page = new Page(resolver, item);
                page_array[index] = page;
            });

            book.pages = page_array;
            return book;
        })
    }
}

export class Book
{
    //Contains pages
    constructor()
    {
        console.log("Constructing book");
        console.log(this)
        this.Bookmark = new Bookmark();
        this.open();
    }
    get_pages()
    {
        return pages;
    }

    set_pages(pages)
    {
        this.pages = pages;
    }
    //ingest contents
    load_contents(resolver)
    {
        resolver.async_load().then((result) =>
        {
            let page_array = new Array(result.length);

            result.forEach((item, index) => {
                let page = new Page(resolver, item);
                page_array[index] = page;
            });
            this.pages = page_array;
        })
    }

    //open book to last page or page 0.
    open = () => {
        this.set_page(this.Bookmark.get_page_number());
    }
    set_page = (page_num) =>
    {
        this.current_page = page_num;
        this.Bookmark.set_page_number(page_num);
    }

    get_page = () =>
    {
        if (this.pages !== undefined)
        {
            return this.pages[this.current_page];
        }

    }

    turn_page = (dX) =>
    {
        if (Math.abs(dX) >= DELTA)
        {
            this.current_page -= Math.sign(dX);
            this.current_page = mod((this.current_page), this.length);
            this.set_page(this.current_page);
        }
    }
}