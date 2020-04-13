<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";

  const user = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  };
  let error = "";
  $: valid =
    user.firstName &&
    user.lastName &&
    user.email &&
    user.username &&
    user.password;
  let firstNameEl;
  let registered = false;

  async function submit() {
    try {
      const response = await fetch("auth/register.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        registered = true;
        return;
      }

      const r = await response.json();
      error = r.error;
    } catch (err) {
      console.log(2);
      error = err;
    }
  }

  onMount(() => {
    setTimeout(() => {
      firstNameEl.focus();
    }, 0);
  });
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
  <title>Register</title>
</svelte:head>

<section>
  <div>

    <h1>Register</h1>

    {#if registered}
      You are successfuly registered. We sent you an activation email.
    {:else}
      <form on:submit|preventDefault={submit}>
        <fieldset>
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            bind:value={user.firstName}
            bind:this={firstNameEl}
            required />
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            bind:value={user.lastName}
            required />
          <label for="email">E-Mail</label>
          <input id="email" type="email" bind:value={user.email} required />
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            bind:value={user.username}
            required />
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            bind:value={user.password}
            autocomplete="on"
            required />
          <button type="submit" disabled={!valid}>Login</button>
        </fieldset>
      </form>
      {#if error}
        <div>Error: {error}</div>
      {/if}
      <div>
        Already have an account?
        <a href="login">Login</a>
      </div>
    {/if}
  </div>
</section>
