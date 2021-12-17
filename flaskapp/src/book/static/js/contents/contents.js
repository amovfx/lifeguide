import Logger from "js-logger";

function buildItem(chapter, fn)
{
    let menuItem = document.createElement("div");
    let menu_text = document.createElement("p");
    //add function to call book Interface.
    menu_text.innerHTML = chapter;
    menuItem.append(menu_text);
    return menuItem;

}

export async function buildMenu(pages, book_interface)
{
    Logger.info(pages);
    let sidebar = document.getElementById("page-sidebar-contents")
    pages.forEach((item, index) =>
    {
        let title = item.get_title();
        let formatted_title = title.replace('_',' ');
        let capitalized_title = formatted_title.charAt(0).toUpperCase() + formatted_title.slice(1)
        let new_item = buildItem(capitalized_title);
        new_item.firstChild.onclick = () =>
        {
            book_interface.goto_page(index);
        }
        sidebar.append(new_item);
    })
}