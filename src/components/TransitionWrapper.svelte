<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let show = false;
  onMount(() => (show = true));
</script>

<style>
  div {
    position: relative;
  }
</style>

{#if show}
  <div in:fade>
    <slot />
  </div>
{/if}
