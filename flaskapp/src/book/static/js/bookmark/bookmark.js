import Cookies from "js-cookie";
import Logger from "js-logger";

export const PAGE_COOKIE_NAME = "page";
export const ACCEPT_COOKIES = "acceptCookies";

const hasAcceptedCookies = () =>
{
    return (Cookies.get(ACCEPT_COOKIES) == "1")
}

export class CBookmark
{

    constructor()
    {
        Logger.info("Initializing Bookmark....");
        this.page_num = undefined;
    }

    accept_cookines

    set_page_number = (page) =>
    {
        if (hasAcceptedCookies())
        {
            Cookies.set(PAGE_COOKIE_NAME, page);
        }
        this.page_num = page;

    }

    get_page_number = () =>
    {
        if ((hasAcceptedCookies()) && (this.page_num === undefined))
        {
            this.page_num = Cookies.get(PAGE_COOKIE_NAME);
        }
        return this.page_num;

    }
}