
import {CBookInterface} from "../book_interface/book_interface.js";
import Logger from "js-logger";
import {DELTA} from "../book_interface/book_interface.js";
import {Book} from "../book/book" ;

class CEventStrategy
{
    constructor(event_name_down, event_name_up, Book_Interface)
    {
        Logger.info(`Constructing ${this.constructor.name}`);

        this.event_name_down = event_name_down;
        this.event_name_up = event_name_up;
        this.data_swipe_element_clicked = false;

        if (Book_Interface instanceof CBookInterface)
        {
            this.book_interface = Book_Interface;
        }
        else
        {
            throw new Error(`${Book_Interface} is not a BookInterface class.`)
        }
    }
    is_up_event_target_valid(event)
    {
        let condition = event.target.closest("[data-page-swipe='1']") !== undefined
        return condition && this.data_swipe_element_clicked
    }

    validate_data_swipe_element(event)
    {
            let event_target = event.target.closest("[data-page-swipe='1']");
            this.data_swipe_element_clicked = event_target !== undefined;
    }


    //these are click events.
    next_page = () =>
    {
        this.book_interface.turn_page(-DELTA);
    }
    prev_page = () =>
    {
        this.book_interface.turn_page(DELTA);
    }
    set_page = (num) =>
    {
        this.book_interface.set_page(num);
    }
}

export class CEventStrategyDesktop extends CEventStrategy
{
    constructor(Book_Interface)
    {
        super("mousedown", "mouseup", Book_Interface);
    }
    down_event = (event) =>
    {
        super.validate_data_swipe_element(event);
        this.startX = event.pageX;
    }
    up_event = (event) =>
    {
        if (super.is_up_event_target_valid(event))
        {
            this.book_interface.turn_page(event.pageX - this.startX);
        }
    }

}

export class CEventStrategyMobile extends CEventStrategy
{
    constructor(Book)
    {
        super("touchstart", "touchend", Book);
    }
    down_event = (event) =>
    {
        super.validate_data_swipe_element(event);
        this.startX = event.changedTouches[0].screenX;
    }
    up_event = (event) =>
    {
        if (super.is_up_event_target_valid(event))
        {
            this.book_interface.turn_page(event.changedTouches[0].screenX - this.startX);
        }
    }
}

export const FCreatePageEventListeners = (strategy) =>
{
    Logger.info("Adding event listeners");

    document.getElementById("page")
        .addEventListener(strategy.event_name_down,
        (event) => {strategy.down_event(event)},
        false);

    document.getElementById("page")
        .addEventListener(strategy.event_name_up,
        (event) => {strategy.up_event(event)},
        false);

    document.getElementById("prev-page")
        .addEventListener("click",
            (event) => {strategy.prev_page()},
            false);

    document.getElementById("next-page")
        .addEventListener("click",
            (event) => {strategy.next_page()},
            false);

    document
        .addEventListener("set_page",
            (event) => {
                strategy.set_page(event.detail.page)
            }, true)


}



