<script>
    export let data;
    console.log(data);

        // const check_tag = (c, tag) => {
        //     console.log(c, tag)
             
        // }

        const get_value = (tag, country) => {
            console.log(tag.tag, country[tag.tag]);
            if (country[tag.tag] == null) {
                return "unset_tag";
            }
            if (country[tag.tag]) {
                return "has_tag";
            } else {
                return "no_tag"
            }

        }

</script>

<table>
    <thead>
        <th></th>

        {#each data.tags as tag}
            <th >{tag.tag}</th>
        {/each}
    </thead>    
    <tbody>
        {#each data.countries as c}
            <tr>
                <td><a href="./{c.country}">{c.country}</a></td>
                {#each data.tags as tag}
                    <td class="block {(get_value(tag, c))}"></td>   
                {/each}
            </tr>
        {/each}
    </tbody>

</table>

<style>

    table {
        width: 90%;
        margin: auto;
        table-layout: fixed;
    }

.has_tag {
    background-color: #7B9E89;
}

.unset_tag {
    background-color: #F0A202
}

.no_tag {
    background-color: #EF6461;
}

/* .block {
    width: 
} */

</style>