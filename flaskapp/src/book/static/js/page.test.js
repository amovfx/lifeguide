//const js_add = require("./page")
import {IPFSBook, js_add, IPFS_Data_Resolver } from "./page.js"

const axios = require('axios').default;

beforeEach(() => {
    //run this code before each
    //setup data before tests
})

afterEach(() => {
    //tear down
})

beforeAll(async () => {
    //set up once
    const response = await axios.get('https://ipfs.io/ipfs/QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
})

afterAll(() => {
    //tear down after all
})

describe("test_basket", () => {



    it("my_test", () => {
        //calculate result
        let result = 5;
        expect(result).toEqual(5);
    })
    it("test_module_export", () => {
        let result = js_add(5,6);
        expect(result).toEqual(11);
    })
})

describe("Testing Data Resolvers", () =>
{
    let ipfs_endpoint = 'QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R'
    describe("Testing IPFS data resolver", () =>
    {
        let ipfs_data_resolver;

        it("Initializing IPFS_Data_Resolver", () =>
        {
            ipfs_data_resolver = new IPFS_Data_Resolver();
            expect(ipfs_data_resolver).toBeInstanceOf(IPFS_Data_Resolver)
            expect(ipfs_data_resolver.endpoint).toBe("https://ipfs.io/ipfs/")
        })

        it("IPFS_Data_Resolver.get_data", async () =>
        {
            let response = await ipfs_data_resolver.get_data(ipfs_endpoint)
            expect(response.status).toBe(200)
            expect(response.data[0]['Intro.01.md']).toBe("QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr")

        })

    })
})

describe("Testing IPFS Book", () =>
{

    var ipfs_data_response;
    beforeAll( async () => {
        ipfs_data_response = await axios.get('https://ipfs.io/ipfs/QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        console.log(ipfs_data_response.data)
    })

    it("Fetching contents", async () =>
    {

        expect(ipfs_data_response.status).toBe(200)
        expect(ipfs_data_response.data[0]['Intro.01.md']).toBe("QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr")
    })

    //it("Creating Page")

    it("Initialize book", () =>
    {
        let ipfs_book = new IPFSBook([]);
        expect(ipfs_book).isPrototypeOf(IPFSBook);
    })
})

//an example of mocking data
const forEach = (items, callback) => {
    for (let i = 0; i < items.length; i ++)
    {
        callback(items[i]);
    }
}


it("mock callback", () => {
    const mockCalledback = jest.fn(x => 741 + x);
    forEach([0,1], mockCalledback);
    expect(mockCalledback.mock.calls.length).toBe(2);
    expect(mockCalledback.mock.calls[0][0]).toBe(0);
    expect(mockCalledback.mock.results[0].value).toBe(741);
})

it("mock return", () => {
    const mock = jest.fn();

    mock.mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce("hello");

    let results1 = mock();
    let results2 = mock();
    let results3 = mock();

    expect(results1).toBe(false);
    expect(results2).toBe(true);
    expect(results3).toBe("hello");
})

// it ("mock axios", async () => {
//     jest.spyOn(axios, "get").mockReturnValueOnce({
//         data: {
//             id: 1,
//             todo: "Get 1m subs"
//         }
//     });
//     const results = await fetchData(1);
//     expect(results.todo).toBe("Get 1m subs");
// })