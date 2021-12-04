import Logger from "js-logger";

function check_book(target, name, descriptor)
{
    const original = descriptor.value;
    if (typeof descriptor.value == 'function')
    {
        if (target.book !== undefined)
        {
            descriptor.value = function(...args)
            {
                return original.apply(this, args);
            }
        }
        else
        {
            descriptor.value = function ()
            {
                Logger.warn(`${target} has no book set when calling ${name} function.`);
            }
        }
    }

}

export class BookInterface
{
    constructor()
    {
        Logger.info("Constructing book interface");
        this.book = undefined;
    }

    set_book = (book) =>
    {
        this.book = book;
    }

    @check_book
    get_book()
    {
        return this.book;
    }

    @check_book
    open()
    {
        this.book.open();
        this.set_page_data();
    }

    @check_book
    turn_page(dX)
    {
        this.book.turn_page(dX);
        this.set_page_data();
    }

    @check_book
    set_page_data()
    {
        let page = this.book.get_page();
        page.async_load().then(() => {
            document.getElementById("page-contents").innerHTML = page.get_content();
            document.getElementById("page-number-text").innerHTML = page.get_page_num()
            document.getElementById("title").innerHTML = page.get_title();
        });
    }
}