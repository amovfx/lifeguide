//const js_add = require("./page")
import {IPFSBook, js_add, IPFS_Data_Resolver, Data_Resolver } from "./page.js"

const axios = require('axios').default;

jest.setTimeout(15000)
describe("Testing Data Resolvers", () =>
{
    let ipfs_endpoint = 'QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R'
    describe("Testing IPFS data resolver", () =>
    {
        let ipfs_data_resolver;

        it("Initializing IPFS_Data_Resolver", () => {
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

describe("Testing centralized data resolvers", () =>
{
    let centralized_endpoint = "localhost:5000";
    describe("Data Resolver", () =>
    {
        let data_resolver = new Data_Resolver(centralized_endpoint);
        it("Initialization", () =>
        {
            expect(data_resolver).toBeInstanceOf(Data_Resolver);
            expect(data_resolver.endpoint).toBe(centralized_endpoint);
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
