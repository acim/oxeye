<script context="module">
  export async function preload(page, session) {
    try {
      const response = await this.fetch(
        `//${page.host}/auth/activate.json?token=${page.query.token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        return { data: response.error };
      }

      const decode = await response.json();
      if (decode.error) {
        return { data: decode.error };
      }

      return { data: decode };
    } catch (err) {
      return { data: err.message };
    }
  }
</script>

<script>
  export let data;
</script>

{JSON.stringify(data)}
