import fetch from 'node-fetch'
globalThis.fetch = fetch

import { load_ipfs_book_contents } from 'page.base.js'


it("test ipfs", () => {
    let result = load_ipfs_book_contents("QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R")
    expect(result).toBe(value);
})

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
        expect(result).toEqual()
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
    expect(mockCalledback.mock.calls[0][0].toBe(0));
    expect(mockCalledback.mock.results[0].value).toBe(741);
})

it("mock return", () => {
    const mock = jest.fn();

    mock.mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce("hello");

    results1 = mock();
    results2 = mock();
    results3 = mock();

    expect(results1.toBe(false));
    expect(results2.toBe(true));
    expect(results3.toBe("hello"));
})

it ("mock axios", async () => {
    jest.spyOn(axios, "get").mockReturnValueOnce({
        data: {
            id: 1,
            todo: "Get 1m subs"
        }
    });
    const results = await fetchData(1);
    expect(results.todo).toBe("Get 1m subs");
})