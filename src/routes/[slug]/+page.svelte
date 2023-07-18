<!-- <script>

    export let data;
    

    let filters = data.filters;
    let table_data = data.data

    let country_input;

    let countries = [];

    

    

    const remove_filter = (arr, item) => {
        arr.splice(arr.indexOf(item), 1);
        filters = filters;
        table_data = filter_data();
        
    }

    const add_filter = (arr, item) => {
        arr.push(item);
        filters = filters;
        table_data = filter_data();
        // country_input.value = '';
    }

    const is_subset = (arr, subset) => {
        if (subset[0] == '') return true;
        return !subset.some(v => {
            return !arr.has(v);
        })
    }

    const check = (el) => {
        if (is_subset(el.tags, filters.tag) && is_subset(el.countries, filters.country)) {
            return true;
        }
    }

    const filter_data = () => {
        let filtered = [];
        countries = [];

        Object.keys(data.countries).forEach(a => {
            if (filters.region.includes(a)) {
                countries = [...countries, ...data.countries[a]]
            }
            
        });

        countries = countries.sort((a,b) => {
            return a.country.localeCompare(b.country)
        })
        
        data.data.filter(a => { 
            if (is_subset(a.countries, filters.country) && is_subset(a.tags, filters.tag) && is_subset(a.regions, filters.region)) {

                filtered.push(a);
            }
        })

        
        return filtered;
    }

    const set_to_string = (set) => {
        let str = '';
        set.forEach(a => {
            str += a + ', ';
        })
        return str.substr(0, str.length - 2);
    }

    table_data = filter_data();

    

</script> -->
<!-- 
<style>

    :global(body) {
        font-family: 'Roboto', sans-serif;
    }
    .active {
        background-color: #7B9E89;
        color: white
    }

    table {
        width: 90%;
        margin: 20px auto;
    }

    thead {
        background-color: #7B9E89;
        color: white;
        font-size: 1.5rem;
    }

    td {
        padding: 5px 10px;
        border: 1px solid gray
    }

    .tag-col {
        text-align: center;
    }

    .in-active {
        background-color: #eee;
    }
    .tag {
        display: inline-block;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .tag-container {
        align-items: center;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
    }

    .region-container {
        justify-content: center;
        text-align: center;
        padding: 10px;
        border-bottom: 1px solid gray;
        margin: 10px;
    }

    .heading {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .country-input {
        display: block;
        /* border: 1px solid red; */
        margin: auto;
        padding: 5px 10px;
    }

    .placeholder {
        color: gray;
        padding: 10px;
    }

    
</style>
    <div class='heading'>
        showing data for {set_to_string(filters.tag)} in {set_to_string(filters.country)}
    </div>

    <table>
        <thead>
            <th>report</th>
            <th>tags</th>
        </thead>

        <tbody>
            {#each data.data as d}
            {#if check(d)}
                <tr>
                    <td><a href="{d.link}" tagret="_blank">{d.report}</a></td>
                    <td class="tag-col">{set_to_string(d.tags)}</td>
                    <!-- <td>{}</td -->
<!-- <td>{d.countries}</td> -->

<!-- </tr>
                {/if}
            {/each}
        </tbody>
    </table> -->

<script>
  import Tag from '$components/Tag.svelte'
  import ReportTable from '$components/report_table.svelte'
  import { Tag_con } from '$helpers/tags.js'

  export let data

 

  let tag_list = data.tags.map((a) => {
    
    let t = new Tag_con(a.type, a.name)
    // console.log(data.filters[a.type].includes(a.name))
    if (data.filters[a.type].includes(a.name)) {
      t.set_active(true)
    }
    return t
  })

  console.log(data)
</script>

<ReportTable bind:tag_list table_data={data.data} />
