


//build resolver to return data


class Page // page
{
    constructor(data_resolver, data)
    {
        this.resolver = { ...data_resolver};

        let title = Object.keys(data)[0];
        let split_title = title.split(".");
        this.title = split_title[0];
        this.page_num = parseInt(split_title[1]);
        this.resolver.route = data[title];
    }

    async async_load()
    {
        //add cache manager?
        this.page_contents = await this.resolver.async_load()
    }

    get_content = () =>
    {
        return this.page_contents;
    }

    get_page_num = () =>
    {
        return this.page_num;
    }

    set_page_num = (page_num) =>
    {
        this.page_num = page_num;
        $("#page-number").html(this.page_num);

    }

    get_title = () =>
    {
        return this.title;
    }

    set_title(title)
    {
        this.title = title;
        $("#page-number").html(this.page_num);
    }
}

export default Page




