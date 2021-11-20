
import Page from "../page.js";
import PageCookieManager from "../cookie_manager.js";
import {Data_Resolver} from "../data_resolver/data__resolver.js";


const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

export default class Book extends Array
{
    //Contains pages
    constructor(table_of_contents)
    {
        super(table_of_contents);
        this.Page_Cookie_Manager = new PageCookieManager();
        //this.set_page(this.Page_Cookie_Manager.get_page_number()).then(() => {console.log('ready')});
    }
    //open book to last page or page 0.
    open = async () =>
    {
        await this.set_page(this.Page_Cookie_Manager.get_page_number());
    }

    set_page = async (page_num) =>
    {
        this.current_page = page_num;
        await this[page_num].async_load();
        //load next page
        await this[mod(page_num + 1, this.length)].async_load();
    }
    get_page()
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