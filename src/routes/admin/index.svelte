<script context="module">
  export async function preload(page, session) {
    if (!session || !session.user) {
      this.redirect(302, "login");
      return;
    }

    const res = await this.fetch("admin/config.json", {
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
  export let data;
</script>

{#if data}
  Your username is: {data.username}
  <hr />
{/if}
This is fetching resource /admin/config. Try to logout and to reach this
resource by typing the url in your browser.
