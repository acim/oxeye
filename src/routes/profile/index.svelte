<script context="module" lang="ts">
  export async function preload(page, session) {
    if (!session || !session.user) {
      this.redirect(302, "login")
      return
    }

    const res = await this.fetch("profile/config.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      const data = await res.json()
      return { data }
    }

    return { data: { error: "Profile not found" } }
  }
</script>

<script lang="ts">
  import PasswordChangeForm from "../../components/PasswordChangeForm.svelte"
  import { Container, Card } from "svelte-chota"

  export let data
  let currentPassword
  let newPassword
  const submit = () => {
    console.log("submit pressed")
  }
</script>

<Container>
  {#if data}
    Your username is:
    {data.username}
    <hr />
    <Card>
      <h2 slot="header">Change password</h2>
      <PasswordChangeForm {currentPassword} {newPassword} {submit} />
    </Card>
  {/if}
</Container>
