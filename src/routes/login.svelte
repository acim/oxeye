<script>
  import { goto, stores } from "@sapper/app";

  const { session } = stores();
  let username = "";
  let password = "";
  let error = "";
  $: valid = username && password;

  async function submit() {
    try {
      const response = await fetch("auth/login", {
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
      $session.user = decode.user;
      goto("admin");
    } catch (err) {
      error = err;
    }
  }
</script>

<style>
  fieldset {
    border: none;
  }
  input {
    display: block;
  }
  button {
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px 0;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section class="section">
  <div class="container">

    <h1>Login</h1>

    <form on:submit|preventDefault={submit}>
      <fieldset>
        <label for="username">Username</label>
        <input class="input" type="text" bind:value={username} required />
        <label for="password">Password</label>
        <input
          class="input"
          type="password"
          bind:value={password}
          autocomplete="on"
          required />
        <button type="submit" disabled={!valid}>Login</button>
      </fieldset>
    </form>
    {#if error}Error: {error}{/if}
  </div>
</section>
