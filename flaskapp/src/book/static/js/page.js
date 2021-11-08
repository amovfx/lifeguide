
import {Data_Resolver} from "./data_resolver/data_resolver";
import Table_of_Contents from "./table_of_contents/table_of_contents";

var delta = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}
//build resolver to return data


function set_page_data(Page)
{
    $("#page-contents").html(Page.page_data);
    $("#page-number").html(Page.page_num);
    $("#page-title").html(Page.title);
}


export default class Page // page
{
    constructor(data_resolver, data)
    {
        this.resolver = data_resolver;

        let title = Object.keys(data)[0];
        let split_title = title.split(".");

        this.title = split_title[0];
        this.page_num = parseInt(split_title[1]);

        this.resolver.set_route(data[title]);
    }

    async_load = async () =>
    {
        //render this data to html
        this.page_contents = await this.resolver.async_load()
    }
    get_content = () =>
    {
        return this.page_contents;
    }

    get_page_num = () =>
    {
        return this.page_num;
    }

    set_page_num = (page_num) =>
    {
        this.page_num = page_num;
        $("#page-number").html(this.page_num);

    }

    get_title = () =>
    {
        return this.title;
    }

    set_title(title)
    {
        this.title = title;
        $("#page-number").html(this.page_num);
    }
}






