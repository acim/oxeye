<script>
  import { goto, stores } from "@sapper/app";
  import { Container } from "svelte-chota";

  const { session } = stores();
  export let segment;

  async function logout() {
    try {
      await fetch("auth/logout.json", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      $session = null;
      goto(".");
    } catch (err) {
      console.log(err);
    }
  }

  $: loggedIn = $session && $session.user;

  const active = page => {
    if (segment === page) {
      return true;
    }
    return false;
  };
</script>

<Container>
  <nav class="nav">
    <div class="nav-left">
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        class:active={active(undefined)}
        href=".">
        Home
      </a>
    </div>
    <div class="nav-left">
      <a
        aria-current={segment === 'profile' ? 'page' : undefined}
        class:active={active('profile')}
        href="profile">
        Profile
      </a>
    </div>
    {#if !loggedIn}
      <div class="nav-left">
        <a
          aria-current={segment === 'register' ? 'page' : undefined}
          class:active={active('register')}
          href="register">
          Register
        </a>
      </div>
    {/if}

    {#if loggedIn}
      <div class="nav-left">
        <a href="." on:click={logout}>logout</a>
      </div>
    {/if}
  </nav>
</Container>
