export function load({ params, locals}) {
    // console.log(params);

    let temp = params.slug.split('-');
    let countries = temp[0];

    countries = countries.split(',');
    let tags = temp[1];

    tags = tags.split(',');

    let filters = {
        countries: countries,
        tags: tags
    }
    
    return {
        filter: filters
    }
}