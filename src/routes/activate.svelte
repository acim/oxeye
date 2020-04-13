<script context="module">
  export async function preload(page, session) {
    const data = { page, session };
    return { data };
  }
</script>

<script>
  export let data;
</script>

{JSON.stringify(data)}
