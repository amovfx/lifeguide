
import Table_of_Contents from "./sidebar_manager/sidebar_manager";


const axios = require('axios').default;
jest.setTimeout(50000)



/*
* Testing for centralized resolver
*
 */

describe("Testing centralized Data_resolverModule", () =>
{
    describe("Testing Table of Contents", () => {

        it ("Table of Contents (local)", async () =>
        {
            let table_of_contents = await Table_of_Contents.Local();
            expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "/lifeguide/content/0"})
        })

        it ("Table of Contents (ipfs)", async () =>
        {
            let table_of_contents = await Table_of_Contents.IPFS();
            expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr"})
        })

    })

    describe("Testing BookModule",  () => {


        it ("Testing Page", async () => {
            let table_of_contents = await Table_of_Contents.Local();
            let new_page = table_of_contents.build_page(0);
            expect(new_page.get_title()).toBe("Intro");
            expect(new_page.get_page_num()).toBe(1);
        })

        it ("Testing Page Data", async () => {
            let table_of_contents = await Table_of_Contents.Local();
        })


    })



})


