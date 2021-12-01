


//build resolver to return data
import {Data_Resolver,DOMAINS} from "./data_resolver/data_resolver";

export class Page // page
{
    constructor(data_resolver, data)
    {
        this.build(data_resolver, data);
    }

    build = (data_resolver, data) =>
    {

        let title = Object.keys(data)[0];
        let split_title = title.split(".");
        this.title = split_title[0];
        this.page_num = parseInt(split_title[1]);

        this.resolver = new Data_Resolver();
        this.resolver.set_domain(data_resolver.get_domain())
        this.resolver.set_route(data[title]);
    }

    load_page = async () =>
    {
        //add cache manager?
        //console.log("Loading page")
        this.resolver.async_load().then((content) => {
            this.set_content(content);
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




