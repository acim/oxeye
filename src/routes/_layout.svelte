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
    --color-primary: #ffae57;
    --color-lightGrey: #242b38;
    --color-grey: #738699;
    --color-darkGrey: #d9d7ce;
    --color-error: red;
    --color-success: blue;
    --grid-maxWidth: 120rem;
    --grid-gutter: 2rem;
    --font-size: 1.6rem;
    --font-family: "Helvetica Neue", sans-serif;
    --background: #1a1f28;
  }
  /* https://github.com/sveggiani/vscode-field-lights/blob/master/themes/Field%20Lights-color-theme.json */

  :global(body) {
    background-color: var(--background);
    color: var(--color-darkGrey);
  }

  :global(input) {
    background-color: var(--color-lightGrey);
    color: var(--color-darkGrey);
  }

  :global(::placeholder) {
    color: var(--color-darkGrey);
  }

  :global(.card) {
    background-color: var(--background);
    text-align: center;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
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
