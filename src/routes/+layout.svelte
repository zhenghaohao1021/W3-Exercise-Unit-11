<script>
  import PretendServerBanner from '$lib/PretendServerBanner.svelte';
  import { PUBLIC_SITE_NAME } from '$lib/config.js';

  let { children } = $props();
</script>

<PretendServerBanner files="src/lib/mock-server/" />

<header>
  <h1>{PUBLIC_SITE_NAME}</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/recipes">Recipes</a>
    <a href="/api-tester">JSON feed</a>
  </nav>
</header>

<main>
  {@render children()}
</main>

<style>
  :global(body) {
    margin: 1rem;
    font-family: system-ui, sans-serif;
  }

  header {
    display: flex;
    gap: 2rem;
    align-items: baseline;
  }

  main {
    max-width: 40rem;
  }

  nav a {
    margin-right: 1rem;
  }
</style>
