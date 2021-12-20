
import {Data_Resolver,DOMAINS} from "./data_resolver/data_resolver.js";
import {Book, BookFactory} from "./book/book.js";
import {BookInterface} from "./book_interface/book_interface.js";
import {EventStrategyDesktop, CreatePageEventListeners} from "./events/events.js";
import Logger from "js-logger";

export function makeEventListeners(Book_Interface)
{
    //Create a strategy manager here
    const strategy = new EventStrategyDesktop(Book_Interface);
    CreatePageEventListeners(strategy);
}

export const DataResolver = Data_Resolver;
export const Book_Interface = BookInterface;
export const Book_Factory = BookFactory;




