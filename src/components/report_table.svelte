<script>
  export let tag_list
  export let table_data

  let filters = {
    country: new Set(),
    tag: new Set(),
    region: new Set(),
    subregion: new Set(),
  }

  $: tag_list.forEach((a, i) => {
    if (i == 0) {
      filters = {
        country: new Set(),
        tag: new Set(),
        region: new Set(),
        subregion: new Set(),
      }
    }
    if (a.active) {
      filters[a.type].add(a.name)
    }

    if (i == tag_list.length - 1) {
      table_data = table_data
    }
  })

  // $: filters = filters;
  // $: console.log(filters, tag_list)

  const out_list = (set) => {
    let string = ''
    set.forEach((a, i) => {
      string += a + ', '
    })

    string = string.substr(0, string.length - 2)

    let index = string.lastIndexOf(', ')
    if (index == -1) {
      return string
    } else {
      return string.substring(0, index) + ' and ' + string.substring(index + 1)
    }
  }

  const is_Active = (t) => {
    if (
      !Array.from(filters.country).every((a) => {
        return t.countries.has(a)
      })
    )
      return false

    if (
      !Array.from(filters.tag).every((a) => {
        return t.tags.has(a)
      })
    )
      return false

    if (
      !Array.from(filters.region).every((a) => {
        return t.regions.has(a)
      })
    )
      return false

    return true
  }

  $: data = table_data.filter((a) => {
    return is_Active(a)
  })
</script>

<div class="container">
  {#if data.length == 0}
    <div class="waring">no reports to show</div>
  {:else}
    <div class="heading">
      Reports
      {#if filters.tag.size > 0} on {out_list(filters.tag)}{/if}

      {#if filters.country.size > 0} in {out_list(filters.country)}{/if}

      <!-- {#if} -->
    </div>

    <table>
      <thead>
        <th>report</th>
        <th>description</th>
        <th>publisher</th>
        <td>period covered</td>
        <td>tags</td>
      </thead>

      <tbody>
        {#each data as t}
          {#if is_Active(t)}
            <tr>
              <td><a href={t.link} target="_blank">{t.report}</a></td>
              <td>{t.blurb}</td>
              <td>{t.publisher}</td>
              <td>{t.period_covered}</td>
              <td>
                {#each Array.from(t.tags) as tag}
                  <span
                    class="tag"
                    class:has_tag={filters.tag.has(tag)}
                    class:no_tag={!filters.tag.has(tag)}
                  >
                    {tag}
                  </span>
                {/each}
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .heading {
    text-align: center;
    font-weight: 500;
    font-size: 1.5rem;
    /* width: fit-content; */
    /* border: 1px solid blue; */
  }
  .container {
    margin: 20px auto;
  }
  td,
  th {
    border: 1px solid lightgray;
  }

  td {
    padding: 10px;
  }

  table {
    margin: 10px auto;
  }
</style>
