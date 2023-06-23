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
</div>

<table>
    <thead>
        <tr>
            <th>Report</th>
            <th>Tags</th>

            {#each countries as c}
                <th>{c.country}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each d as item}

            <tr class='{(check_country(item) && check_tags(item.tags)) ? '' : 'hidden'}'>
                <td><a href="{item.link}" tagret="_blank">{item.report}</a></td>
                <td>{item.tags}</td>

                {#each countries as c}
                    <td>{item[`${c.country}`]}</td>
                {/each}
            </tr>
            
        {/each}
    </tbody>   
</table>

<style>
    .tag {
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        
    }

    .tag_filter {
        display: flex;
        flex-wrap: wrap;
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
    }
</style>