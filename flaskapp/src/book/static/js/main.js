
import {Data_Resolver,DOMAINS} from "./data_resolver/data__resolver.js";
import Book from "./book/book.js";
import {Book_Contents} from "./book_contents.js";
import BookInterface from "./book_interface.mjs";

console.log("importing main make book function");

async function make_book(domain) {
    let data_resolver = Data_Resolver.Build_From_Domain(domain) //fetches data
    let table_of_contents = await Book_Contents.from_resolver(data_resolver); //builds table of contents
    return new Book(table_of_contents); //builds book from table of contents
}
console.log("Page loading...");

var bookInterface = new BookInterface();



