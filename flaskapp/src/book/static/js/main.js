
import {CDataResolver,DOMAINS} from "./data_resolver/data_resolver.js";
import {CBook, CBookFactory} from "./book/book.js";
import {CBookInterface} from "./book_interface/book_interface.js";
import {CEventStrategyDesktop, FCreatePageEventListeners} from "./events/events.js";
import Logger from "js-logger";

export function makeEventListeners(Book_Interface)
{
    //Create a strategy manager here
    const strategy = new CEventStrategyDesktop(Book_Interface);
    FCreatePageEventListeners(strategy);
}

export const DataResolver = CDataResolver;
export const BookInterface = CBookInterface;
export const BookFactory = CBookFactory;
export const Book = CBook;

Logger.useDefaults()