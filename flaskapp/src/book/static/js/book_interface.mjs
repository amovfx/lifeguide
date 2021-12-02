

export class BookInterface
{
    constructor()
    {
        console.log("Making book interface")
    }
    set_book = (book) =>
    {
        this.book = book;

    }
    open = () =>
    {
        console.log("Opening book interface")
        this.book.open();
        this.set_page_data();
    }

    turn_page = (dX) =>
    {
        this.book.turn_page(dX);
        this.set_page_data();
    }

    set_page_data = () =>
    {
        let page = this.book.get_page();
        console.log("Setting page");
        console.log(this.book);
        console.log(page);
        page.async_load().then((result) =>
        {
            document.getElementById("page-contents").innerHTML = page.get_content();
            document.getElementById("page-number-text").innerHTML = page.get_page_num();
        });




        //document.getElementById("page_contents").innerHTML = (page.get_title());
    }
}