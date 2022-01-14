
import { PageManager} from "../page/page.js";
import Logger from "js-logger";
import {SideBarBuilder} from "../sidebar_builder/sidebar_builder";
import {CDataResolver} from "../data_resolver/data_resolver";

function mod(n, m) {
    return ((n % m) + m) % m;
}

export class CBookFactory
{
    constructor(book_class)
    {
        Logger.info("Constructing BookFactory. ");
        this.book_class = book_class

    }

    make_book = async (resolver) =>
    {
        return resolver.async_load().then((result) =>
        {
            //build menu and create book at the same time
            let page_manager = new PageManager();
            let menu_builder = new SideBarBuilder();

            const iterate = (table_of_contents, category, depth) =>
            {
                Object.keys(table_of_contents).forEach((chapter) =>
                {
                    let new_category_element = menu_builder.create_menu_category(chapter, depth, category);
                    category.append(new_category_element);
                    if (Array.isArray(table_of_contents[chapter]))
                    {
                        table_of_contents[chapter].forEach((page_data) => {
                            if (!Array.isArray(page_data))
                            {
                                iterate(page_data, new_category_element, depth+1);
                            }
                            else
                            {
                                let page_num = page_data[0];
                                let page_title = page_data[1];

                                page_manager.create_page(resolver, page_num, page_title);
                                let menu_item = menu_builder.create_menu_element(page_title, page_num);
                                new_category_element.append(menu_item);
                                if (page_num === 0)
                                {
                                    menu_builder.set_active_menu_item(new_category_element);
                                }
                            }
                        })
                    }
                })
            }
            iterate(result, menu_builder.sidebar_element,0);
            return new this.book_class(page_manager, menu_builder)

        })
    }
}

export class CBook
{
    constructor(pageman, menuman)
    {
        this.PageManager = pageman;
        this.MenuManager = menuman;

        this.page_count = this.PageManager.pages.length

        //this listens to the events that menu manager broadcasts
        document.addEventListener('set_page', (e) =>
        {
            this.set_page(e.detail.page);
        })

    }
    get_title()
    {
        return this.title
    }

    set_title(title)
    {
        this.title = title;
    }

    get_page_count()
    {
        return this.page_count;
    }

    set_page(page_num)
    {
        page_num = mod(page_num, this.get_page_count());
        this.MenuManager.set_active_menu_item_by_index(page_num);
        this.PageManager.render(page_num);
    }
}

export async function mock_book()
{
    const sidebar_data = {"Lifeguide":[[0,"Intro"],{"Environment":[[1,"Context"],[2,"Past"],[3,"Present"],[4,"Future"]]},{"Autonomy":[[5,"Autonomy"],{"Current Mindset":[[6,"Introspection"],[7,"Psychometrics"],[8,"Motivations"],[9,"Cognitive Biases"]]},{"Next Mindset":[[10,"Growth Mindset"],[11,"Grit"],[12,"Patience"],[13,"Willpower"],[14,"Humility"],[15,"Curiosity"],[16,"Vision"]]}]},{"Mastery":[[17,"Intro"],[18,"Habits"],[19,"Exercise"],[20,"Sleep"],[21,"Nutrition"],[22,"Finances"],[23,"Focus"],[24,"Goals"],[25,"Fear"],[26,"Environment"],[27,"Data Management"],[28,"Time Management"]]},{"Purpose":[[29,"Intro"],{"Relationships":[[30,"Trust"],[31,"Relationships"],[32,"Social Skill"],[33,"Teamwork"],[34,"Negotiating"]]}]},{"Investment Strategy":[[35,"Investing Strategy"]]}]};

    fetch.mockResponseOnce(JSON.stringify(sidebar_data));
    document.body.innerHTML = `<div id="page-sidebar-contents"></div>`

    const book_factory = new CBookFactory(CBook)
    const book_data = CDataResolver.Local_Resolver();
    let book = await book_factory.make_book(book_data).then((book) =>
    {
        return book;
    });
    return book;

}