<script lang="ts">
  import Nav from "../components/Nav.svelte"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"

  export let segment: string
  let visible = false

  onMount(() => (visible = true))
</script>

<style>
  main {
    position: relative;
  }
</style>

<Nav {segment} />

{#if visible || typeof window === 'undefined'}
  <main transition:fade>
    <slot />
  </main>
{/if}
