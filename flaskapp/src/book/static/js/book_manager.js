

export default class BookManager
{
    constructor(book)
    {
        this.book = book;
    }

    turn_page(dX)
    {
        this.book.turn_page(dX);
        //set page data?

    }

    set_book(book)
    {
        this.book = book;
    }

    set_page_data(Page)
    {

        $("#page-contents").html(Page.page_data);
        $("#page-number").html(Page.page_num);
        $("#page-title").html(Page.title);
    }

    //remove this
    init_load_event_listeners = () =>
    {
        window.addEventListener("load", async () => {
            await this.book.set_page(this.Page_Cookie_Manager.get_page_number())
        })
    }

}