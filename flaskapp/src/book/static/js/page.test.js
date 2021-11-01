//const js_add = require("./page")
import {IPFSBook, js_add } from "./page.js"

const axios = require('../../../../jest/node_modules/axios').default;
import request from './../../../../jest/node_modules/request';

jest.setTimeout(10000)

beforeEach(() => {
    //run this code before each
    //setup data before tests
})

afterEach(() => {
    //tear down
})

beforeAll(() => {
    //set up once
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

describe("Testing IPFS Book", () =>
{
    it("Fetching contents", async () =>
    {
        const response = await axios.get('https://ipfs.io/ipfs/QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        expect(response.status).toBe(200)
        expect(response.data[0]['Intro.01.md']).toBe("QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr")
    })
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