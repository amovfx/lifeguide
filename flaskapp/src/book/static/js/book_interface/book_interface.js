

export class BookInterface
{
    constructor()
    {
        console.log("Constructing book interface")
    }
    set_book = (book) =>
    {
        this.book = book;
    }

    get_book = () =>
    {
        return this.book;
    }

    open = () =>
    {
        console.log("Opening book interface")
        if (this.book !== undefined)
        {
            this.book.open();
            this.set_page_data();
        }
        else
        {
            throw new Error("Book is not defined.")
        }

    }

    turn_page = (dX) =>
    {
        if (this.book !== undefined)
        {
            this.book.turn_page(dX);
            this.set_page_data();
        }

    }

    set_page_data = () =>
    {
        let page = this.book.get_page();
        console.log("Setting page");
        console.log(this.book);
        console.log(page);
        page.async_load().then(() =>
        {
            document.getElementById("page-contents").innerHTML = page.get_content();
            document.getElementById("page-number-text").innerHTML = page.get_page_num()
            document.getElementById("title").innerHTML = page.get_title();
        });

    }
}