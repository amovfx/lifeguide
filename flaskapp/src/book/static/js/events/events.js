
import {BookInterface} from "../book_interface/book_interface.js";
import Logger from "js-logger";

class EventStrategy
{
    constructor(event_name_down, event_name_up, Book_Interface)
    {
        Logger.info(`Constructing ${this.constructor.name}`);

        this.event_name_down = event_name_down;
        this.event_name_up = event_name_up;

        if (Book_Interface instanceof BookInterface)
        {
            this.book_interface = Book_Interface;
        }
        else
        {
            throw new Error(`${Book_Interface} is not a BookInterface class.`)
        }
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
        this.startX = event.pageX;
    }
    up_event = (event) =>
    {
        this.book_interface.turn_page(event.pageX - this.startX);
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

export const CreateBookEventListeners = (strategy) =>
{
        Logger.info("Adding event listeners");

        document.addEventListener(strategy.event_name_down
            , (event) => {strategy.down_event(event)}
            , false);

        document.addEventListener(strategy.event_name_up
            , (event) => {strategy.up_event(event)}
            , false);
}



