import Cookies from "js-cookie";
import Logger from "js-logger";

if (Cookies.get("acceptCookies") === "true")
{
        document.getElementById("cookie-alert").hidden=true;
}

document.getElementById("cookie-button-ok")
    .addEventListener('click',
    (event) => {
        Logger.info("Accepting cookies...")
        Cookies.set("acceptCookies", true);
        document.getElementById("cookie-alert").hidden=true;
        },
    false);

document.getElementById("cookie-button-cancel")
    .addEventListener('click',
    (event) => {
        Logger.info("Not accepting cookies...")
        Cookies.set("acceptCookies", false);
        document.getElementById("cookie-alert").hidden=true;
        },
    false);