
import {BookInterface} from "../book_interface/book_interface.js";
import Logger from "js-logger";
import {DELTA} from "../book_interface/book_interface.js";

class EventStrategy
{
    constructor(event_name_down, event_name_up, Book_Interface)
    {
        Logger.info(`Constructing ${this.constructor.name}`);

        this.event_name_down = event_name_down;
        this.event_name_up = event_name_up;
        this.element_clicked = undefined;

        if (Book_Interface instanceof BookInterface)
        {
            this.book_interface = Book_Interface;
        }
        else
        {
            throw new Error(`${Book_Interface} is not a BookInterface class.`)
        }
    }

    //these high jack delta constant to turn the page.
    //these are click events.
    next_page = () =>
    {
        this.book_interface.turn_page(DELTA);
    }
    prev_page = () =>
    {
        this.book_interface.prev_page(-DELTA);
    }
}

export class EventStrategyDesktop extends EventStrategy
{
    constructor(Book_Interface)
    {
        super("mousedown", "mouseup", Book_Interface);
    }
    down_event = (event) =>
    {
        this.element_clicked = event.target;
        this.startX = event.pageX;
    }
    up_event = (event) =>
    {
        if( this.element_clicked === event.target)
        {
            this.book_interface.turn_page(event.pageX - this.startX);
        }
    }
}

export class EventStrategyMobile extends EventStrategy
{
    constructor(Book)
    {
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

export const CreatePageEventListeners = (strategy) =>
{
    Logger.info("Adding event listeners");

    document.getElementById("page")
        .addEventListener(strategy.event_name_down,
        (event) => {strategy.down_event(event)},
        false);

    document.getElementById("page").addEventListener(strategy.event_name_up,
        (event) => {strategy.up_event(event)},
        false);

    document.getElementById("prev-page")
        .addEventListener("click",
            (event) => {strategy.next_page()},
            false);

    document.getElementById("next-page")
        .addEventListener("click",
            (event) => {strategy.next_page()},
            false);
}



