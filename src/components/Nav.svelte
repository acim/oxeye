<script>
  import { goto, stores } from "@sapper/app";
  import { Container, Nav } from "svelte-chota-ablab";

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
</script>

<Container>
  <Nav>
    <a
      slot="left"
      aria-current={segment === undefined ? 'page' : undefined}
      class:active={segment === undefined}
      href=".">
      Home
    </a>
    <a
      slot="left"
      aria-current={segment === 'profile' ? 'page' : undefined}
      class:active={segment === 'profile'}
      href="profile">
      Profile
    </a>
    <a
      slot="left"
      aria-current={segment === 'register' ? 'page' : undefined}
      class:active={segment === 'register'}
      class:is-hidden={loggedIn}
      href="register">
      Register
    </a>
    <a slot="left" href="." class:is-hidden={!loggedIn} on:click={logout}>
      Logout
    </a>
  </Nav>
</Container>
