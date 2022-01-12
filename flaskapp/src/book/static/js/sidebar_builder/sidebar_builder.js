import {CPage, PageManager} from "../page/page";
import {Book} from "../book/book";
import Logger from "js-logger";

//split out into menu builder and manager
function menu_click_event(index)
{
    const event = new CustomEvent('set_page',
    {
        detail: {
            page: index,
        }
    })
    return event
}

export class SideBarBuilder
{
    constructor()
    {
        this.last_item = undefined;
        this.sidebar_element = document.getElementById("page-sidebar-contents")


    }

    create_menu_category(name, depth, category=this.sidebar_element, )
    {
        let category_text = document.createElement("span");
        category_text.innerHTML = name;

        let category_div = document.createElement("div");
        category_div.classList.add("menu-cat");
        category_div.classList.add(`category-depth-${depth}`)
        category_div.append(category_text);

        category.append(category_div);

        return category_div
    }

    create_menu_element(name, index)
    {
        let menu_text = document.createElement("p");
        menu_text.innerHTML = name;

        let menu_div = document.createElement("div");
        menu_div.id = `menu-item-${index}`;
        menu_div.classList.add("menu-item");

        //todo: this needs to be optimized to read from a data attribute so there is one single function.
        menu_div.onclick = () =>
        {
            menu_div.dispatchEvent(menu_click_event(index));
            this.set_active_menu_item(menu_div)
        }

        menu_div.append(menu_text);
        return menu_div;
    }

    set_active_menu_item = (menu_element) =>
    {
        if (this.last_item !== undefined)
        {
            this.last_item.classList.toggle("menu-active");
        }
        menu_element.classList.toggle("menu-active");
        this.last_item = menu_element;
    }
    set_active_menu_item_by_index = (index) =>
    {
        let element = document.getElementById(`menu-item-${index}`);
        Logger.info(`Element is: ${element}`);

        if (element !== null) this.set_active_menu_item(element);

    }

}

