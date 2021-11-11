

export default class BookInterface
{
    constructor(book)
    {
        this.book = book;
    }

    turn_page = (dX) =>
    {
        this.book.turn_page(dX);
        this.set_page_data();
        //set page data?

    }

    set_book(book)
    {
        this.book = book;
    }

    set_page_data()
    {
        let page = this.book.get_page();
        $("#page-contents").html(page.get_content());
        $("#page-number").html(this.book.current_page);
        $("#page-title").html(page.get_title());
    }

}