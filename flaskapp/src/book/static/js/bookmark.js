import Cookies from "./node_modules/js-cookie/dist/js.cookie.mjs"

export class Bookmark
{
    constructor() {
        console.log("Initializing Bookmark....")
    }
    PAGE_COOKIE_NAME = "page"
    set_page_number(page)
    {
        if (Cookies.get("acceptCookies") == "true")
        {
            Cookies.set(this.PAGE_COOKIE_NAME, page);
        }
    }
    get_page_number()
    {
        return Cookies.get(this.PAGE_COOKIE_NAME) ? Cookies.get(this.PAGE_COOKIE_NAME) : 0;
    }
}