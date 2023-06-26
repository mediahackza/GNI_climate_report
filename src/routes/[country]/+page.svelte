<script>
    export let data

    console.log(data)
</script>

<table>

    <thead>

        <th>Report</th>

    </thead>
    <tbody>
        {#each data.data as d}
            {#if d[data.filter] == 'yes'}
                <tr>
                    <td><a href="{d.link}">{d.report}</a></td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>