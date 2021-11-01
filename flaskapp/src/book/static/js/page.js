
var delta = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

class IPFSBook
{
    //Contains pages
    constructor(table_of_contents) {
        this.page = 0;
        this.pages = new Array(table_of_contents.length)
        //register event listeners
    }

}

module.exports.IPFSBook = IPFSBook

class Page // page
{
    constructor(data) {
        this.title = data["Name"];
        this.ipfs_hash = data["Hash"];
        this.page_num;
    }

    set_page_num(page_num)
    {
        this.page_num = page_num;
    }

    async load_hash()
    {
        const response = await fetch(`https://ipfs.io/ipfs/${this.ipfs_hash}`)
        const data = response.json()
        this.data = this.process( data )
    }
    async process()
    {
        //convert md to appropriate links start loading links
        //cache data
        //populate data on page
    }
}

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

