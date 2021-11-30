import {Page} from "./page";


export class Book_Contents extends Array
{
    constructor(page_array)
    {
        super(page_array);
        console.log("Created Table of Contents...");
        console.log(this);
    }

    static async from_resolver(resolver)
    {
        let table_of_contents = await resolver.async_load();
        let page_array = new Array(table_of_contents.length);

        table_of_contents.forEach((item, index) => {
            page_array[index] = new Page(resolver, item);
        });

        return Book_Contents.from(page_array);
    }
}

