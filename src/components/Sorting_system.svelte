<script>
    export let active_filters;
    export let data;
    export let refresh;

    let regions = ['central', 'east', 'north', 'south', 'west'];
    let subregions = ['ssa','na'];

    const get_long = (subregion) => {
        switch (subregion) {
            case 'ssa':
                return 'Sub-Saharan Africa';
            case 'na':
                return 'Northern Africa';  
            default:
                return subregion;
        }
    }

    const add_filter = (filter_set, filter) => {
        if (filter == '') {
            return;
        }
        filter_set.add(filter);
        refresh();
    }

    const remove_filter = (filter_set, filter) => {
        filter_set.delete(filter);
        refresh();
    }
</script>
<div class='container inactive' >
    {#each regions as region}
        
        {#if active_filters.regions.has(region)}
        <div   
            class="tag active"
            on:click = {
                (event) => {
                    remove_filter(active_filters.regions, region)
                }
            }>{region}</div>
        {:else}
        <div
            class=" tag in-active"
            on:click = {
                (event) => {
                    add_filter(active_filters.regions, region)
                }
            }>{region}</div>
        {/if}
        
    {/each}

    
</div>

<div class='container inactive' >
    {#each subregions as subregion}
        
        {#if active_filters.subregions.has(subregion)}
        <div   
            class="tag active"
            on:click = {
                (event) => {
                    remove_filter(active_filters.subregions, subregion)
                }
            }>{get_long(subregion)}</div>
        {:else}
        <div
            class=" tag in-active"
            on:click = {
                (event) => {
                    add_filter(active_filters.subregions, subregion)
                }
            }>{get_long(subregion)}</div>
        {/if}
        
    {/each}
</div>

<div class="block container inactive">
    <div class='heading'>tags</div>
    <div class='container'>
        {#each Array.from(active_filters.tags) as tag}
            <div   
                class="tag active"
                on:click = {
                    (event) => {
                        remove_filter(active_filters.tags, tag)
                    }
                }>{tag}</div>
        {/each}

        {#if active_filters.tags.size == 0}
            <div class='placeholder'>No tags selected</div>
        {/if}
    </div>

    <input list="tags" on:change={
            (event) => {
                add_filter(active_filters.tags, event.target.value)
            }  
        }
    />
    <datalist id="tags">
        {#each Array.from(data.tags) as tag}
            <option value={tag}></option>
        {/each}
    </datalist>

    
</div>


<div class='block container inactive'>
    <div class='heading'>Countries</div>

    <div class='container'>
        {#each Array.from(active_filters.countries) as country}
            <div   
                class="tag active"
                on:click = {
                    (event) => {
                        remove_filter(active_filters.countries, country)
                    }
                }>{country}</div>
        {/each}

        {#if active_filters.countries.size == 0}
            <div class='placeholder'>No countries selected</div>
        {/if}
    </div>
<input list="countries" on:change={
    (event) => {
        add_filter(active_filters.countries, event.target.value)
    }
}>
<datalist id="countries">
    {#each Object.keys(data.countries) as c}
        <option value={c}></option>
    {/each}
</datalist>

</div>

<style>

    .inactive {
        display: none !important;
    }
    .container {
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .placeholder {
        width: fit-content;
        margin: auto;
        color: gray;
    }   

    .block {
        display: block;
    }

    input {
        margin: auto;
        display: block;
    }

    .heading {
        width: fit-content;
        margin: auto;
    }

    .tag {
        margin: 10px;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .active {
        background-color: #7B9E89;
    }

    .in-active {
        background-color: #eee
    }
</style>