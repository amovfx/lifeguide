


//build resolver to return data
import {Data_Resolver,DOMAINS} from "../data_resolver/data_resolver";
import Logger from "js-logger";

export class Page // page
{
    constructor(data_resolver, data)
    {
        let title = Object.keys(data)[0];
        let split_title = title.split(".");
        this.set_title(split_title[0]);
        this.set_page_num(parseInt(split_title[1]));

        //create a resolver, it would be nice to
        this.resolver = new Data_Resolver();
        this.resolver.set_domain(data_resolver.get_domain())
        this.resolver.set_route(data[title]);

    }

    async_load = async () =>
    {
        return this.resolver.async_load().then((result) => {
            this.page_contents = result;
        });

    }

    set_content = (content) =>
    {
        this.page_contents = content
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

    }

    get_title = () =>
    {
        return this.title;
    }

    set_title(title)
    {
        this.title = title;
    }
}

export function render_page(page)
{
    page.async_load().then(() => {
        document.getElementById("page-contents").innerHTML = page.get_content();
        document.getElementById("page-number-text").innerHTML = page.get_page_num()
        document.getElementById("title").innerHTML = page.get_title();
    });
}

export class PageManager
{
    constructor(pages) {
        this.pages = []
    }

    render_page(page)
    {
        this.pages[page].async_load().then(() => {
            document.getElementById("page-contents").innerHTML = page.get_content();
            document.getElementById("page-number-text").innerHTML = page.get_page_num()
            document.getElementById("title").innerHTML = page.get_title();
    });
}
}


