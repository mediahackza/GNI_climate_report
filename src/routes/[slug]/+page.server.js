export async function load({ parent, params }) {
    let { data } = await parent({params: { child: true}});

    console.log(params)
    console.log(data);

    let temp = params.slug.split("&");

    let country = temp[0];
    let tag = temp[1];

    let current_data = [];

    switch (filters.country) {
        case 'east':
            data = data.filter(a => {
                return a.region == 'east';    
            });
            break;
        case 'west':
            data = data.filter(a => {
                return a.region == 'west';    
            });
            break;
        case 'north':
            data = data.filter(a => {
                return a.region == 'north';    
            });
            break;
        case 'south':
            data = data.filter(a => {
                return a.region == 'south';    
            });
            break;
        case 'central':
            data = data.filter(a => {
                return a.region == 'central';    
            });
            break;
        default:
            break;
    }
    

    // if (filters.country.includes('east') || filters.country.includes('west') || filters.country.includes('north') || filters.country.includes('south') || filters.country.includes('central')) {
    //     current_data = current_data.filter(a => {
            
    //     });
    // }

    let filters = {
        country: country.split(","),
        tag: tag.split(",")
    }

    await data.forEach(a => {
        let temp = {
            report: a.report,
            link: a.link,
            tags: a.tags.split(",").map(b => {
                return b.trim();
            }),
            countries: Object.keys(a).filter(b => {
                return (b != 'report' && b != 'link' && b != 'tags' && b != 'region') && a[b] == 'yes';
            }),
        }

        

        current_data.push(temp);
    });

    
    
    // if (country != '') {
    //     current_data = current_data.filter(a => {
    //         return a[country] == 'yes';
    //     })
    
    // }
    
    // current_data = current_data.filter(a => {
    //     return a.tags.includes(tag)
    // })

    // current_data = current_data.forEach(a => {
    //     a.report = {
    //         name: a.report,
    //     }
    //     return  {
    //         report: a.report,
    //         link: a.link,
    //         tags: a.tags,
    //         country: a[country]
    //     }
    // })

    return {
        data,
        country: country,
        filters: filters,
        current_data: current_data
    };

}