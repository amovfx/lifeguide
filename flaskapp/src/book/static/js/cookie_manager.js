

export default class PageCookieManager
{
    PAGE_COOKIE_NAME = "page"
    set_page_number(page)
    {
        if ($.cookie("acceptCookies") == "true")
        {
            $.cookie(this.PAGE_COOKIE_NAME, page);
        }
    }
    get_page_number()
    {
        return $.cookie(this.PAGE_COOKIE_NAME) ? $.cookie(this.PAGE_COOKIE_NAME) : 0;
    }

    Cookies.set('')
}