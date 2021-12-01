
import {Data_Resolver,DOMAINS} from "./data_resolver/data_resolver.js";
import {Book} from "./book/book.js";
import {Book_Contents} from "./book_contents.js";
import {BookInterface} from "./book_interface.mjs";
import {EventStrategyDesktop, CreateBookEventListeners} from "./events.js";

export async function make_book() {
    let data_resolver = Data_Resolver.Build_From_Domain(DOMAINS.LOCAL) //fetches data
    return await Book.from_resolver(data_resolver); //builds book from table of contents
}

export async function makeBookInterface(book) {
    let Book_Interface = new BookInterface();
    await Book_Interface.set_book(book);
    const strategy = new EventStrategyDesktop(Book_Interface);
    CreateBookEventListeners(strategy);
    return Book_Interface;
}

export function makeEventListeners()
{

}
export function myfunc()
{
    console.log("doing the poopy");
}






