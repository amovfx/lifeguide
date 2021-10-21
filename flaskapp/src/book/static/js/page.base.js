
var delta = 6;

function mod(n, m) {
    return ((n % m) + m) % m;
}

function set_page_data(page_num)
{
    fetch(`/book/content/${page_num}`).then
    (
        (response) => {
            response.json().then((data) => {
                $("#page-contents").html(data);
            })
        }
    )
    $("#page-number-text").html(page_num);
}

class PageCookieManager
{
    getCookie(cname)
    {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++)
        {
            let c = ca[i];
            while (c.charAt(0) == ' ')
            {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0)
            {
              return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    set_page_cookie_value(page)
    {
        if (this.getCookie("acceptCookies") == "true")
        {
            document.cookie = `page=${page}`;
        }
    }
    get_page_cookie_value()
    {
        if (this.getCookie("page"))
        {
            return this.getCookie("page")
        }
        else
        {
            return 0;
        }
    }
}


class PageManagerAbstract
{
    constructor(page_count, event_down_name="mousedown", event_up_name="mouseup")
    {
        this.startX;
        this.Page_Cookie_Manager = new PageCookieManager();
        this.page_num = this.Page_Cookie_Manager.get_page_cookie_value();
        this.page_count = page_count;
        this.event_down_name = event_down_name;
        this.event_up_name = event_up_name;

    }

    get_page_num()
    {
        return this.page_num;
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
    down_event(event)
    {
        alert("Not Implimented");
    }

    up_event(event)
    {
        alert("Not implimented");
    }

    init_event_listeners()
    {
        document.addEventListener(this.event_down_name, this.down_event, false);
        document.addEventListener(this.event_up_name, this.up_event, false );
    }
    init_load_event_listeners()
    {
        window.addEventListener("load", () => {
            set_page_data(this.Page_Cookie_Manager.get_page_cookie_value())
        })
    }
}

class DocumentEventStrategy
{
    constructor(event_name, event) {
        this.event_name = event_name;
        this.event_fn = event;
    }

    init_doc_event_listener()
    {
        document.addEventListener(this.event_down_name, this.event_fn, false);
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
            console.log("poopy")
            this.startX = event.changedTouches[0].screenX;
        }
        this.up_event = (event) =>
        {
            super.turn_page(event.changedTouches[0].screenX - this.startX);
        }
        this.init_load_event_listeners()
    }

}

