<script>
  import Nav from "../components/Nav.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let segment;
  let visible = false;

  onMount(() => (visible = true));
</script>

<style>
  :global(:root) {
    --color-primary: purple;
    --color-lightGrey: red;
    --color-grey: darkgray;
    --color-darkGrey: green;
    --color-error: red;
    --color-success: #28bd14;
    --grid-maxWidth: 120rem;
    --grid-gutter: 2rem;
    --font-size: 1.6rem;
    --font-family: "Helvetica Neue", sans-serif;
  }

  :global(body) {
    background-color: #1c2022;
    color: gray;
  }

  :global(input) {
    background-color: gray;
  }

  :global(::placeholder) {
    color: black;
  }

  main {
    position: relative;
  }
</style>

<Nav {segment} />

{#if visible || !process.browser}
  <main transition:fade>
    <slot />
  </main>
{/if}
