<script>

    export let data;

    console.log(data);

    let filters = data.tag_filters;
    let table_data = data.current_data;

    const remove_filter = (arr, item) => {
        arr.splice(arr.indexOf(item), 1);
        data.filters = data.filters;
        table_data = filter_data();
        
    }

    const add_filter = (arr, item) => {
        console.log("adding a filter")
        arr.push(item);
        data.filters = data.filters;
        table_data = filter_data();
    }

    const is_subset = (arr, subset) => {
        if (subset[0] == '') return true;

        return !subset.some(v => {
            return arr.indexOf(v) == -1;
        })
    }

    const filter_data = () => {
        let filtered = [];
        
        data.current_data.filter(a => { 
            if (is_subset(a.countries, data.filters.country) && is_subset(a.tags, data.filters.tag)) {
                filtered.push(a);
            }
        })

        return filtered;
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

<div class='tag-container'>
    {#each data.filters.country as c}
    <div on:click={remove_filter(data.filters.country, c)} class='tag'>{c}</div>
    {/each}
</div>
<input list="countries" placeholder="add a country" on:change={add_filter(data.filters.country, this.value)}>
<datalist id="countries"  >
    <option value=''>add a country</option>
    {#each Object.keys(data.countries) as country}
    {#if data.filters.country.indexOf(country) == -1}
        <option value={country}>{country}</option>
    {/if}
    {/each}
</datalist>

<div class="tag-container">
    {#each data.filters.tag as t}
        <div on:click={remove_filter(data.filters.tag, t)} class='tag active'>{t}</div>
    {/each}

    {#each Object.keys(data.tags) as tag}
    {#if data.filters.tag.indexOf(tag) == -1}
        <div on:click={add_filter(data.filters.tag, tag)} class='tag in-active'>{tag}</div>
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
                <td>{d.tags}</td>
                <!-- <td>{}</td -->
                <!-- <td>{d.countries}</td> -->

            </tr>
        {/each}
    </tbody>
</table>