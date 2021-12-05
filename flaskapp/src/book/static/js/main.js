
import {Data_Resolver,DOMAINS} from "./data_resolver/data_resolver.js";
import {Book, BookFactory} from "./book/book.js";
import {BookInterface} from "./book_interface/book_interface.js";
import {EventStrategyDesktop, CreateBookEventListeners} from "./events/events.js";
import Logger from "js-logger";

export function make_book() {
    ///THIS IS WHERE I LEFT OFF FIGURE THIS SHIT OUT.
    let data_resolver = Data_Resolver.Build_From_Domain(DOMAINS.LOCAL) //fetches data
    let book = Book.from_resolver(data_resolver);
    return book;//builds book from table of contents
}

export function makeBookInterface() {
    let Book_Interface = new BookInterface();
    const strategy = new EventStrategyDesktop(Book_Interface);
    CreateBookEventListeners(strategy);
    return Book_Interface;
}

export function makeEventListeners(Book_Interface)
{
    //Create a strategy manager here
    const strategy = new EventStrategyDesktop(Book_Interface);
    CreateBookEventListeners(strategy);
}

export function initialize_book()
{
    return make_book().then((result) =>
    {
        return makeBookInterface(result);
    }).then((result) =>
    {
        return result;
    })
}

export const DataResolver = Data_Resolver;
export const Book_Interface = BookInterface;
export const CreateEventListenders = CreateBookEventListeners;
export const Book_Factory = BookFactory;

Logger.useDefaults()


