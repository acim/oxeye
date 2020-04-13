<script>
  import { stores } from "@sapper/app";

  const { page, session } = stores();
</script>

{JSON.stringify(page)} {JSON.stringify(session)}
