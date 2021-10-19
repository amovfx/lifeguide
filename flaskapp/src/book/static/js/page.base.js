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
    constructor(page_val) {
        console.log(`constructor: ${page_val}`)
        this.startX;

        this.page_num = 0;

        this.page_count = page_val;

        document.addEventListener('touchdown', this.down_event, false);
        document.addEventListener('touchup', this.up_event, false );


        window.addEventListener("load", this.load_event)
        window.load_page = set_page_data
    }

    load_event(event)
    {
        event.currentTarget.load_page(0);
    }
        get_page_num() {
        return this.page_num;
    }

    turn_page(dX)
    {
        if (Math.abs(dX) > 1)
        {
            console.log(`turn page: ${this.get_page_num()} : ${this.page_count}`)
            let next = mod((this.page_num + Math.sign(dX)), this.page_count);

            console.log(next);
            set_page_data(next);
            this.page_num = page_num
        }
    }



}

class PageDesktop extends PageManagerAbstract
{
    constructor(page_val) {
        super(page_val);
        document.addEventListener('mousedown', this.down_event, false);
        document.addEventListener('mouseup', this.up_event, false );
    }
    down_event(event)
    {
        console.log('down')
        this.startX = event.pageX;
        console.log(this.startX);
    }

    up_event(event)
    {
        console.log(event.pageX - this.startX);
        super.turn_page(event.pageX - this.startX);
    }
}

class PageMobile extends PageManagerAbstract
{
    getTouches(event)
    {
      return event.touches ||             // browser API
             eventt.originalEvent.touches; // jQuery
    }

    down_event(event)
    {
        const firstTouch = this.getTouches(event)[0];
        this.startX = firstTouch.clientX;
    };

    up_event(event)
    {
        if (!this.startX)
        {
            return;
        }
        super.turn_page(event.touches[0].clientX - this.startX);
        this.startX = null;
    }
}