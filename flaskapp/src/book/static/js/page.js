const {default: axios} = require("axios");

var delta = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}
//build resolver to return data


class Data_Resolver
{

    static Local_Resolver()
    {
        let local_resolver = new Data_Resolver()
        local_resolver.set_domain('http://127.0.0.1:5000');
        local_resolver.set_route('/book/contents');
        return local_resolver;
    }

    static IPFS_Resolver()
    {
        let ipfs_resolver = new Data_Resolver();
        ipfs_resolver.set_domain('https://ipfs.io/ipfs/');
        ipfs_resolver.set_route('QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        return ipfs_resolver;
    }

    static Web2_Resolver()
    {
        let web2_resolver = new Data_Resolver();
        web2_resolver.set_domain('https://kaizens.guide');
        web2_resolver.set_route('/book/contents');
        return web2_resolver;
    }
    set_domain(domain)
    {
        this.domain = domain;
    }

    set_route(route)
    {
        this.route = route;
    }

    get_route = () =>
    {
        return this.route;
    }

    get_data = async () =>
    {
        //add browser cache management here.
        if (this.route !== undefined)
        {
            let response = await axios.get(`${this.domain}${this.route}`)
            if (response.status == 200)
            {
                return response['data'];
            }
            else
            {
                throw Error(`${this.domain}${route} does not exist.`);
            }
        }
        else
        {
            throw Error(`${route} is undefined.`);
        }
    }
}
module.exports.Data_Resolver = Data_Resolver

class Table_of_Contents
{
    constructor(chapters, resolver) {
        this.chapters = chapters;
        this.resolver = resolver;
    }

    static async local()
    {
        let local_resolver = Data_Resolver.Local_Resolver()
        let data = await local_resolver.get_data();
        return new Table_of_Contents(data, local_resolver);
    }

    static async ipfs()
    {
        let ipfs_resolver = Data_Resolver.IPFS_Resolver()
        let data = await ipfs_resolver.get_data();
        return new Table_of_Contents(data, ipfs_resolver);
    }

    static async web2()
    {
        let web2_resolver = Data_Resolver.Web2_Resolver();
        let data = await web2_resolver.get_data();
        return new Table_of_Contents(data, web2_resolver);
    }
}
module.exports.Table_of_Contents = Table_of_Contents

class Page // page
{
    constructor(data_resolver, title, page_num)
    {
        this.data_resolver = data_resolver
        this.page_num = page_num;
        this.title = title;
    }

    set_page_data = () =>
    {
        if (this.page_data)
        {
            $("#page-contents").html(this.page_data);
            $("#page-number").html(this.page_num);
            $("#page-title").html(this.title);
        }
        else
        {
            throw new Error("page_data is not available.")
        }
    }

