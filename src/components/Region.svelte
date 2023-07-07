<script>

    export let data;
    export let tags;
    export let filter_function;
    export let region;

    console.log("Region data is: ", data)

    // let region = Object.keys(data)[0];
</script>
<style>
    .heading-row {
        text-align: center;
        border: 1px solid;
    }

    th, td {
        word-wrap: break-word;
        border: 1px solid lightgray  
    }

    .block {
        border: 1px solid;
    }

    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        background-color: #eee;
    }

    .has_tag {
        background-color: #7B9E89;
    }

    .no_tag {
        background-color: #EF6461;
    }

    .tag-clickable {
        cursor: pointer;
    }

    .tag-clickable:hover {
        opacity: 0.5;
    }

</style>
<tr>
    <td></td>
    <td class='clickable heading-row' colspan="{Object.keys(tags).length}" 
    on:click={
        () => {
            filter_function([], [], [region])
        }
    }>
    {#if region == 'north'}
        North Africa
    {:else if region == 'south'}
        Southern Africa
    {:else if region == 'west'}
        West Africa
    {:else if region == 'east'}
        East Africa
    {:else if region == 'central'}
        Central Africa
    {/if}
    </td>
</tr>


{#each data as c}
<tr>
    <td 
        class='clickable'
        on:click={
            () => {
                filter_function([], [c.country], [])
            }
        }   
    >
        {c.country}
    </td>

    {#each Object.keys(tags) as tag}
        <td 
            on:click={
                () => {
                    filter_function([tag], [c.country], [])
                }
            }
            class="block tag-clickable {(c.tags.has(tag)) ? "has_tag" : "no_tag"}"
        >
        </td>
    {/each}
</tr>
    <!-- <tr>
        <td class='clickable' on:click={() => {
            // url = filter_function([], [c.country]),
            // navigate()
        }}>{c.country}</td>
        {#each Object.keys(data.tags) as tag}
            <td on:click={() => {
                url = filter_function([tag], [c.country]),
                navigate()
            }} class="block tag-clickable {(data.tags[tag].has(c.country)) ? "has_tag" : "no_tag"}">

            </td>
        {/each}
    </tr> -->
{/each}