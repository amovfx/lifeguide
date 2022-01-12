import {CDataResolver, DOMAINS} from "./data_resolver";


//import * as https from 'https';
//https.globalAgent.options.rejectUnauthorized = false



describe("Testing centralized Data_resolverModule", () => {
    describe("Local", () => {
        it ("Getters", () => {
            let local_resolver = CDataResolver.Local_Resolver();
            expect(local_resolver.get_domain()).toBe(DOMAINS.LOCAL);
            expect(local_resolver.get_route()).toBe(('/lifeguide/sidebar_builder'))
        })

        it ("Setters", () => {
            let local_resolver = CDataResolver.Local_Resolver();
            local_resolver.set_domain('http://127.0.0.2:5000');
            local_resolver.set_route('/lifeguide/content');
            expect(local_resolver.get_domain()).toBe('http://127.0.0.2:5000');
            expect(local_resolver.get_route()).toBe(('/lifeguide/content'))
        })

        it("Loading", async () => {

            fetch.mockResponseOnce(JSON.stringify([{"Intro.01.md": "/lifeguide/content/0"}]))
            let local_resolver = CDataResolver.Local_Resolver();
            let data = await local_resolver.async_load();
            expect(data[0]).toMatchObject({"Intro.01.md": "/lifeguide/content/0"})
        })
    })

    describe("IPFS", () => {
        it ("Getters", () => {
            let ipfs_resolver = CDataResolver.IPFS_Resolver();
            expect(ipfs_resolver.get_domain()).toBe('https://ipfs.io/ipfs/');
            expect(ipfs_resolver.get_route()).toBe('QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        })

        it ("Setters", () => {
            let ipfs_resolver = CDataResolver.IPFS_Resolver();

            ipfs_resolver.set_domain('https://ipfs.io/ipfs/');
            ipfs_resolver.set_route('QmXY68cNw16ASk2crFRG2nv6GVUgAaSfrwr9wGosqsgW8R');

            expect(ipfs_resolver.get_domain()).toBe('https://ipfs.io/ipfs/');
            expect(ipfs_resolver.get_route()).toBe('QmXY68cNw16ASk2crFRG2nv6GVUgAaSfrwr9wGosqsgW8R')
        })

        it("Loading", async () => {
            fetch.mockResponseOnce(JSON.stringify([{"Intro.01.md": "QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr"}]))

            let ipfs_resolver = CDataResolver.IPFS_Resolver();
            let data = await ipfs_resolver.async_load();

            expect(data[0]).toMatchObject({"Intro.01.md": "QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr"})
        })
    })

    describe("Web2", () => {
        it("Getters", () => {
            let web2_resolver = CDataResolver.Web2_Resolver();
            expect(web2_resolver.get_domain()).toBe('https://kaizens.guide');
            expect(web2_resolver.get_route()).toBe('/lifeguide/sidebar_builder')
        })

        it ("Setters", () => {
            let web2_resolver = CDataResolver.Web2_Resolver();

            web2_resolver.set_domain('https://kaizens-super.guide');
            web2_resolver.set_route('/lifeguide/content/5');

            expect(web2_resolver.get_domain()).toBe('https://kaizens-super.guide');
            expect(web2_resolver.get_route()).toBe('/lifeguide/content/5')
        })

        it("Loading", async () => {
            fetch.mockResponseOnce(JSON.stringify([{"Intro.01.md": "/lifeguide/content/0"}]))
            let web2_resolver = CDataResolver.Web2_Resolver();
            let data = await web2_resolver.async_load();
            expect(data[0]).toMatchObject({"Intro.01.md": "/lifeguide/content/0"})
        })
    })
})