    load_page_data = async () =>
    {
        //render this data to html
        this.page_data = await this.data_resolver.get_data()
    }
    get_page_data= () =>
    {
        return this.page_data;
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
module.exports.Page = Page



class Book
{
    //Contains pages
    constructor(table_of_contents) {
        this.table_of_contents = table_of_contents;

        this.pages = new Array(this.table_of_contents.length);

        let first_page = this.make_page(this.table_of_contents, 0);
        first_page.load_page_data();
        first_page.set_page_data();
        this.pages[0] = first_page;

        this.make_pages()
    }
    dupe (table_of_contents) {
        this.current_page = 0;
        this.table_of_contents = table_of_contents;

        // await Promise.all(files.map(async (file) => {
        // const contents = await fs.readFile(file, 'utf8')
        // console.log(contents)
        // }));

        //create first page and load it.
        let first_page = this.make_page(table_of_contents[0], 0);
        first_page.load_page_data();
        first_page.set_page_data();
        this.pages[0] = first_page;



        //register event listeners
    }

    load_page()
    {

    }

    make_page = (item, index) =>
    {
        let title = Object.keys(item)[0];
        let route = item[title];
        let data_resolver = this.data_resolver;
        data_resolver.set_route(route);
        return new Page(data_resolver, title, index);
    }

    make_pages = (table_of_contents) =>
    {
        table_of_contents.forEach((item, index) => {
            this.pages[index] = this.make_page(item, index);
        });
    }

    async load_neighbors()
    {
        await this.pages[this.current_page + 1].load_page_data()
        await this.pages[this.current_page - 1].load_page_data()
    }

    turn_page(direction)
    {
        //check if load is complete
        this.current_page += Math.sign(direction);
        return this.current_page.load_page()

    }
}

module.exports.Book = Book







class ContentDataManager {

    endpoint_map = {
        'local' : (page_num) => {return `/book/content/${page_num}`},
        'ipfs' : () => { return`https://ipfs.io/ipfs/QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R`}
    }
    constructor(data_source)
    {
        if (data_source in this.endpoint_map)
        {
            this.end_point = this.endpoint_map.get(data_source);
        }
        else
        {
            throw new Error(`Missing endpoint map: ${data_source}`)
        }
    }

    set_content = (val) => {
        fetch(this.end_point(val)).then
        (
            (response) => {
                response.json().then((data) => {
                    $("#page-contents").html(data);
                })
            }
        )
        $("#page-number-text").html(page_num);
    }
}



/**
* Cookie manager to get and set the page number from the previous visit.
*
* */
class PageCookieManager
{
    PAGE_COOKIE_NAME = "page"
    set_page_cookie_value(page)
    {
        if ($.cookie("acceptCookies") == "true")
        {
            $.cookie(this.PAGE_COOKIE_NAME, page);
        }
    }
    get_page_cookie_value()
    {
        return $.cookie(this.PAGE_COOKIE_NAME) ? $.cookie(this.PAGE_COOKIE_NAME) : 0;

    }
}

class PageDataManager
{
    constructor(page_count, data_strategy) {
        this.page_count = page_count;
        this.Page_Cookie_Manager = new PageCookieManager();
        this.Data_Strategy = data_strategy;
        
        this.page_num = this.Page_Cookie_Manager.get_page_cookie_value();
        this.init_load_event_listeners()
    }
    
    turn_page(dX)
    {
        if (Math.abs(dX) >= delta)
        {
            this.page_num -= Math.sign(dX);
            let next = mod((this.page_num), this.page_count);
            this.Data_Strategy(next);
            this.Page_Cookie_Manager.set_page_cookie_value(next);
        }
    }
    
    init_load_event_listeners()
    {
        window.addEventListener("load", () => {
            this.Data_Strategy(this.Page_Cookie_Manager.get_page_cookie_value())
        })
    }
    
}


class PageManagerAbstract
{
    constructor(page_count, PageTurnStrat)
    {
        this.startX;
        this.Page_Cookie_Manager = new PageCookieManager();
        this.Page_Turn_Strategy = new PageTurnStrat();
        this.page_num = this.Page_Cookie_Manager.get_page_cookie_value();
        this.page_count = page_count;

    }

    turn_page(dX)
    {
        if (Math.abs(dX) >= delta)
        {
            this.page_num -= Math.sign(dX);
            let next = mod((this.page_num), this.page_count);
            set_page_data(next);
            this.Page_Cookie_Manager.set_page_cookie_value(next);
        }
    }

    init_load_event_listeners()
    {
        window.addEventListener("load", () => {
            set_page_data(this.Page_Cookie_Manager.get_page_cookie_value())
        })
    }
}

class EventStrategy
{
    constructor(event_name_down, event_name_up, dataManager_function)
    {
        this.event_name_down = event_name_down;
        this.event_name_up = event_name_up;
        this.fn = dataManager_function
    }

}

class EventStrategyDesktop extends EventStrategy
{
    down_event = (event) =>
    {
        this.startX = event.pageX;
    }
    up_event = (event) =>
    {
        this.fn(event.pageX - this.startX);
    }
}

class EventStrategyMobile extends EventStrategy
{
    down_event = (event) =>
    {
        this.startX = event.changedTouches[0].screenX;
    }
    up_event = (event) =>
    {
        this.fn(event.changedTouches[0].screenX - this.startX);
    }
}

function CreatePageTurnEventListeners(strategy)
{
        document.addEventListener(strategy.event_name_down
            , (event) => {strategy.down_event()}
            , false);
        document.addEventListener(strategy.event_name_up
            , (event) => {strategy.up_event()}
            , false);
}

class PageManager
{
    constructor(event_strategy, data_manager)
    {
        self.event_strategy = event_strategy;
        self.data_manager = data_manager;
        
        self.cookie_manager = new PageCookieManager();
    }
    
    
}



class PageTurnEventListeners
{
    constructor(strategy) {
        this.strategy = strategy;
        this.init_event_listeners()
    }

    init_event_listeners()
    {
        document.addEventListener(this.strategy.event_name_down
            , (event) => {this.strategy.down_event()}
            , false);
        document.addEventListener(this.strategy.event_name_up
            , (event) => {this.strategy.up_event()}
            , false);

    }
}

class PageDesktop extends PageManagerAbstract
{
    constructor(page_val)
    {
        super(page_val,"mousedown","mouseup");

        //sad ass attempt and overriding
        this.down_event = (event) =>
        {
            this.startX = event.pageX;
        }
        this.up_event = (event) =>
        {
            this.turn_page(event.pageX - this.startX);
        }
        this.init_load_event_listeners()
    }
}

class PageMobile extends PageManagerAbstract
{
    constructor(page_val) {
        super(page_val, "touchstart", "touchend");

        //sad ass attempt at overriding
        this.down_event = (event) =>
        {
            this.startX = event.changedTouches[0].screenX;
        }
        this.up_event = (event) =>
        {
            super.turn_page(event.changedTouches[0].screenX - this.startX);
        }
        this.init_load_event_listeners()
    }

}


function js_add(a,b)
{
    return a + b;
}
module.exports.js_add = js_add

