

import Data_Resolver from "../data_resolver/data_resolver";


export default class Table_of_Contents
{
    static async Local()
    {
        let local_resolver = Data_Resolver.Local_Resolver()
        let data = await local_resolver.async_load();
        return new Table_of_Contents(data, local_resolver);
    }

    static async IPFS()
    {
        let ipfs_resolver = Data_Resolver.IPFS_Resolver()
        let data = await ipfs_resolver.async_load();
        return new Table_of_Contents(data, ipfs_resolver);
    }

    static async Web2()
    {
        let web2_resolver = Data_Resolver.Web2_Resolver();
        let data = await web2_resolver.async_load();
        return new Table_of_Contents(data, web2_resolver);
    }

    constructor(chapters, resolver) {
        this.chapters = chapters;
        this.resolver = {...resolver};
    }

    count = () =>
    {
        return this.chapters.length;
    }
}
