export async function load({ locals, params }) {
    console.log(params);
    let item = params.slug.split("&");


    let active_filters = {
        countries: new Set(),
        tags: new Set(),
        regions: new Set(),
        subregions: new Set()
    }

    item[0].split(",").forEach(a => {
        if (a != '') {
            active_filters.countries.add(a);
        }
    })

    item[1].split(",").forEach(a => {
        if (a != '') {
            active_filters.countries.add(a);
        }
    });

    item[2].split(",").forEach(a => {
        if (a != ''){
            active_filters.regions.add(a);
        }
        
    });

    item[3].split(",").forEach(a => {
        if (a != '') {
            active_filters.subregions.add(a);
        }
    });

    return {
        active_filters
    };
    
}