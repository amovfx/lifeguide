
import {Data_Resolver} from "./data_resolver";
import Table_of_Contents from "./table_of_contents";

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
    constructor(resolver, data)
    {
        this.resolver = resolver;

        let title = Object.keys(data);
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



/**
* Cookie manager to get and set the page number from the previous visit.
*
* */





class PageManagerAbstract
{
    constructor(page_count, PageTurnStrat)
    {
        this.startX;
        this.Page_Cookie_Manager = new PageCookieManager();
        this.Page_Turn_Strategy = new PageTurnStrat();
        this.page_num = this.Page_Cookie_Manager.get_page_number();
        this.page_count = page_count;

    }

    turn_page(dX)
    {
        if (Math.abs(dX) >= delta)
        {
            this.page_num -= Math.sign(dX);
            let next = mod((this.page_num), this.page_count);
            set_page_data(next);
            this.Page_Cookie_Manager.set_page_number(next);
        }
    }

    init_load_event_listeners()
    {
        window.addEventListener("load", () => {
            set_page_data(this.Page_Cookie_Manager.get_page_number())
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

