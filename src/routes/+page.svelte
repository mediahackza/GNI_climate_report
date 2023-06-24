<script>

    export let data;
    console.log(data);

    let tags = data.tags;
    let d = data.data;
    let countries = data.countries;

    const check_country = (item) => {
        let ret_value = false;
        countries.forEach(a => {
            console.log(a, item[`${a.country}`]);
                if (a.active && item[`${a.country}`] == 'yes') ret_value = true;
        })
        
        return ret_value;
    }

    const check_tags = (item) => {
        let temp = item.replaceAll(" ", "");
        temp = temp.split(",");
        let ret_value = false;
        temp.forEach(t => {
            if (tags.find(tag => {
                let find_value = tag.tag.replaceAll(" ", "");
                return find_value == t && tag.active
            }))
               ret_value = true;
        })

        return ret_value;
    }

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

</script>
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
        <div class="tag {tag.active ? 'active': 'inactive'}" on:click={() => {tag.active = !tag.active; d = d}}>
                {tag.tag}
        </div>
    {/each}

    {#if !arr_all(tags, true)}
    <div class="tag inactive" on:click={() => {tags = to_all(tags, true); d = d}}>
    show all
    </div>
    {/if}

    {#if !arr_all(tags, false)}
    <div class="tag inactive" on:click={() => {tags = to_all(tags, false); d = d}}>
        clear
    </div> 
    {/if}
</div>

<table>
    <thead>
        <tr>
            <th>Report</th>
            <!-- <th>Tags</th> -->

            <!-- {#each countries as c}
            {#if c.active}
                <th>{c.country}</th>
            {/if}
            {/each} -->
        </tr>
    </thead>
    <tbody>
        {#each d as item}

            <tr class='{(check_country(item) && check_tags(item.tags)) ? '' : 'hidden'}'>
                <td><a href="{item.link}" tagret="_blank">{item.report}</a></td>
                <!-- <td>{item.tags}</td> -->

                <!-- {#each countries as c}
                    <td>{item[`${c.country}`]}</td>
                {/each} -->
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
</style>