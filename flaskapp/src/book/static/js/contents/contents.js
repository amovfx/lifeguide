

function buildItem(chapter)
{
    let menuItem = document.createElement("div");
    let menu_text = document.createElement("a");
    menu_text.innerHTML = chapter;
    menuItem.append(menu_text);

}

function buildMenu(book)
{
    console.log( book.get_table_of_contents() )
}