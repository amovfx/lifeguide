

import Data_Resolver from "../data_resolver/data_resolver";


export default class Table_of_Contents extends Array
{
    static async build(domain)
    {
        let resolver = Data_Resolver.from_domain(domain);
        let data = await resolver.async_load();
        return new Table_of_Contents(data, domain)
    }

    constructor(chapters, resolver_type) {
        super([...chapters]);
        this.resolver_type = resolver_type;
    }
}
