

export default class BookManager
{
    constructor(book)
    {
        this.book = book;
    }

    turn_page(dX)
    {
        this.book.turn_page(dX);
    }

    set_book(book)
    {
        this.book = book;
    }

    //remove this
    init_load_event_listeners()
    {
        window.addEventListener("load", async () => {
            await this.book.set_page(this.Page_Cookie_Manager.get_page_number())
        })
    }

}