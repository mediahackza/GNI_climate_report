export async function load({ fetch, params, locals}) {


    let url = "https://datadesk.dev/api/json.php?table=160";


    let res = await fetch(url);
    let data = await res.json();
    
    let url_2 = 'https://datadesk.dev/api/json.php?table=161';
    let res_2 = await fetch(url_2);
    let data_2 = await res_2.json();

    // data = data.sort((a,b) => {
    //     return b.region.localeCompare(a.region);
    // })

    if (params.child) {
        return  {
            data: data,
        }
    }
    
    let central = [];
    let east = [];
    let west = [];
    let north = [];
    let south = [];
    let temp_tags = {};

    data_2.forEach(a => {
        let temp_ret = {
            id: a[""],
            code: a.iso_code,
            region: a.region,
            country: a.location,
            tags: new Set(),
            reports: new Set()
        }

        data.forEach(b => {
            if (b[a.location] == 'yes') {
                let t = b.tags;
                t = t.split(",");
                t.forEach(c =>{
                    c = c.trim();
                    temp_ret.tags.add(c);
                    temp_ret.reports.add(b.report);
                    if (!temp_tags.hasOwnProperty(c)) {
                        temp_tags[c] = new Set();
                    }
                    temp_tags[c].add(a.location);
                })
            }
        });

        switch (a.region) {
            case 'central':
                central.push(temp_ret);
                break;
            case 'east':
                east.push(temp_ret);
                break;
            case 'west':
                west.push(temp_ret);
                break;
            case 'north':
                north.push(temp_ret);
                break;
            case 'south':
                south.push(temp_ret);
                break;
        }
    })

    let countries = {
        central: central,
        east: east,
        west: west,
        north: north,
        south: south
    }
    
    // data_2.forEach(a => {
    //     let temp_ret = {
    //         id: a[""],
    //         code: a.iso_code,
    //         region: a.region,
    //         name: a.location,
    //         tags: new Set(),
    //         reports: new Set()
    //     };
    
        

    console.log("temp tags are:", temp_tags)

    const tags = temp_tags
    
        

    //     countries.push[temp_ret];
    // })
    
    
    return {
        data: data,
        countries: countries,
        tags: tags
    }
}