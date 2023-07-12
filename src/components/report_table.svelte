<script>
    export let tag_list;
    export let table_data;

    let filters = {
        country: new Set(),
        tag: new Set(),
        region: new Set(),
        subregion: new Set()
    }

    $: tag_list.forEach((a, i) => {
        if (i ==0 ) {
            filters = {
                country: new Set(),
                tag: new Set(),
                region: new Set(),
                subregion: new Set()
            }
        }
        if (a.active) {
            filters[a.type].add(a.name);
        }

        if(i == tag_list.length - 1) {
            table_data = table_data;
        }
    });

    // $: filters = filters;
    $: console.log(filters, tag_list);


    const is_Active = (t) => {
        if (!Array.from(filters.country).every(a => {
            return t.countries.has(a)
        })) return false;

        if (!Array.from(filters.tag).every(a => {
            return t.tags.has(a);
        })) return false;

        if (!Array.from(filters.region).every(a => {
            return t.regions.has(a);
        })) return false;

        return true;
    }
</script>

<table>
    <thead>
        <th>report</th>
        <td>tags</td>
    </thead>

    <tbody>
        {#each table_data as t}
        {#if is_Active(t)}
            <tr>
                <td><a href='{t.link}' target="_blank">{t.report}</a></td>
                <td>
                {#each Array.from(t.tags) as tag}
                    <span class:has_tag={filters.tag.has(tag)} class:no_tag={!filters.tag.has(tag)}>{tag}</span>
                {/each}
            </td>
            </tr>
        {/if}
        {/each}
    </tbody>
</table>
<style>

    td, th {
        border: 1px solid
    }

    td {
        padding: 10px;
    }
    span {
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
    }
    .has_tag {
        background-color: dodgerblue;
    }

    .no_tag {
        background-color: #eee;
    }
</style>