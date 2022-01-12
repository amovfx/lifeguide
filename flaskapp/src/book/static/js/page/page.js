


//build resolver to return data
import {CDataResolver,DOMAINS} from "../data_resolver/data_resolver";
import Logger from "js-logger";

export class CPage // page
{
    constructor(data_resolver, data, title)
    {
        this.set_page_num(data);
        this.set_title(title)

        //create a resolver, it would be nice to
        this.resolver = new CDataResolver();
        this.resolver.set_domain(data_resolver.get_domain())
        this.resolver.set_route(`/book/content/${data}`);

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

export class PageRenderer
{
    constructor() {
    }
}

export class HTMLRenderer extends PageRenderer
{
    async render(page)
    {
        page.async_load().then(() => {
            document.getElementById("page-contents").innerHTML = page.get_content();
            document.getElementById("page-number-text").innerHTML = page.get_page_num()
            document.getElementById("title").innerHTML = page.get_title();
        });
    }
}

export class PageManager
{
    constructor() {
        Logger.info('Buildling PageManager')
        this.pages = new Array(0);
        this.Renderer = new HTMLRenderer();
    }

    create_page = (resolver, page_num, title) =>
    {
        let page = new CPage(resolver, page_num, title);
        this.pages.push(page);
    }

    get_pages()
    {
        return this.pages;
    }

    async render(page_num) {

        let page = this.pages[page_num];
        page.async_load().then((result) => {
            this.Renderer.render(page);
        });
    }

}


