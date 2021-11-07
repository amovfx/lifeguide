//const js_add = require("./page")
import {IPFSBook, js_add, IPFS_Data_Resolver, Data_Resolver, Page, Book } from "./page.js"

const axios = require('axios').default;
jest.setTimeout(50000)

describe("Testing Data Resolvers", () =>
{
    let ipfs_endpoint = 'QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R'
    describe("Testing IPFS data resolver", () =>
    {
        let ipfs_data_resolver;

        it("Initializing IPFS_Data_Resolver", () => {
            ipfs_data_resolver = new IPFS_Data_Resolver();
            expect(ipfs_data_resolver).toBeInstanceOf(IPFS_Data_Resolver);
            expect(ipfs_data_resolver.endpoint).toBe("https://ipfs.io/ipfs/");
        })

        it("IPFS_Data_Resolver.get_data", async () =>
        {
            let response = await ipfs_data_resolver.get_data(ipfs_endpoint);
            expect(response.status).toBe(200);
            expect(response.data[0]['Intro.01.md']).toBe("QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr");

        })

    })
})

/*
* Testing for centralized resolver
*
 */

describe("Testing centralized Data_Resolver", () =>
{
    let centralized_endpoint = "http://127.0.0.1:5000";
    describe("Data Resolver", () =>
    {
        let data_resolver = new Data_Resolver(centralized_endpoint);
        it("Initialization", () =>
        {
            expect(data_resolver).toBeInstanceOf(Data_Resolver);
            expect(data_resolver.endpoint).toBe(centralized_endpoint);
        })

        it("get data", async () => {
            data_resolver.set_route('/book/contents')
            let response = await data_resolver.get_data();
            expect(response[0]).toMatchObject({"Intro.01.md": "/book/content/0"});


        });

        describe("Testing Page", () => {

            var table_of_contents = undefined;
            it("Check data_resolver for table of contents", async () => {
                let response = await data_resolver.get_data();
                expect(response[0]).toMatchObject({"Intro.01.md": "/book/content/0"});
            })

            it ("Initialize Table of Contents", () => {
                table_of_contents = Page.table_of_contents(data_resolver);
                expect(table_of_contents.get_page_num()).toBe(-1);
                expect(table_of_contents.get_title()).toBe("Table of Contents");
            })

            it ("Getting data", async () => {
                await table_of_contents.load_page_data();
                let data = table_of_contents.get_page_data()[0];
                expect(data).toMatchObject({"Intro.01.md": "/book/content/0"})
            })

            it ("Making the first page.", async () =>
            {
                console.log("Making first page")
                let pages = table_of_contents.get_page_data()[0];
                console.log(pages)
                let book = new Book(data_resolver);
                let Page = book.make_page(pages, 0);
                await Page.load_page_data();
                console.log(Page.get_page_data());
                let test_data = Page.get_page_data().split(/\r?\n/)[0]
                expect(test_data).toBe("<h1>Welcome to the life guide!</h1>");
            })



        })

    })
})

describe("Testing IPFS Book", () =>
{

    var ipfs_data_response;
    beforeAll( async () => {
        ipfs_data_response = await axios.get('https://ipfs.io/ipfs/QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R');

    })

    it("Fetching contents", async () =>
    {

        expect(ipfs_data_response.status).toBe(200);
        expect(ipfs_data_response.data[0]['Intro.01.md']).toBe("QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr");
    })

    //it("Creating Page")

    it("Initialize book", () =>
    {
        let ipfs_book = new IPFSBook([]);
        expect(ipfs_book).isPrototypeOf(IPFSBook);
    })
})
