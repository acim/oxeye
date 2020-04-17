<script>
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";

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

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'admin' ? 'page' : undefined} href="admin">
        admin
      </a>
    </li>
    {#if !loggedIn}
      <li>
        <a
          aria-current={segment === 'register' ? 'page' : undefined}
          href="register">
          register
        </a>
      </li>
    {/if}

    {#if loggedIn}
      <li>
        <a href="." on:click={logout}>logout</a>
      </li>
    {/if}
  </ul>
</nav>
