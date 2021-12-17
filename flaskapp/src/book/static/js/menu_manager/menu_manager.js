

function create_menu_element(chapter)
{
    let menu_text = document.createElement("p");
    menu_text.innerHTML = chapter;

    let menu_div = document.createElement("div");
    menu_div.classList.add("menu-item");
    menu_div.append(menu_text);

    return menu_div;
}

function format_title(title)
{
    let formatted_title = title.replace('_',' ');
    let capitalized_title = formatted_title.charAt(0).toUpperCase() + formatted_title.slice(1)
    return capitalized_title;
}

export class MenuManager
{
    constructor()
    {
        this.last_item = undefined;
        this.sidebar_element = document.getElementById("page-sidebar-menu_manager")
    }

    async initialize_menu(pages, book_interface)
    {
        pages.forEach((item, index) =>
        {
            let title = format_title(item.get_title());
            let new_item = create_menu_element(title);

            if (index === 0)
            {
                this.last_item = new_item;
                new_item.classList.toggle("menu-active");
            }

            new_item.onclick = () =>
            {
                book_interface.goto_page(index);
            }
            this.sidebar_element.append(new_item);
        })
    }

    set_active_menu_item(page_num)
    {
        this.last_item.classList.toggle("menu-active");
        let menu_item = this.sidebar_element.children[page_num];
        menu_item.classList.toggle("menu-active");
        this.last_item = menu_item;
    }

}