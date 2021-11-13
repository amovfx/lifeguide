
import Page from "../page.js";
import PageCookieManager from "../cookie_manager.js";
import {Data_Resolver} from "../data_resolver/data__resolver.js";


const DELTA = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

export default class BookModule extends Array
{
    //Contains pages
    constructor(page_array)
    {
        super(page_array);
        this.Page_Cookie_Manager = new PageCookieManager();

        //this.set_page(this.Page_Cookie_Manager.get_page_number()).then(() => {console.log('ready')});
    }

    static async Initialize(domain)
    {
        let resolver = Data_Resolver.Build_From_Domain(domain);
        let table_of_contents = await resolver.async_load();
        let page_array = new Array(table_of_contents.length);

        table_of_contents.forEach((item, index) => {
            page_array[index] = new Page(resolver, item);
        });

        return BookModule.from(page_array);
    }

    open()
    {
        this.set_page();
    }

    set_page = async (page_num) =>
    {
        this.current_page = page_num;
        await this[page_num].async_load();
        await this[mod(page_num + 1, this.length)].async_load();
    }
    get_page()
    {
        return this[this.current_page];
    }

    turn_page(dX)
    {
        if (Math.abs(dX) >= DELTA)
        {
            this.current_page -= Math.sign(dX);
            this.current_page = mod((this.current_page), this.page_count);
            this.set_page(this.current_page);
        }
    }
}