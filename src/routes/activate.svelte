<script context="module" lang="ts">
  // import type { Preload } from "@sapper/common"

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

<script lang="ts">
  export let data: string
</script>

<section>{data}</section>
