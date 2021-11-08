const {default: axios} = require("axios");

export default class Data_Resolver
{

    static Local_Resolver()
    {
        let local_resolver = new Data_Resolver()
        local_resolver.set_domain('http://127.0.0.1:5000');
        local_resolver.set_route('/book/contents');
        return local_resolver;
    }

    static IPFS_Resolver()
    {
        let ipfs_resolver = new Data_Resolver();
        ipfs_resolver.set_domain('https://ipfs.io/ipfs/');
        ipfs_resolver.set_route('QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        return ipfs_resolver;
    }

    static Web2_Resolver()
    {
        let web2_resolver = new Data_Resolver();
        web2_resolver.set_domain('https://kaizens.guide');
        web2_resolver.set_route('/book/contents');
        return web2_resolver;
    }

    set_domain(domain)
    {
        this.domain = domain;
    }

    get_domain()
    {
        return this.domain;
    }

    set_route(route)
    {
        this.route = route;
    }

    get_route = () =>
    {
        return this.route;
    }

    async async_load ()
    {
        //add browser cache management here.
        if (this.route !== undefined)
        {
            let response = await axios.get(`${this.domain}${this.route}`)
            if (response.status == 200)
            {
                return response['data'];
            }
            else
            {
                throw Error(`${this.domain}${route} does not exist.`);
            }
        }
        else
        {
            throw Error(`${route} is undefined.`);
        }
    }
}