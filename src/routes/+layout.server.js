
export async function load({ locals, fetch }) {
    let url = 'https://datadesk.dev/api/json.php?table=160';
    let res = await fetch(url)
    let data = await res.json()

    
    //   

    let url_2 = 'https://datadesk.dev/api/json.php?table=161';
    let res_2 = await fetch(url_2)
    let data_2 = await res_2.json()
    let countries = {};
    let tags = new Set();
    let subregions = new Set();

    let countries_tags = new Set();


    data_2 = data_2.map(el => {
        if (el.region_2!= '') {
            subregions.add(el.region_2);
        }
       
        countries[el.location] = {
            iso: el.iso_code,
            country: el.location,
            region: el.region_1,
            subregion: el.region_2,
            tags: new Set(),
            reports: new Set(),
        }
    });

    data = data.map(el => {
        let regions = new Set()
        return {
            report: el.report,
            link: el.link,
            regions: new Set(),
            countries: new Set(Object.keys(el).filter(a => {
                if (el[a] == 'yes'){
                    regions.add(countries[a].region)
                    return a; 
                }            
            })),
            tags: new Set(el.tags.split(",").map(a => a.trim()))
        }
    });

    data.forEach((item, index) => {

        item.countries.forEach(country => {
            item.tags.forEach(tag => {
                countries[country].tags.add(tag);
                tags.add(tag);
                countries[country].reports.add(index)
            });
            item.regions.add(countries[country].region)
        })
    })

   tags = Array.from(tags).map(a => {
        return {
            type: 'tag',
            name: a
        }
   })

   tags = [...tags,...[
    {
        type: 'region',
        name: 'central'
    },
    {
        type: 'region',
        name: 'east'
    },
    {
        type: 'region',
        name: 'west'
    }, {
        type: 'region',
        name: 'north'
    },
    {
        type: 'region',
        name: 'south'
    }
   ],
   ...Array.from(subregions).map(e => {
    let ret = {
        type: 'subregion',
        name: ''
    }

    switch (e) {
        case 'ssa':
            ret.name = 'Sub-Saharan Africa'
            break;
        case 'na':
            ret.name = 'North Africa';
            break;

    }

    return ret;
   }), 
   ...Object.keys(countries).map(a => {
    return {
        type: 'country',
        name: a
    }
   })]


    return {
        data,
        countries: countries,
        tags: tags,
    };
}