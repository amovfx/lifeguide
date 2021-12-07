import Cookies from "js-cookie";
import Logger from "js-logger";


const PAGE_COOKIE_NAME = "page"

export class Bookmark
{

    constructor()
    {
        console.log("Initializing Bookmark....");
        this.page_num = 0;
    }

    set_page_number = (page) =>
    {
        if (Cookies.get("acceptCookies") === "true")
        {
            Cookies.set(PAGE_COOKIE_NAME, page);
        }
        else
        {
            this.page_num = page;
        }
    }

    get_page_number = () =>
    {
        if (Cookies.get("acceptCookies") === "true")
        {
            const val = Cookies.get(PAGE_COOKIE_NAME);
            Logger.info(`Getting Page number from cookie: ${val}`);
            return val;
        }
        else
        {
            const val = this.page_num;
            Logger.info(`Getting Page number from bookmark: ${val}`);
            return val;
        }
    }
}