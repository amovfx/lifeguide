
import {Data_Resolver,DOMAINS} from "./data_resolver/data_resolver.js";
import {Book} from "./book/book.js";
import {Book_Contents} from "./book_contents.js";
import {BookInterface} from "./book_interface.mjs";
import {EventStrategyDesktop, CreateBookEventListeners} from "./events.js";

export async function make_book() {
    let data_resolver = Data_Resolver.Build_From_Domain(DOMAINS.LOCAL) //fetches data
    let table_of_contents = await Book_Contents.from_resolver(data_resolver); //builds table of contents
    return new Book(table_of_contents); //builds book from table of contents
}

export function makeInterface(book) {
    let Book_Interface = new BookInterface();
    Book_Interface.set_book(book);
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






