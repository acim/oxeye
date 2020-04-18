<script>
  import { Container, Card } from "svelte-chota";
</script>

<style>
  img {
    border-radius: 5%;
  }
</style>

<svelte:head>
  <title>Oxeye</title>
</svelte:head>

<Container>
  <Card>
    <h2 slot="header">Oxeye</h2>
    <img alt="Oxeye" src="oxeye.jpg" />
  </Card>
</Container>
