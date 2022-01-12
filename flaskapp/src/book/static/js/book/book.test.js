import {Book, BookFactory} from "../main.js";
import {CDataResolver} from "../data_resolver/data_resolver";

require('jest-fetch-mock').enableMocks()

const sidebar_data = {"Lifeguide":[[0,"Intro"],{"Environment":[[1,"Context"],[2,"Past"],[3,"Present"],[4,"Future"]]},{"Autonomy":[[5,"Autonomy"],{"Current Mindset":[[6,"Introspection"],[7,"Psychometrics"],[8,"Motivations"],[9,"Cognitive Biases"]]},{"Next Mindset":[[10,"Growth Mindset"],[11,"Grit"],[12,"Patience"],[13,"Willpower"],[14,"Humility"],[15,"Curiosity"],[16,"Vision"]]}]},{"Mastery":[[17,"Intro"],[18,"Habits"],[19,"Exercise"],[20,"Sleep"],[21,"Nutrition"],[22,"Finances"],[23,"Focus"],[24,"Goals"],[25,"Fear"],[26,"Environment"],[27,"Data Management"],[28,"Time Management"]]},{"Purpose":[[29,"Intro"],{"Relationships":[[30,"Trust"],[31,"Relationships"],[32,"Social Skill"],[33,"Teamwork"],[34,"Negotiating"]]}]},{"Investment Strategy":[[35,"Investing Strategy"]]}]};


describe("Test BookModule", () => {

    it("Initialize BookModule", async () => {
        fetch.mockResponseOnce(JSON.stringify(sidebar_data));

        document.body.innerHTML = `<div id="page-sidebar-contents"></div>`

        const book_factory = new BookFactory(Book)
        const book_data = CDataResolver.Local_Resolver();
        let book = await book_factory.make_book(book_data).then((book) =>
        {
            return book;
        });
        console.log(book)
        expect(book.get_page_count()).toBe(36);
    })
})