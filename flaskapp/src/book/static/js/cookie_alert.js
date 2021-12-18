import Cookies from "js-cookie";
import Logger from "js-logger";
import {PAGE_COOKIE_NAME, ACCEPT_COOKIES} from "./bookmark/bookmark.js";

if (Cookies.get(ACCEPT_COOKIES) == 1)
{
    Logger.info("Hidding cookie alert...")
    document.getElementById("cookie-alert").hidden=true;
}

export function addCookieEvents() {
        Logger.info("Adding cookie event listeners...");

        document.getElementById("cookie-button-ok")
            .addEventListener('click',
                event => {
                        Logger.info("Accepting cookies...")
                        Cookies.set(ACCEPT_COOKIES, 1);
                        Cookies.set(PAGE_COOKIE_NAME, 0);
                        document.getElementById("cookie-alert").hidden = true;
                },
                false);

        document.getElementById("cookie-button-cancel")
            .addEventListener('click',
                event => {
                        Logger.info("Not accepting cookies...")
                        Cookies.set(ACCEPT_COOKIES, 0);
                        document.getElementById("cookie-alert").hidden = true;
                },
                false);
}

Logger.useDefaults()