<script>
  import { goto } from "@sapper/app";
  import { user } from "./_store.js";

  let username = "";
  let password = "";

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
      // TODO handle network errors
      // errors = response.errors;
      if (decode.user) {
        $user = decode.user;
        goto("admin");
      }
    } catch (e) {
      console.log(e);
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
        <input class="input" type="password" bind:value={password} required />
        <button type="submit" disabled={!username || !password}>Login</button>
      </fieldset>
    </form>

  </div>
</section>
