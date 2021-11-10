
import Page from "../page";
import PageCookieManager from "../cookie_manager";

export default class Book
{
    //Contains pages
    constructor(table_of_contents)
    {
        this.table_of_contents = table_of_contents;
        this.pages = new Array(table_of_contents.count());
        //this.build_page(0);
        this.make_pages();

        //this.Page_Cookie_Manager = new PageCookieManager();
        //this.set_page(this.Page_Cookie_Manager.get_page_number);
    }

    build_page(index)
    {
        return new Page(this.table_of_contents.resolver,
            this.table_of_contents.chapters[index]);
    }


    set_page = async (page_num) =>
    {
        this.current_page = page_num;
        await this.pages[page_num].async_load();
    }

    turn_page(dX)
    {
        if (Math.abs(dX) >= delta)
        {
            this.current_page -= Math.sign(dX);
            this.current_page = mod((this.current_page), this.page_count);
        }
    }
    page_count()
    {
        return this.pages.length;
    }

    get_page(page_num)
    {
        return this.pages[page_num];
    }

    make_pages = () =>
    {
        this.table_of_contents.chapters.forEach((item, index) => {
            this.pages[index] = this.build_page(index);
        });
    }

    async load_neighbors()
    {
        await this.pages[this.current_page + 1].load_page_data()
        await this.pages[this.current_page - 1].load_page_data()
    }

    turn_page(direction)
    {
        //check if load is complete
        this.current_page += Math.sign(direction);
        return this.current_page.load_page()

    }
}

module.exports.Book = Book