<script>
  import Tag from '$components/Tag.svelte'

  export let tag_list
  const refresh = () => {
    console.log('refreshing')
    tag_list = tag_list
  }
</script>

<div class="container">
  {#each tag_list as tag}
    {#if tag.active == true}
      <Tag bind:tag {refresh}/>
    {/if}
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px;
  }
</style>
