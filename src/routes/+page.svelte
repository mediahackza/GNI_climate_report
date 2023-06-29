<script>
    import { goto } from '$app/navigation';

    export let data;
    console.log(data)
    console.log(data.tags);
    console.log(data.countries);
    let url = './';
    // const 

    const refine = (tags, countries) => {

        console.log(tags, tags.length , countries, countries.length)
        let url = './';

        if (countries.length > 0) {

            for (let i = 0; i < countries.length; i++) {
                url += countries[i] + ',';
            }
            url = url.substr(0, url.length - 1);
        }
        
        
        
        url += '&';

        if (tags.length > 0) {
            tags.forEach(element => {
                url += element + ',';
            });
            url = url.substr(0, url.length - 1);
        }

        console.log(url);
        return url;
    }

    const navigate = () => {
        console.log("navigating to: ", url);
        goto(url);
    }
</script>


<table>
    <thead>
        <th>
            country    
        </th>
        <!-- <th>region</th> -->

        {#each Object.keys(data.tags) as tag}
            <th class='clickable' on:click={() => {
                url = refine([tag], []),
                navigate()
            }}>{tag}</th>
        {/each}

    </thead>

    <tbody>
        <tr>
            <td></td>
            <td class="heading-row" colspan="{Object.keys(data.tags).length }">Central Africa</td>
        </tr>
        {#each data.countries.central as c}
            <tr>
                <td class='clickable' on:click={() => {
                    url = refine([], [c.country]),
                    navigate()
                }}>{c.country}</td>
                <!-- <td on:click={() => {

                }}>{c.region}</td> -->

                {#each Object.keys(data.tags) as tag}
                    <td on:click={() => {
                        url = refine([tag], [c.country]),
                        navigate()
                    }} class="block tag-clickable {(data.tags[tag].has(c.country)) ? "has_tag" : "no_tag"}">

                    </td>
                {/each}
            </tr>
        {/each}

        <tr>
            <td></td>
            <td class="heading-row" colspan="{Object.keys(data.tags).length }">North Africa</td>
        </tr>

        {#each data.countries.north as c}
            <tr>
                <td class='clickable' on:click={() => {
                    url = refine([], [c.country]),
                    navigate()
                }}>{c.country}</td>
                <!-- <td on:click={() => {

                }}>{c.region}</td> -->

                {#each Object.keys(data.tags) as tag}
                    <td on:click={() => {
                        url = refine([tag], [c.country]),
                        navigate()
                    }} class="block tag-clickable {(data.tags[tag].has(c.country)) ? "has_tag" : "no_tag"}">

                    </td>
                {/each}
            </tr>
        {/each}

        <tr>
            <td></td>
            <td class="heading-row" colspan="{Object.keys(data.tags).length }">Southern Africa</td>
        </tr>

        {#each data.countries.south as c}
            <tr>
                <td class='clickable' on:click={() => {
                    url = refine([], [c.country]),
                    navigate()
                }}>{c.country}</td>
                <!-- <td on:click={() => {

                }}>{c.region}</td> -->

                {#each Object.keys(data.tags) as tag}
                    <td on:click={() => {
                        url = refine([tag], [c.country]),
                        navigate()
                    }} class="block tag-clickable {(data.tags[tag].has(c.country)) ? "has_tag" : "no_tag"}">

                    </td>
                {/each}
            </tr>
        {/each}

        <tr>
            <td></td>
            <td class="heading-row" colspan="{Object.keys(data.tags).length }">East Africa</td>
        </tr>

        {#each data.countries.east as c}
            <tr>
                <td class='clickable' on:click={() => {
                    url = refine([], [c.country]),
                    navigate()
                }}>{c.country}</td>
                <!-- <td on:click={() => {

                }}>{c.region}</td> -->

                {#each Object.keys(data.tags) as tag}
                    <td on:click={() => {
                        url = refine([tag], [c.country]),
                        navigate()
                    }} class="block tag-clickable {(data.tags[tag].has(c.country)) ? "has_tag" : "no_tag"}">

                    </td>
                {/each}
            </tr>
        {/each}

        <tr>
            <td></td>
            <td class="heading-row" colspan="{Object.keys(data.tags).length }">West Africa</td>
        </tr>

        {#each data.countries.west as c}
            <tr>
                <td class='clickable' on:click={() => {
                    url = refine([], [c.country]),
                    navigate()
                }}>{c.country}</td>
                <!-- <td on:click={() => {

                }}>{c.region}</td> -->

                {#each Object.keys(data.tags) as tag}
                    <td on:click={() => {
                        url = refine([tag], [c.country]),
                        navigate()
                    }} class="block tag-clickable {(data.tags[tag].has(c.country)) ? "has_tag" : "no_tag"}">

                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>

    table {
        width: 100%;
        margin: auto;
        /* table-layout: fixed; */
        border: 1 px solid;
        table-layout: fixed;
    }

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

    .has_tag {
        background-color: #7B9E89;
    }

    .no_tag {
        background-color: #EF6461;
    }

    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        background-color: #eee;
    }

    .tag-clickable {
        cursor: pointer;
    }

    .tag-clickable:hover {
        opacity: 0.5;
    }
</style>
<!-- 
<table>
    <thead>
        <th></th>
        <th></th>

        {#each data.tags as tag}
            <th ><a href="./[-]{tag.tag}">{tag.tag}</a></th>
        {/each}
    </thead>    
    <tbody>
        {#each data.countries as c}
            <tr>
                <td class="country_col"><a href="./{c.country}[-]">{c.country}</a></td>
                <td ></td>
                {#each data.tags as tag}
                    <td class="block {(get_value(tag, c))}"><a href="./{c.country}[-]{tag.tag}" >test here</a></td>
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

</style> -->