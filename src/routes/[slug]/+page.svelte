<script>
    import Country from '$components/Country.svelte';
    import Sorting from '$components/Sorting_system.svelte'
    export let data 

    console.log("data:", data)

    const refresh = () => {
        data = data
    }

    const is_subset = (arr, subset) => {
        if (subset[0] == '') return false;
        console.log("arr:", arr)
        console.log("subset:", subset)
        console.log(Array.from(subset).every(v => {
            return arr.has(v)
        }))
        return Array.from(subset).every(v => {
            return arr.has(v)
        })
    }
</script>

<Sorting active_filters={data.active_filters} data={data} refresh={refresh}/>

<table>
    <thead>

        <th>Report</th>
    </thead>

    <tbody>
        {#each data.data as report}
            <tr>
            {#if is_subset(report.tags, data.active_filters.tags) && is_subset(report.countries, data.active_filters.countries) }
                <td>
                    <a href='{report.link}' target='_blank'>{report.report}</a>
                </td>
                {/if}
            </tr>
        {/each}
    </tbody>

</table>

