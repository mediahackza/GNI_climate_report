export async function load({ parent, params }) {
    // let { data } = await parent();

    console.log(params)
    // console.log(data);

    let temp = params.slug.split("&");

    let country = temp[0];
    let tag = temp[1];
    let region = temp[2];

    


    let filters = {
        country: country.split(","),
        tag: tag.split(","),
        region: region.split(",")
    }

    if (filters.country[0] == '') {
        filters.country = []
    }

    if (filters.tag[0] == '') {
        filters.tag = []
    }

    if(filters.region[0] == '') {
        filters.region = ['central', 'east', 'west', 'north', 'south']
    }

    return {
        filters: filters
    };

}