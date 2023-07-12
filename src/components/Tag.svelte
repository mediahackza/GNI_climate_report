<script>
    export let tag;
</script>


<div class="container {tag.active ? '' : 'inactive' } {tag.type}">
    <!-- <div class="type">
        {tag.type.toUpperCase()}
    </div> -->

    <div class="data">
        {tag.name}
    </div>

    <svg on:click= {
        () => {
            tag.set_active(false);
            tag = tag
        }
    } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" delete-icon lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
</div>

<style>

    .country {
        background-color: dodgerblue;
        color: white; 
    }

    .tag {
        background-color: dodgerblue;
        color: white;
    }
    .region {
        background-color: dodgerblue;
        color: white;
    }
    .subregion {
        background-color: dodgerblue;
        color: white;
    }
    .inactive {
        display: none;
    }

    .container {
        position: relative;
        width: fit-content;
        /* padding: 10px  20px; */
        padding: 2px 5px;
        border-radius: 5px;
        margin: 5px;
    }

    .container:hover .delete-icon {
        position: absolute;
        top: -12px;
        right: -12px;
        cursor: pointer;
        display: inline-block;
    }
    

    .delete-icon {
        display: none;
        color: black
    }

    .type {
        font-weight: 700;
        font-size: 0.8rem;
        text-align: left;
    }
    
    .data {
        font-size: 1.2rem;
        text-align: center;
    }

</style>