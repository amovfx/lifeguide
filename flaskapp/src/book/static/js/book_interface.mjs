

export class BookInterface
{
    constructor()
    {
        console.log("Making book interface")
    }
    open = async () =>
    {
        this.book.open();
        this.set_page_data(0);

    }

    turn_page = (dX) =>
    {
        this.book.turn_page(dX);
        this.set_page_data();
    }

    set_book = async (book) =>
    {
        this.book = book;
        await this.book.open();
        this.set_page_data();
    }

    set_page_data()
    {
        console.log("Setting page data.")
        let page = this.book.get_page();

        document.getElementById("page_contents").innerHTML = page.get_content();
        document.getElementById("page-number").innerHTML = this.book.current_page;
        document.getElementById("page_contents").innerHTML = (page.get_title());
    }


}