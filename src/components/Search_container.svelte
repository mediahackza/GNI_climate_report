<script>

    export let search_items;
    let table_type = false;

    let tags = [];
    let countries = [];

    let data = [];

    let search_filter = '';

    let tag_eg = false;
    let country_eg = false;

    let tag_count =0;
        let country_count = 0;

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

    while(!tag_eg && country_eg) {
        let i = Math.floor(Math.random() * search_items.length);
        if (search_items[i].type == 'tag') {
            tag_eg = search_items[i];
        }

        if (search_items[i].type == 'country') {
            country_eg = search_items[i];
        }
    }

    const filter_data = () => {
        data = search_items.filter(item => {
            return (item.name.toUpperCase()).startsWith(search_filter.toUpperCase()) && item.active == false;
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


<div class="container {!table_type ? 'container-large' : ''}">
    <div class="input-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" search-icon lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>

        <input type='text'  bind:value={search_filter} on:input={filter_data}>
    </div>

<div class='search-res {(search_filter == '') ? 'inactive' : 'active'}' >
    {#each data as item}
        <!-- {#if item.active == false && (item.name.toUpperCase()).includes(search_filter.toUpperCase())} -->
            <div class='item' on:click={() => {
                item.set_active(true)
                search_items = search_items
                search_filter = ''
                
            }}>
                <div class="type">{item.type.toUpperCase()}</div>
                <div class="name">{item.name}</div>
            </div>
        <!-- {/if} -->
    {/each}
</div>

{#if !table_type}
<div class="paragraph">try searchig for a tag like <span class='tag-mini'>{tag_eg.name}</span> or a country such as <span class='tag-mini'>{country_eg.name}</span></div>
{/if}

</div>

<style>
    .search-res {
        border: 1px solid red;
        width: 90%;
        margin: auto;
        overflow-y: scroll;
        /* height: fit-content */
        max-height: 100%;
        flex: 1;
        
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
        display: block;
    }

    input {
        width: 90%;
        margin: auto;
        display: block;
        padding: 10px 20px;
        font-size: 1.2rem;
    }

    .container {
        border: 1px solid red;
        width: 60%;
        margin: auto;
        max-height: 50vh;
        padding: 10px 0px;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        
    }

    .container-large {
        height: 100vh;
        /* vertical-align: center; */
        /* align-items: center; */
        justify-content: center;
        margin: auto;
    }

    .input-container {
        position: relative;
    }
</style>
