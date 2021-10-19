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
class PageManagerAbstract
{
    constructor(page_count, event_down_name="mousedown", event_up_name="mouseup") {

        this.startX;
        this.page_num = 0;
        this.page_count = page_count;
        this.event_down_name = event_down_name;
        this.event_up_name = event_up_name;
    }

    turn_page(dX)
    {
        if (Math.abs(dX) > 1)
        {
            this.page_num -= Math.sign(dX);
            let next = mod((this.page_num), this.page_count);
            set_page_data(next);
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

        window.addEventListener("load", this.load_event)
        window.load_page = set_page_data
    }

    load_event(event)
    {
        event.currentTarget.load_page(0);
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
        this.init_event_listeners()
    }
}

class PageMobile extends PageManagerAbstract
{
    constructor(page_val) {
        super(page_val, "touchstart", "touchmove");

        //sad ass attempt at overriding
        this.down_event = (event) =>
        {
            const firstTouch = this.getTouches(event)[0];
            this.startX = firstTouch.clientX;
        }
        this.up_event = (event) =>
        {
            super.turn_page(event.touches[0].clientX - this.startX);
        }


    }
    getTouches(event)
    {
      return event.touches ||             // browser API
             event.originalEvent.touches; // jQuery
    }
}