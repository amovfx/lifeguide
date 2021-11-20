
import BookModule from "./book/book";

class EventStrategy
{
    constructor(event_name_down, event_name_up, bookInterface)
    {
        this.event_name_down = event_name_down;
        this.event_name_up = event_name_up;
        this.book = book
        this.fn = book.turn_page;
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
        this.book.open()
    }
}

export class EventStrategyDesktop extends EventStrategy
{
    constructor(Book) {
        super("mousedown", "mouseup", Book);
    }
    down_event = (event) =>
    {
        this.startX = event.pageX;
    }
    up_event = (event) =>
    {
        this.fn(event.pageX - this.startX);
    }
}

export class EventStrategyMobile extends EventStrategy
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
        this.fn(event.changedTouches[0].screenX - this.startX);
    }
}

export function CreateBookEventListeners(strategy)
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
