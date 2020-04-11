<script context="module">
  export async function preload(page, { user }) {
    if (!user) {
      this.redirect(302, "login");
    }
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  const { session } = stores();

  // onMount(() => {
  //   if (!$user) {
  //     goto("login");
  //   }
  // });

  async function fetchData() {
    const res = await fetch("admin/config", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.user.token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    throw new Error(data);
  }
</script>

<!-- {#if process.browser} -->
{#await fetchData() then data}Your username is: {data.username}{/await}
<hr />
This is fetching resource /admin/config. Try to logout and to reach this
resource by typing the url in your browser.
<!-- {/if} -->
