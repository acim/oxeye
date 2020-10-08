<script lang="ts">
  import { goto } from "@sapper/app"
  import { onMount } from "svelte"
  import { Container, Input, Field, Button } from "svelte-chota"

  const user = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  }
  let error = ""
  $: valid =
    user.firstName &&
    user.lastName &&
    user.email &&
    user.username &&
    user.password
  let registered = false
  $: console.log(error)

  async function submit() {
    try {
      const response = await fetch("auth/register.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      if (response.ok) {
        registered = true
        return
      }

      const r = await response.json()
      error = r.error
    } catch (err) {
      error = err
    }
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<Container>
  <h1>Register</h1>
  {#if registered}
    You are successfuly registered. We sent you an activation email.
  {:else}
    <form on:submit|preventDefault={submit}>
      <Field grouped>
        <Input placeholder="First Name" bind:value={user.firstName} required />
        <Input placeholder="Last Name" bind:value={user.lastName} required />
      </Field>
      <Field grouped>
        <Input placeholder="Username" bind:value={user.username} required />
        <Input
          password
          placeholder="Password"
          bind:value={user.password}
          autocomplete="on"
          required />
      </Field>
      <Field grouped>
        <Input
          placeholder="E-Mail"
          type="email"
          bind:value={user.email}
          required />
        <Button primary disabled={!valid}>Register</Button>
      </Field>
    </form>
    {#if error}
      <div>Error: {error}</div>
    {/if}
    <div>Already have an account? <a href="login">Login</a></div>
  {/if}
</Container>
