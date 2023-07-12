<script>
    import { goto } from '$app/navigation';
    import Sorting from '$components/Sorting_system.svelte';
    import Tag from '$components/Tag.svelte';
    import TagContainer from '$components/Tag_container.svelte';
    import SearchBar from '$components/Search_container.svelte';
    import DataTable from '$components/data_Table.svelte';
    import ReportTable from '$components/report_table.svelte';
    import SearchContainer from '$components/Search_container.svelte';
    import { Tag_con } from '$helpers/tags.js';
    export let data;
    console.log("data:", data);

    let region_index = {};

    let tag_list = data.tags.map((t, i) => {
        if (t.type == 'region' || t.type == 'subregion') {
            region_index[t.name] = i;
        }
        return new Tag_con(t.type, t.name)}
    );

    console.log("tag_list:", tag_list);

    tag_list.forEach(t => {
        
        if (t.type == 'country') {
            let sb_region;

            switch (data.countries[t.name].subregion) {
                case 'ssa':
                    sb_region = 'Sub-Saharan Africa';
                    break;
                case 'na':
                    sb_region = 'Northern Africa';
                    break;
                default:
                    sb_region = data.countries[t.name].subregion;
            }

            if (region_index.hasOwnProperty(sb_region)) {
                tag_list[region_index[sb_region]].addChild(t);
            }
            
            tag_list[region_index[data.countries[t.name].region]].addChild(t);
            
            console.log(t.name, data.countries[t.name].region, tag_list[region_index[data.countries[t.name].region]].children);
        }
        // if (t.type == 'country') {
        //     tag_list[data.countries[t.name].region].addChild(t);
        // }
    })



    console.log("region_index:", region_index);
    // console.log("tag_list:", tag_list);

    // let regions = ['central', 'east', 'north', 'south', 'west'];
    // let subregions = ['ssa','na'];

    // let active_filters = {
    //     tags: new Set(), 
    //     countries: new Set(),
    //     regions: new Set(regions),
    //     subregions: new Set()
    // }

    // const refresh = () => {
    //     data = data;
    //     active_filters = active_filters;
    // }

    

    // const get_long = (subregion) => {
    //     switch (subregion) {
    //         case 'ssa':
    //             return 'Sub-Saharan Africa';
    //         case 'na':
    //             return 'Northern Africa';  
    //         default:
    //             return subregion;
    //     }
    // }
        let tag_count =0;
        let country_count = 0;

        $: tag_list.forEach((t, i) => {
            if (i == 0 ) {
                tag_count =0;
                country_count = 0;
            }
            // console.log("tag:", t)
            if (t.active) {
                switch (t.type) {
                    case 'tag':
                        tag_count++;
                        break;
                    case 'country':
                        country_count++;
                        break;
                }
            }
        })
    

    let table_t = false;
    $: table_t = ((tag_count > 0 && country_count > 0))

    $: console.log("count:", tag_count, country_count, table_t)

    const table_type = () => {
        // console.log("this thing is: ", (!(tag_count == 0 && country_count == 0)) && (tag_count == 0 || country_count == 0))
        return (tag_count == 0 || country_count == 0)
    }

    
</script>

<!-- <Sorting {active_filters} {data} {refresh}/> -->


<SearchBar bind:search_items={tag_list} />

<TagContainer bind:tag_list={tag_list} />

{#if ((tag_count != 0 || country_count != 0) && (tag_count == 0 || country_count == 0))}
    <ReportTable bind:tag_list={tag_list} table_data={data.data} countries_raw={data.countries}/>
{/if}

{#if tag_count != 0 && country_count != 0}
    <DataTable bind:active_tags={tag_list} countries={data.countries} bind:table_type={table_t}/>
{/if}

    <!-- {/if} --
<!-- <table>
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
        {#if active _filters.countries.has(c) || active_filters.regions.has(data.countries[c].region) || active_filters.subregions.has(data.countries[c].subregion)}
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
</table> -->

<style>

    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }

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