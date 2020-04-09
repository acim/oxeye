<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { user } from "../_store.js";

  onMount(() => {
    if (!$user) {
      goto("login");
    }
  });

  async function fetchData() {
    loading = true;
    const res = await fetch("admin/config", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$user.token}`
      }
    });
    const data = await res.json();
    loading = false;

    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  let loading;
</script>

<button
  type="submit"
  class="button is-primary is-small"
  class:is-loading={loading}
  on:click={fetchData}>
  Get config
</button>

{#if process.browser}
  {#await fetchData() then data}Your username is: {data.username}{/await}
  <hr />
  This is fetching resource /admin/config. Try to logout and to reach this
  resource by typing the url in your browser.
{/if}
