<script>
  import Nav from "../components/Nav.svelte";
  import "chota";

  export let segment;
</script>

<style>
  :global(:root) {
    --color-primary: blue;
    --color-lightGrey: #d2d6dd;
    --color-grey: #747681;
    --color-darkGrey: green;
    --color-error: #d43939;
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
</style>

<Nav {segment} />

<main>
  <slot />
</main>
