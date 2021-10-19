function mod(n, m) {
    return ((n % m) + m) % m;
}

class PageAbstract
{
    constructor(page_count) {
        this.startX;

        this.page_num = 0;
        this.page_count = page_count;

        document.addEventListener('touchdown', this.down_event, false);
        document.addEventListener('touchup', this.up_event, false );
    }

    turn_page(dX)
    {
        if (Math.abs(dX) > 1)
        {
            let next = mod((page_num + Math.sign(dX)), this.page_count);
            this.set_page_data(next);
        }
    }

    set_page_data(page_num)
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
        this.page_num = page_num
    }
}

class PageDesktop extends PageAbstract
{
    down_event(event)
    {
        this.startX = event.pageX;
    }

    up_event(event)
    {
        this.turn_page(event.pageX - this.startX);
    }
}

class PageMobile extends PageAbstract
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
        this.turn_page(event.touches[0].clientX - this.startX);
        this.startX = null;
    }
}