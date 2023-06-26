<script>

    export let data;
    // console.log(data);

    let tags = data.tags;
    console.log(tags)
    let d = data.data;
    let countries = data.countries;

    let show_country_column = false;

    
    const check_country = (item) => {
        let ret_value = false;
        countries.forEach(a => {
                if (a.active && item[`${a.country}`] == 'yes') ret_value = true;
        })
        
        return ret_value;
    }

    const check_tag = (tag_name) => {
        let temp = tags.filter(a => a.tag.replaceAll(" ", '') == tag_name.replaceAll(" ", ''));
        console.log(temp[0]);

        if (temp.length == 0) return false;
        else return temp[0].active;
        // return temp[0].active;

    }

    const check_tags = (item) => {
        let temp = item.tags;
        let ret_value = false;
        let count = 0;
        temp.forEach(t => {
            if (tags.find(tag => {
                let find_value = tag.tag.replaceAll(" ", "");
                return find_value == t && tag.active
            })) {
                count++;
                ret_value = true;
            }
               
        })

        item.count = count;

        console.log(item);

        return ret_value;
    }

    d.forEach(a => {
        check_tags(a);
    })

    
    const to_all = (arr, bool) => {
        arr.forEach(a => a.active = bool);
        return arr;
    }

    const arr_all = (arr, bool) => {
        let ret_val = true;
        arr.forEach(a => {
            if (a.active != bool) {
                ret_val = false;
                return false;
            }

            return true;
        })
        return ret_val;
    }

    const resort = (d) => {
        return d.sort((a, b) => {
            return b.count - a.count;
        })
    }

    d = resort(d);


</script>

<input name="show_country_column" type="checkbox" id="show_country_column" bind:checked={show_country_column} on:change={() => {d = resort(d)}} value="show country column" />
<label for="show_country_column">show country column</label>
<div class="title">
    countries:
</div>



<div class="tag_filter">
    {#each countries as c}
        <div class="tag {c.active ? 'active': 'inactive'}" on:click={() => {c.active = !c.active; d = d}}>
                {c.country}
        </div>
    {/each}

    

    {#if !arr_all(countries, true)}
    <div class="tag inactive" on:click={() => {countries = to_all(countries, true); d = d}}>
        show all
    </div>
    {/if}

    {#if !arr_all(countries, false)}
    <div class="tag inactive" on:click={() => {countries = to_all(countries, false); d = d}}>
        clear
    </div> 
    {/if}
    
</div>

<div class='title'>
    tags:
</div>
<div class="tag_filter" >
    {#each tags as tag}
        <div class="tag {tag.active ? 'active': 'inactive'}" on:click={() => {tag.active = !tag.active; d = resort(d)}}>
                {tag.tag}
        </div>
    {/each}

    {#if !arr_all(tags, true)}
    <div class="tag inactive" on:click={() => {tags = to_all(tags, true); d = resort(d)}}>
    show all
    </div>
    {/if}

    {#if !arr_all(tags, false)}
    <div class="tag inactive" on:click={() => {tags = to_all(tags, false); d = resort(d)}}>
        clear
    </div> 
    {/if}
</div>

<table>
    <thead>
        <tr>
            <th>Report</th>
            <th>Tags</th>

            {#if show_country_column }
            {#each countries as c}
            {#if c.active}
                <th>{c.country}</th>
            {/if}
            {/each}

            {/if}
        </tr>
    </thead>
    <tbody>
        {#each d as item}

            <tr class='{(check_country(item) && check_tags(item)) ? '' : 'hidden'}'>
                <td><a href="{item.link}" tagret="_blank">{item.report}</a></td>
                <td style='padding: 10px; flex-wrap: wrap; display: flex'>
                {#each item.tags as tag} 
                    <div class=' mini-tag {(check_tag(tag)) ? 'mini-active' : 'mini-inactive'}'>{tag}</div>
                {/each}
                </td>

                {#if show_country_column}
                {#each countries as c}
                {#if c.active}
                    <td class="country-tag {(item[`${c.country}`] == 'yes') ? 'active-country': 'inactive-country' }">{item[`${c.country}`]}</td> 
                {/if}
                {/each}
                {/if}
            </tr>
            
        {/each}
    </tbody>   
</table>

<style>

    :global(body) {
        font-family: 'Roboto', sans-serif;
    }
    table {
        margin: 10px auto;
        padding: 0;
        border: 1px solid lightgray;
        
    }

    .title {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 10px;
        text-align: center;
    }

    th {
        background-color: #eee;
        font-size: 1.2rem;
        padding: 10px;
    }

    td {
        border-bottom: 1px solid #eee;
    }
    .tag {
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        
    }

    .tag_filter {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .inactive {
        background-color: #eee;
    }

    .active {
        background-color: dodgerblue;
        color: white;
    }

    .hidden {
        background-color: gray;
        display: none;
    }

    .country-tag {
        text-align: center;
    }

    .active-country {
        background-color: #B8DBD9;
    }

    .inactive-country {
        background-color: #eee;
    }

    .mini-tag {
        margin: 2px 5px;
        border-radius: 5px;
        padding: 2px;
        display: flex;
        background-color: #eee;
    }

    .mini-active {
        background-color: #C2E1FF;
        /* color: white; */
    }

    .mini-inactive {
        background-color: #eee
    }
</style>