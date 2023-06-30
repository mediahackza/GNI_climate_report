<script>

    export let data;

    console.log(data);

    let filters = data.filters;
    console.log("filters: ", filters)
    let table_data = data.data

    let country_input;

    let countries = [];

    

    countries = countries.sort((a,b) => {
        return a.country.localeCompare(b.country)
    })

    const remove_filter = (arr, item) => {
        arr.splice(arr.indexOf(item), 1);
        filters = filters;
        table_data = filter_data();
        
    }

    const add_filter = (arr, item) => {
        console.log("adding a filter")
        arr.push(item);
        filters = filters;
        table_data = filter_data();
        // country_input.value = '';
    }

    const is_subset = (arr, subset) => {
        if (subset[0] == '') return true;
        console.log("comparing: ", arr, subset)
        return !subset.some(v => {
            return !arr.has(v);
        })
    }

    const filter_data = () => {
        let filtered = [];
        countries = [];

        Object.keys(data.countries).forEach(a => {
            console.log("checking region:", a)
            if (filters.region.includes(a)) {
                console.log("adding countries from region: ", a)
                countries = [...countries, ...data.countries[a]]
            }
            
        });

        console.log("countries: ", countries)
        
        data.data.filter(a => { 
            // console.log("country value:", a.countries)
            // console.log(is_subset(a.countries, filters.country))
            if (is_subset(a.countries, filters.country) && is_subset(a.tags, filters.tag) && is_subset(a.regions, filters.region)) {
                console.log("this one counts")
                filtered.push(a);
            }
        })

        return filtered;
    }

    const set_to_string = (set) => {
        let str = '';
        set.forEach(a => {
            str += a + ', ';
        })
        return str.substr(0, str.length - 2);
    }

    table_data = filter_data();

</script>

<style>
    .active {
        background-color: #7B9E89;
        color: white
    }

    .in-active {
        background-color: #eee;
    }
    .tag {
        display: inline-block;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .tag-container {
        align-items: center;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
    }

    
</style>

<div class="tag-container">
    <!-- {#each filters.region as t}
        <div on:click={remove_filter(filters.region, t)} class='tag active'>{t}</div>
    {/each} -->

    {#each Object.keys(data.countries) as region}
        {#if filters.region.indexOf(region) == -1}
            <div on:click={add_filter(filters.region, region)} class='tag in-active'>{region}</div>
        {:else}
        <div on:click={remove_filter(filters.region, region)} class='tag active'>{region}</div>
        {/if}
    {/each}

</div>

<div class='tag-container'>
    {#each filters.country as c}
    <div on:click={remove_filter(filters.country, c)} class='tag'>{c}</div>
    {/each}
</div>
<input bin:this={country_input} list="countries" placeholder="add a country" on:change={add_filter(data.filters.country, this.value)}>
<datalist id="countries"  >
    <option value=''>add a country</option>
    {#each countries as country}
    {#if filters.country.indexOf(country) == -1}
        <option value={country.country}>{country.country}</option>
    {/if}
    {/each}
</datalist>

<div class="tag-container">
    {#each filters.tag as t}
        <div on:click={remove_filter(filters.tag, t)} class='tag active'>{t}</div>
    {/each}

    {#each Object.keys(data.tags) as tag}
        {#if filters.tag.indexOf(tag) == -1}
            <div on:click={add_filter(filters.tag, tag)} class='tag in-active'>{tag}</div>
        {/if}
    {/each}

</div>


<table>
    <thead>
        <th>report</th>
        <th>tags</th>
    </thead>

    <tbody>
        {#each table_data as d}
            <tr>
                <td><a href="{d.link}" tagret="_blank">{d.report}</a></td>
                <td>{set_to_string(d.tags)}</td>
                <!-- <td>{}</td -->
                <!-- <td>{d.countries}</td> -->

            </tr>
        {/each}
    </tbody>
</table>