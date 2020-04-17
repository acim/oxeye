<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let show = false;
  onMount(() => (show = true));
</script>

<style>
  div {
    position: relative;
  }
</style>

{#if show}
  <div in:fly={{ x: -300, duration: 600 }}>
    <slot />
  </div>
{/if}
