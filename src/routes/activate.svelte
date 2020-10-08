<script context="module" lang="ts">
  export async function preload(page, session) {
    try {
      const response = await this.fetch(
        `${process.env.SAPPER_APP_BASE_URL}/auth/activate.json?token=${page.query.token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        return { data: response.error }
      }

      return { data: "account activated, you can login now" }
    } catch (err) {
      return { data: err.message }
    }
  }
</script>

<script  lang="ts"s>
  export let data
</script>

<section>{data}</section>
