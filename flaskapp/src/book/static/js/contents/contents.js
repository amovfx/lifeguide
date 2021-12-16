import Logger from "js-logger";

function buildItem(chapter)
{
    let menuItem = document.createElement("div");
    let menu_text = document.createElement("a");
    //add function to call book Interface.
    menu_text.innerHTML = chapter;
    menuItem.append(menu_text);
    return menuItem;

}

export async function buildMenu(pages)
{
    Logger.info(pages);
    let sidebar = document.getElementById("page-sidebar-contents")
    pages.forEach((item) =>
    {
        let title = item.get_title();
        let formatted_title = title.replace('_',' ');
        let capitalized_title = formatted_title.charAt(0).toUpperCase() + formatted_title.slice(1)
        let new_item = buildItem(capitalized_title);
        sidebar.append(new_item);
    })
}