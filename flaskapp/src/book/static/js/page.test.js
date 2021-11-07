//const js_add = require("./page")
import {  Data_Resolver, Page, Book, Table_of_Contents } from "./page.js"

const axios = require('axios').default;
jest.setTimeout(50000)



/*
* Testing for centralized resolver
*
 */

describe("Testing centralized Data_Resolver", () =>
{
        describe("Testing Table of Contents", () => {

            it ("Table of Contents (local)", async () =>
            {
                let table_of_contents = await Table_of_Contents.local();
                expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "/book/content/0"})
            })

            it ("Table of Contents (ipfs)", async () =>
            {
                let table_of_contents = await Table_of_Contents.ipfs();
                expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr"})
            })

        })


})


