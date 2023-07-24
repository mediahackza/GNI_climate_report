<script>
  import Map from '$components/Map.svelte'
  import { goto } from '$app/navigation'
  import Sorting from '$components/Sorting_system.svelte'
  import Tag from '$components/Tag.svelte'
  import TagContainer from '$components/Tag_container.svelte'
  import SearchBar from '$components/Search_container.svelte'
  import DataTable from '$components/data_Table.svelte'
  import ReportTable from '$components/report_table.svelte'
  import SearchContainer from '$components/Search_container.svelte'
  import { Tag_con } from '$helpers/tags.js'
  export let data
  
  let subjectTags = data.tags.filter((t) => t.type == 'tag')

  let region_index = {}
  let tag_list = data.tags.map((t, i) => {
    if (t.type == 'region' || t.type == 'subregion') {
      region_index[t.name] = i
    }
    return new Tag_con(t.type, t.name)
  })

  tag_list.forEach((t) => {
    if (t.type == 'country') {
      let sb_region

      switch (data.countries[t.name].subregion) {
        case 'ssa':
          sb_region = 'Sub-Saharan Africa'
          break
        case 'na':
          sb_region = 'Northern Africa'
          break
        default:
          sb_region = data.countries[t.name].subregion
      }

      if (region_index.hasOwnProperty(sb_region)) {
        tag_list[region_index[sb_region]].addChild(t)
      }

      tag_list[region_index[data.countries[t.name].region]].addChild(t)
    }
    // if (t.type == 'country') {
    //     tag_list[data.countries[t.name].region].addChild(t);
    // }
  })

  let tag_count = 0
  let country_count = 0

  $: tag_list = tag_list.map((t, i) => {
    if (i == 0) {
      tag_count = 0
      country_count = 0
    }
    if (t.active) {
      switch (t.type) {
        case 'tag':
          tag_count++
          break
        case 'country':
          country_count++
          break
      }
    }

    return t
  })

  let table_t = false
  $: table_t = tag_count > 0 && country_count > 0

  const table_type = () => {
    return tag_count == 0 || country_count == 0
  }

  const refresh = () => {
    tag_list = tag_list;
    console.log("Refreshed")
  }

</script>

<div class="dashboard">
  <div class="panel panel-left">
    <div class="panel-inner">
      <div class="panel-title">African Data Reporter</div>
      The Africa Climate Data Explorer records climate-related research and reports.
      The database is searchable by country, topic, and type of data.

      <div class="panel-subtitle">Select a Topic</div>
      <div class="panel-tags">
        {#each tag_list
          .filter((f) => f.type === 'tag')
          .sort((a, b) => (a.name > b.name ? 1 : -1)) as t}
          <div
            on:click={() => {
              t.set_active(true)
              tag_list = tag_list
            }}
            class="tag"
          >
            {t.name}
          </div>
        {/each}
      </div>
      <div class="panel-subtitle">
        Select a Country
        <span class="panel-subtitle-sub">(optional)</span>
        <Map countries={data.countries} bind:tags={tag_list}/>
      </div>
    </div>
  </div>
  <div class="panel panel-right">
    <SearchBar bind:search_items={tag_list} {refresh}/>

    <TagContainer bind:tag_list />

    {#if tag_count != 0 && country_count != 0}
      <DataTable bind:active_tags={tag_list} countries={data.countries}  />
    {/if}

    {#if tag_count != 0 || country_count != 0}
      <ReportTable bind:tag_list table_data={data.data} warning={true} />
    {/if}
  </div>
</div>

<!-- <SearchBar bind:search_items={tag_list} />

<TagContainer bind:tag_list />
{#if tag_count != 0 && country_count != 0}
  <DataTable bind:active_tags={tag_list} countries={data.countries} />
{/if}

{#if tag_count != 0 || country_count != 0}
  <ReportTable bind:tag_list table_data={data.data} />
{/if} -->

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  td,
  th {
    border: 1px solid black;
  }

  .clickable {
    cursor: pointer;
    background-color: #eee;
  }

  .clickable:hover {
    opacity: 0.5;
  }

  .dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 20px;
    width: 100%;
    height: 100vh;
  }
  .panel {
    font-size: 0.9rem;
    color: rgb(109, 109, 109);
    line-height: 1.3;
  }
  .panel-inner {
    padding: 20px;
  }

  .panel-left {
    background: #eee;
  }
  .panel-title {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #000;
  }
  .panel-tags * {
    display: inline-block;
  }
  .panel-subtitle {
    margin-top: 20px;
    padding: 10px 0px;
    /* border: solid 1px lightgray; */
    color: #000;
    text-transform: uppercase;
    font-weight: 700;
  }
</style>
