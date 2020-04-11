<script context="module">
  export async function preload(page, session) {
    if (!session || !session.user) {
      this.redirect(302, "login");
      return;
    }

    const res = await this.fetch("admin/config", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      const data = await res.json();
      return { data };
    }
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  export let data;

  const { session } = stores();

  // onMount(() => {
  //   if (!$user) {
  //     goto("login");
  //   }
  // });

  // async function fetchData() {
  //   try {
  //     const res = await fetch("admin/config", {
  //       headers: {
  //         "Content-Type": "application/json"
  //         // Authorization: `Bearer ${session.user.token}`
  //       }
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       return data;
  //     }
  //     throw new Error(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
</script>

{#if data}
  Your username is: {data.username}
  <hr />
{/if}
This is fetching resource /admin/config. Try to logout and to reach this
resource by typing the url in your browser.
