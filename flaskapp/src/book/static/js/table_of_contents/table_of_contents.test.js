import Table_of_Contents from "./table_of_contents";

import * as https from 'https';
https.globalAgent.options.rejectUnauthorized = false


describe("Table of Contents",  () => {

    describe("Local", () => {
        it ("Resolver", async () => {
            let table_of_contents = await Table_of_Contents.Local();
            expect(table_of_contents.resolver.get_domain()).toBe('http://127.0.0.1:5000')
        })

        it ("Chapters data", async () => {
            let table_of_contents = await Table_of_Contents.Local();
            expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "/book/content/0"});
        })

        it ("Count", async () => {
            let table_of_contents = await Table_of_Contents.Local();
            expect(table_of_contents.count()).toBe(27);
        })
    })

    describe("IPFS", () => {
        it ("Resolver", async () => {
            let table_of_contents = await Table_of_Contents.IPFS();
            expect(table_of_contents.resolver.get_domain()).toBe('https://ipfs.io/ipfs/');
        })

        it ("Chapter's data", async () => {
            let table_of_contents = await Table_of_Contents.IPFS();
            expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "QmTDnfTQ37682djSgujCDhaW4k9Fw4ZdtBJHZpqyQfXwfr"});

        })

        it ("Count", async () => {
            let table_of_contents = await Table_of_Contents.IPFS();
            expect(table_of_contents.count()).toBe(27);
        })
    })

    describe("Web2", () => {
        it ("Resolver", async () => {
            let table_of_contents = await Table_of_Contents.Web2();
            expect(table_of_contents.resolver.get_domain()).toBe('https://kaizens.guide');
        })

        it ("Chapter's data", async () => {
            let table_of_contents = await Table_of_Contents.Web2();
            expect(table_of_contents.chapters[0]).toMatchObject({"Intro.01.md": "/book/content/0"});
        })

        it ("Count", async () => {
            let table_of_contents = await Table_of_Contents.Web2();
            expect(table_of_contents.count()).toBe(27);
        })
    })

})