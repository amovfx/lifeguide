

export default class BookInterface
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



}