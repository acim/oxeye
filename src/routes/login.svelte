<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { Container, Input, Field, Button } from "svelte-chota-ablab";

  const { session } = stores();
  let username = "";
  let password = "";
  let error = "";
  $: valid = username && password;

  async function submit() {
    try {
      const response = await fetch("auth/login.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const decode = await response.json();
      if (decode.error) {
        error = decode.error;
        return;
      }
      $session = decode;
      goto("profile");
    } catch (err) {
      error = err;
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<Container>
  <h1>Login</h1>
  <form on:submit|preventDefault={submit}>
    <Field grouped {error}>
      <Input placeholder="Username" bind:value={username} required />
      <Input
        password
        placeholder="Password"
        bind:value={password}
        autocomplete="on"
        required />
      <Button primary disabled={!valid}>Login</Button>
    </Field>
  </form>
  {#if error}Error: {error}{/if}
</Container>
