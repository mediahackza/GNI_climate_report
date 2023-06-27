export async function load({ fetch, locals }) {
    let url = "https://datadesk.dev/api/json.php?table=160";


    let res = await fetch(url);
    let data = await res.json();

    locals.data = "hello there";

    
    data.map(e => {
        e.tags = e.tags.split(",");
        for (let i = 0; i < e.tags.length; i++) {
            e.tags[i] = e.tags[i].trim();
        }
        return e
    });

    

    let ret = {
        data: data,
        tags: [],
        countries: []
    }

        let countries = Object.keys(data[0]);
        countries = countries.filter(e => !(e == "tags" || e == "link" || e == "report"));

    let tags = [];
    data.forEach((item) => {
        let temp = item.tags;

        temp.forEach((tag) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
    });

    ret.tags = tags.map(e => {
        return {
            tag: e,
            active: true
        }
    });


    
    ret.countries = countries.map(e => {
        let ret = {
            country: e
        }

        data.forEach(item => {
            if (item[e] == "yes") {
                item.tags.forEach(a => {
                    ret[a] = true;
                })
            }

            if (item[e] == "no") {
                item.tags.forEach(a => {
                    ret[a] = false;
                })
            }

            if (item[e] == "") {
                item.tags.forEach(a => {
                        ret[a] = null;
                })
            }
        });
        return ret;
    })

    return ret
}