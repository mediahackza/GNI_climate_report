<script>
    import { fade, fly } from 'svelte/transition';
    export let search_items;
    let table_type = false;
    let allow_show_all = true;

    let tags = [];
    let countries = [];

    let data = [];

    let search_filter = '';

    let tag_eg = false;
    let country_eg = false;

    let tag_count =0;
    let country_count = 0;

    let search_bar_x;
    let search_bar_y;


        $: search_items.forEach((t, i) => {
            if (i == 0 ) {
                tag_count =0;
                country_count = 0;
            }
            if (t.active) {
                switch (t.type) {
                    case 'tag':
                        tag_count++;
                        break;
                    case 'country':
                        country_count++;
                        break;
                }
            }
        })


    const filter_data = () => {
        if (allow_show_all && search_filter == null) {
            data = search_items.filter(item => {
                return item.active == false;
            })
        }
        data = search_items.filter(item => {
            return ((item.name.toUpperCase()).startsWith(search_filter.toUpperCase()) || item.name.toUpperCase().includes(search_filter.toUpperCase())) && item.active == false;
        });
        data = data.sort((a,b) => {
            return a.name.toUpperCase().indexOf(search_filter.toUpperCase()) - b.name.toUpperCase().indexOf(search_filter.toUpperCase());
        })
        // .sort(a => {
        //     a.
        // })
        // return data
    }

    filter_data();

    let groups = [
    ]

    const has_item = (arr, item, col_name) => {
        let return_value = false;
        arr.some(a =>{

            if (a[col_name] == item) {
                return_value = a;
                return true;
            }

            return false;
        })

        return return_value;
    }
    $: table_type = (tag_count != 0 || country_count != 0)
</script>


<div class="container {!table_type ? 'container-large' : ''} {search_filter != 0 ? 'container-small' : ''}">
    {#if tag_count == 0 && country_count == 0}
    <div class="details">
        type here to search reports by country, region or tag
    </div>
{/if}
    
    <div class="input-container" bind:offsetHeight={search_bar_y} bind:offsetWidth={search_bar_x}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" search-icon lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>

        <input type='text'    bind:value={search_filter} on:input={filter_data} placeholder='try Algeria or emissions ... '>
    </div>

<div   class='search-res {(search_filter == '') ? 'inactive' : 'active'}' >
    {#if data.length == 0}
        <div  class="item">
            <div class="name">No results found</div>
        </div>
    {:else}
    {#each data as item}
        <!-- {#if item.active == false && (item.name.toUpperCase()).includes(search_filter.toUpperCase())} -->
            <div  class='item' on:click={() => {
                item.set_active(true)
                search_items = search_items
                search_filter = ''
                
            }}>
                <div class="type">{item.type.toUpperCase()}</div>
                <div class="name">{item.name}</div>
            </div>
        <!-- {/if} -->
    {/each}
    {/if}
</div>

<!-- {#if !table_type}
<div class="paragraph">try searchig for a tag like <span class='tag-mini'>{tag_eg.name}</span> or a country such as <span class='tag-mini'>{country_eg.name}</span></div>
{/if} -->

</div>

<style>

    .details {
        text-align: center;
        margin: 20px 0px;
    }
    .search-res {
        /* border: 1px solid red; */
        width: 95%;
        margin: 0px 2.5%;
        overflow-y: scroll;
        max-height: 50vh;
        height: fit-content !important;
        /* display: block; */
        flex: 1;
        border: 1px solid lightgray;
        /* border: 1px solid black; */
    }
    
    .item {
        /* border: 1px solid blue; */
    }

    .search-icon  {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right: 25px;
        color: #999;
    }

    .paragraph {
        text-align: center;
        margin: 20px 0px;
    }

    .type {
        font-weight: 700;
        font-size: 0.85rem;
        margin: 5px 20px;
    }

    .name {
        font-weight: 300;
        font-size: 1.1rem;
        /* text-align: center; */
        margin: 10px 25px;
    }

    .inactive {
        display: none;
    }

    .active {
        display: inline-block;
    }

    input {
        width: 90%;
        margin: auto;
        display: block;
        padding: 10px 20px;
        font-size: 1.2rem;
    }

    .container {
        /* border: 1px solid red; */
        width: 60%;
        margin: auto;
        max-height: 95vh;
        padding: 10px 0px;
        overflow: hidden;

        flex-direction: column;
    }

    .container-large {
        height: 100vh;
        /* vertical-align: center; */
        /* align-items: center; */
        justify-content: center;
        margin: auto;
        display: flex;
    }

    .container-small {
        display: block !important;
    }

    .input-container {
        position: relative;
    }
</style>
