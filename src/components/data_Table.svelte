<script>


    export let countries;
    export let active_tags;
    export let dev_mode = false;

    import { goto } from '$app/navigation';

    // $: console.log("active tags: ", active_tags, countries)

    let tags = [];
    let country_tags = [];
    let url = '';

    const navigate = (tags, countries, regions, subregions) => {

// let active_filters = {

    // }

    // tag_list.forEach(a => {
    //     if (a.active) {
    //         if (active_filters[a.type] == undefined) {
    //             active_filters[a.type] = new Set();
    //         }
    //         active_filters[a.type].add(a.name);
    //     }
    // });

        let url = './';
        if (tags.length > 0) {
            url += Array.from(tags).join(',')
        }
        url += '&';
        if (countries.length > 0) {
            url += Array.from(countries).join(',') + '&';
        }
        url += '&';
        if (regions.length > 0) {
            url += Array.from(regions).join(',') + '&';
        }
        url += '&';
        if (subregions.length > 0) {
            url += Array.from(subregions).join(',') + '&';
        }
        console.log("url:", url)
        goto(url);
    }

    $: active_tags.forEach((a, i) => {
        if (i == 0) {
            tags = [];
            country_tags = [];

        }
        // console.log("runnign thi thing")
        if (a.active == false && dev_mode == false) return;
        if (a.type == 'country') {
            country_tags.push(a.name)
        } 
        if (a.type == 'tag') {
            tags.push(a.name)
        }
    })

    // $: console.log("tags:", tags)
    // $: console.log("countries:", country_tags)

</script>

<table>
    <thead>
        <tr>
            <th>

            </th>

            {#each tags as tag}
                <th>{tag}</th>
            {/each}
        </tr>
    </thead>

    <tbody>
        {#each country_tags as c}
        <tr>
            <td>{c}</td>
            {#each tags as t}
            {#if countries[c].tags.has(t)}
                <td on:click={() => {
                    navigate([t], [c], [], []);
                }} class='has_tag'></td>
            {:else}
                <td class='no_tag'></td>
            {/if}
            {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .has_tag {
        background-color: #C5D86D;
    }

    .no_tag {
        background-color: #D7263D;
    }
</style>