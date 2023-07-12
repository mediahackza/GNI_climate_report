<script>
    export let tag_list;
    export let table_data;

    let filters = {
        country: new Set(),
        tag: new Set(),
        region: new Set(),
    }

    $: tag_list.forEach(a => {
        if (a.active) {
            filters[a.type].add(a.name);
        }
    });

    $: console.log("filters:", filters);

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
    </thead>

    <tbody>
        {#each table_data as t}
        {#if is_Active(t)}
            <tr>
                <td>{t.report}</td>
            </tr>
        {/if}
        {/each}
    </tbody>
</table>