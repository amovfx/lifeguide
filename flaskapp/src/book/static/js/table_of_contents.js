

import Data_Resolver from "./data_resolver";

import Page from "./page";

export default class Table_of_Contents
{
    constructor(chapters, resolver) {
        this.chapters = chapters;
        this.resolver = resolver;
    }

    static async local()
    {
        let local_resolver = Data_Resolver.Local_Resolver()
        let data = await local_resolver.async_load();
        return new Table_of_Contents(data, local_resolver);
    }

    static async ipfs()
    {
        let ipfs_resolver = Data_Resolver.IPFS_Resolver()
        let data = await ipfs_resolver.async_load();
        return new Table_of_Contents(data, ipfs_resolver);
    }

    static async web2()
    {
        let web2_resolver = Data_Resolver.Web2_Resolver();
        let data = await web2_resolver.async_load();
        return new Table_of_Contents(data, web2_resolver);
    }

    build_page(index)
    {
        return new Page(this.resolver, this.chapters[index]);
    }

    count()
    {
        return this.chapters.length;
    }
}
