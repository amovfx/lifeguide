
import {CPage} from "./page";
import {CDataResolver} from "../data_resolver/data_resolver";


/*
* Testing for centralized resolver
*
 */


beforeEach(() => {
    fetch.mockResponseOnce("My test page content");
})
describe("Testing Page Module", () =>
{
    let DataResolver = CDataResolver.Local_Resolver();

    describe("Testing Page Initialization with local Resolver", () =>
    {
        let Page = new CPage(DataResolver, 0);
        it("Constructing Page", () =>
            {
                expect(Page).toBeInstanceOf(CPage);
            })
    })


})



