
import BookModule from "./book/book";

class EventStrategy
{
    constructor(event_name_down, event_name_up, Book_Interface)
    {
        this.event_name_down = event_name_down;
        this.event_name_up = event_name_up;
        this.book_interface = Book_Interface;
    }
    set_book(book)
    {
        if (book instanceof BookModule)
        {
            this.book = book;
        }
        else
        {
            throw new Error(`${book} is not a Book class.`)
        }

    }
    /*
    * Function to call on page load.
     */
    load_event = () =>
    {
        console.log("Firing load event.")
        this.book.open()
    }
}

class EventStrategyDesktop extends EventStrategy
{
    constructor(Book_Interface) {

        super("mousedown", "mouseup", Book_Interface);
        console.log("Creating Event Strategy Desktop");
    }
    down_event = (event) =>
    {
        this.startX = event.pageX;
    }
    up_event = (event) =>
    {
        this.book_interface.turn_page(event.pageX - this.startX);
    }
}

class EventStrategyMobile extends EventStrategy
{
    constructor(Book) {
        super("touchstart", "touchend", Book);
    }
    down_event = (event) =>
    {
        this.startX = event.changedTouches[0].screenX;
    }
    up_event = (event) =>
    {
        this.book_interface.turn_page(event.changedTouches[0].screenX - this.startX);
    }
}

function CreateBookEventListeners(strategy)
{
        document.addEventListener("load"
            , (event) => {strategy.load_event()}
            , false);

        document.addEventListener(strategy.event_name_down
            , (event) => {strategy.down_event()}
            , false);

        document.addEventListener(strategy.event_name_up
            , (event) => {strategy.up_event()}
            , false);
}

