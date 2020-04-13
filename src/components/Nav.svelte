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
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>
    <li>
      <a aria-current={segment === 'admin' ? 'page' : undefined} href="admin">
        admin
      </a>
    </li>
    <li>
      <a
        aria-current={segment === 'register' ? 'page' : undefined}
        href="register">
        register
      </a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="blog">
        blog
      </a>
    </li>

    {#if $session && $session.user}
      <li>
        <a href="." on:click={logout}>logout</a>
      </li>
    {/if}
  </ul>
</nav>
