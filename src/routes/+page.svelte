<script>
    import { goto } from '$app/navigation';
    import Sorting from '$components/Sorting_system.svelte';

    export let data;
    console.log("data:", data);

    let regions = ['central', 'east', 'north', 'south', 'west'];
    let subregions = ['ssa','na'];

    let active_filters = {
        tags: new Set(), 
        countries: new Set(),
        regions: new Set(regions),
        subregions: new Set()
    }

    const refresh = () => {
        data = data;
        active_filters = active_filters;
    }

    const navigate = (tags, countries, regions, subregions) => {
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

    const get_long = (subregion) => {
        switch (subregion) {
            case 'ssa':
                return 'Sub-Saharan Africa';
            case 'na':
                return 'Northern Africa';  
            default:
                return subregion;
        }
    }


    
</script>

<Sorting {active_filters} {data} {refresh}/>

<table>
    <thead>
        <tr>
            <th></th>
            <th>region</th>
            <th>subregion</th>
            {#each Array.from(active_filters.tags) as tag}
                <th class='clickable'
                    on:click={() => {
                        navigate([tag], [], [], []);
                    }}
                >
                    {tag}
                </th>
            {/each}
        </tr>
    </thead>

    <tbody>
        {#each Object.keys(data.countries) as c}
        {#if active_filters.countries.has(c) || active_filters.regions.has(data.countries[c].region) || active_filters.subregions.has(data.countries[c].subregion)}
            <tr>
                <td class="clickable"
                    on:click={() => {
                        navigate([], [c], [], []);
                    }}
                >
                    {c}
                </td>
                <td>
                    {data.countries[c].region}
                </td>
                <td>
                    {get_long(data.countries[c].subregion)}
                </td>
                {#each Array.from(active_filters.tags) as tag}
                    <td class=" clickable {data.countries[c].tags.has(tag) ? 'has_tag' : 'no_tag'}"
                        on:click={() => {
                            navigate([tag], [c], [], []);
                        }

                        }
                    ></td>
                {/each}
            </tr>
        {/if}
        {/each}
    </tbody>
</table>

<style>

    td, th {
        border: 1px solid black;
    }

    .clickable {
        cursor: pointer;
        background-color: #eee;
    }

    .clickable:hover {
        opacity: 0.5;
    }

    
    .has_tag {
        background-color: #7B9E89;
    }

    .no_tag {
        background-color: #EF6461;
    }
</style>