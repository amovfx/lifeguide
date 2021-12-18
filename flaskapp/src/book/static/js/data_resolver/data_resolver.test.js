import {Data_Resolver, DOMAINS} from "./data_resolver";


//import * as https from 'https';
//https.globalAgent.options.rejectUnauthorized = false



describe("Testing centralized Data_resolverModule", () => {
    describe("Local", () => {
        it ("Getters", () => {
            let local_resolver = Data_Resolver.Local_Resolver();
            expect(local_resolver.get_domain()).toBe(DOMAINS.LOCAL);
            expect(local_resolver.get_route()).toBe(('/book/menu_manager'))
        })

        it ("Setters", () => {
            let local_resolver = Data_Resolver.Local_Resolver();
            local_resolver.set_domain('http://127.0.0.2:5000');
            local_resolver.set_route('/book/content');
            expect(local_resolver.get_domain()).toBe('http://127.0.0.2:5000');
            expect(local_resolver.get_route()).toBe(('/book/content'))
        })

        it("Loading", async () => {
            let local_resolver = Data_Resolver.Local_Resolver();
            let data = await local_resolver.async_load();
            expect(data[0]).toMatchObject({"Intro.01.md": "/book/content/0"})
        })
    })

    describe("IPFS", () => {
        it ("Getters", () => {
            let ipfs_resolver = Data_Resolver.IPFS_Resolver();
            expect(ipfs_resolver.get_domain()).toBe('https://ipfs.io/ipfs/');
            expect(ipfs_resolver.get_route()).toBe('QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        })

        it("Loading", async () => {
            let ipfs_resolver = Data_Resolver.IPFS_Resolver();
            let data = await ipfs_resolver.async_load();
            console.log(data)
            expect(data[0]).toMatchObject({"Intro.01.md": "QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr"})
        })
    })

    describe("Web2", () => {
        it("Getters", () => {
            let web2_resolver = Data_Resolver.Web2_Resolver();
            expect(web2_resolver.get_domain()).toBe('https://kaizens.guide');
            expect(web2_resolver.get_route()).toBe('/book/menu_manager')
        })

        it("Loading", async () => {
            let web2_resolver = Data_Resolver.Web2_Resolver();
            let data = await web2_resolver.async_load();
            expect(data[0]).toMatchObject({"Intro.01.md": "/book/content/0"})
        })
    })
})
