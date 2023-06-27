<script>
    export let data;
         const get_value = (tag, country) => {
            if (country[tag.tag] == null) {
                return "unset_tag";
            }
            if (country[tag.tag]) {
                return "has_tag";
            } else {
                return "no_tag"
            }

        }

        let link = "./"

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
                <td class="country_col"><a href="./{c.country}-">{c.country}</a></td>
                {#each data.tags as tag}
                    <td class="block {(get_value(tag, c))}"></td>   
                {/each}
            </tr>
        {/each}
    </tbody>

</table>

<style>

:global(body) {
        font-family: 'Roboto', sans-serif;
    }

    table {
        width: 90%;
        margin: auto;
        /* table-layout: fixed; */
    }

.has_tag {
    background-color: #7B9E89;
}

.unset_tag {
    background-color: #eee
}

.no_tag {
    background-color: #EF6461;
}

.country_col {
    /* width: 500px; */
    border: 1px solid black
}

/* .block {
    width: 
} */

</style>