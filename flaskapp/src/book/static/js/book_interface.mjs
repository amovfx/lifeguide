

class BookInterface
{
    constructor()
    {
        console.log("Making book interface")
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
        console.log("Setting page data.")
        let page = this.book.get_page();
        $("#page-contents").html(page.get_content());
        $("#page-number").html(this.book.current_page);
        $("#page-title").html(page.get_title());
    }
    build_nav_bar()
    {
        //builds the nav bar for the webpage.
    }

}

export default BookInterface