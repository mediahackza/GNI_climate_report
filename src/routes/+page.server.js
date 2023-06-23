export async function load({ }) {
    let url = "https://datadesk.dev/api/json.php?table=160";


    let res = await fetch(url);
    let data = await res.json();

    // console.log(data);
    let ret = {
        data: data,
        tags: [],
    }

    ret.countries = Object.keys(data[0]);

    data.forEach((item) => {
        let temp = item.tags.split(",");

        console.log(temp);

        temp.forEach((tag) => {
            tag = tag.replace(" ", "");
            if (!ret.tags.includes(tag)) {
                ret.tags.push(tag);
            }
        });
    });

    ret.tags = ret.tags.map(e => {
        return {
            tag: e,
            active: true
        }
    });

    ret.countries = ret.countries.filter(e => !(e == "tags" || e == "link" || e == "report"));

    ret.countries = ret.countries.map(e => {
            return {
                country: e,
                active: true
            }
    })
    // console.log(tags);

    return ret
}