import Cookies from "./node_modules/js-cookie/dist/js.cookie.mjs"

const PAGE_COOKIE_NAME = "page"

export class Bookmark
{

    constructor() {
        console.log("Initializing Bookmark....")
    }

    set_page_number(page)
    {
        if (Cookies.get("acceptCookies") == "true")
        {

            Cookies.set(PAGE_COOKIE_NAME, page);
        }
    }
    get_page_number()
    {
        return Cookies.get(PAGE_COOKIE_NAME) ? Cookies.get(PAGE_COOKIE_NAME) : 0;
    }
}