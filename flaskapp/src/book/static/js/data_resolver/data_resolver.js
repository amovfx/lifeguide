const {default: axios} = require("axios");


const DOMAIN = {
    LOCAL: 'http://127.0.0.1:5000',
    WEB2: 'https://kaizens.guide',
    IFPS: 'https://ipfs.io/ipfs/'
}

export default class Data_Resolver
{

    static Local_Resolver()
    {
        let local_resolver = new Data_Resolver()
        local_resolver.set_domain(DOMAIN.LOCAL);
        local_resolver.set_route('/book/contents');
        return local_resolver;
    }

    static IPFS_Resolver()
    {
        let ipfs_resolver = new Data_Resolver();
        ipfs_resolver.set_domain(DOMAIN.IFPS);
        ipfs_resolver.set_route('QmXY68cNw16ASk2crFRG2nv6GVU8AaSfrwr9wGosqsgW8R')
        return ipfs_resolver;
    }

    static Web2_Resolver()
    {
        let web2_resolver = new Data_Resolver();
        web2_resolver.set_domain(DOMAIN.WEB2);
        web2_resolver.set_route('/book/contents');
        return web2_resolver;
    }

    set_type = (type) =>
    {
        this.type = type;
    }

    set_domain = (domain) =>
    {
        this.domain = domain;
    }

    get_domain = () =>
    {
        return this.domain;
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
            console.log(this.domain, this.route)
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