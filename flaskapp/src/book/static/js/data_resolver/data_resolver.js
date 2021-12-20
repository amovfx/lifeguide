import Logger from "js-logger";


export const DOMAINS = {
    LOCAL: 'http://localhost',
    WEB2: '',
    IPFS: 'https://ipfs.io/ipfs/',
}

export class Data_Resolver
{

    static Local_Resolver()
    {
        let local_resolver = new Data_Resolver()
        local_resolver.set_domain(DOMAINS.LOCAL);
        local_resolver.set_route('/book/menu_manager');
        return local_resolver;
    }

    static IPFS_Resolver()
    {
        let ipfs_resolver = new Data_Resolver();
        ipfs_resolver.set_domain(DOMAINS.IPFS);
        ipfs_resolver.set_route('QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        return ipfs_resolver;
    }

    static Web2_Resolver()
    {
        let web2_resolver = new Data_Resolver();
        web2_resolver.set_domain(DOMAINS.WEB2);
        web2_resolver.set_route('/book/menu_manager');
        return web2_resolver;
    }

    static Build_From_Domain(domain)
    {
        switch(domain)
        {
            case DOMAINS.LOCAL:
                return Data_Resolver.Local_Resolver();
            case DOMAINS.WEB2:
                return Data_Resolver.Web2_Resolver();
            case DOMAINS.IPFS:
                return Data_Resolver.IPFS_Resolver();
        }
    }

    set_domain = (domain) =>
    {
        this.domain = domain;
    }

    get_domain = () =>
    {
        return this.domain;
    }

    get_domain_type = () =>
    {
        return Object.keys(DOMAINS).find(key => DOMAINS[key] === this.domain);
    }

    set_route = (route) =>
    {
        this.route = route;
    }

    get_route = () =>
    {
        return this.route;
    }

    async_load  = async () =>
    {
        //add browser cache management here.
        if (this.route !== undefined)
        {
            Logger.info(`${this.get_domain_type()} Resolver fetching: ${this.domain}${this.route}`)
            let response = await fetch(`${this.domain}${this.route}`)

            if (response.status === 200)
            {
                let data = await response.json();
                return data;
            }
            else
            {
                throw Error(`${this.domain}${this.route} does not exist.`);
            }
        }
        else
        {
            throw Error(`${this.route} is undefined.`);
        }
    }
}
