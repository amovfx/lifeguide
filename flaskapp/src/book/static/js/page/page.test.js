
import {CPage} from "./page";
import {CDataResolver} from "../data_resolver/data_resolver";


/*
* Testing for centralized resolver
*
 */

const content_data = "My test page content";

beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify(content_data));
})
describe("Testing Page Module", () =>
{
    let DataResolver = CDataResolver.Local_Resolver();

    describe("Testing Page Initialization with local Resolver", () =>
    {
        let Page = new CPage(DataResolver, 5, "fifth_page");

        it("Constructing Page", () =>
        {
                expect(Page).toBeInstanceOf(CPage);
        })

        it( `Async load: Page.get_content() == ${content_data}`, async () =>
        {
            await Page.async_load();
            expect(Page.get_content()).toBe("My test page content");
        })

        it(`Page.set_content("My Content")`, () =>
        {
            Page.set_content("My content");
            expect(Page.get_content()).toBe("My content")
        })

        it (`Page.get_page_num() == 5`, () =>
        {
            expect(Page.get_page_num()).toBe(5);
        })

        it(`Page.get_title() == fifth_page`, () =>
        {
            expect(Page.get_title()).toBe("fifth_page");
        })

        it(`Page.set_title("New title")`, () =>
        {
            Page.set_title("New title");
            expect(Page.get_title()).toBe("New title");
        })
    })


})



