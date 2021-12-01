
import {Page} from "../page.js";
import {Bookmark} from "../bookmark.js";
import {Data_Resolver} from "../data_resolver/data_resolver.js";


const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

export class Book extends Array
{
    //Contains pages
    constructor(page_array)
    {
        super(page_array)
        console.log("Creating book");
        console.log(this)

        this.Bookmark = new Bookmark();
        //this.set_page(this.Bookmark.get_page_number()).then(() => {console.log('ready')});
    }

    static async from_resolver(resolver)
    {
        console.log("Building book from resolver.")
        let table_of_contents = await resolver.async_load();
        let page_array = new Array(table_of_contents.length);

        table_of_contents.forEach((item, index) => {
            let page = new Page(resolver, item);
            page_array[index] = page;
        });

        return Book.from(page_array);
    }

    //open book to last page or page 0.
    open = () =>
    {
        console.log("Opening book")
        console.log(this);
        this.set_page(0);
    }

    set_page = (page_num) =>
    {
        this.current_page = page_num;
        this[page_num].async_load();
        this.Bookmark.set_page_number(page_num);
    }
    get_page = () =>
    {
        return this[this.current_page];
    }

    turn_page = async (dX) =>
    {
        if (Math.abs(dX) >= DELTA)
        {
            this.current_page -= Math.sign(dX);
            this.current_page = mod((this.current_page), this.page_count);
            await this.set_page(this.current_page);
        }
    }
}