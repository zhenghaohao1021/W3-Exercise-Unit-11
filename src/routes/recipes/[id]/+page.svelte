<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { loadRecipe } from '$lib/mock-server/loaders.js';
  import { callServer } from '$lib/mock-server/request.js';
  import ErrorBox from '$lib/ErrorBox.svelte';

  let recipe = $state(null);
  let error = $state(null);

  // Ask the server for the one recipe named in the address (in SvelteKit: load({ params }))
  onMount(async () => {
    try {
      const data = await callServer(() => loadRecipe({ params: $page.params }));
      recipe = data.recipe;
    } catch (problem) {
      error = { status: problem.status ?? 500, message: problem.message };
    }
  });
</script>

<!-- Verify: /recipes/1 shows Kaya toast and its minutes; /recipes/999 shows the error box with 404 and your message. -->
{#if error}
  <ErrorBox {error} />
{:else if recipe}
  <h2>{recipe.title}</h2>
  <p>Ready in {recipe.minutes} minutes.</p>
  <p><a href="/recipes">Back to the list</a></p>
{:else}
  <p>Loading...</p>
{/if}
