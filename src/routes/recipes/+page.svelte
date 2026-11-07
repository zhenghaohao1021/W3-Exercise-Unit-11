<script>
  import { onMount } from 'svelte';
  import { actions } from '$lib/mock-server/actions.js';
  import { loadRecipes } from '$lib/mock-server/loaders.js';
  import { callServer } from '$lib/mock-server/request.js';
  import ErrorBox from '$lib/ErrorBox.svelte';

  let recipes = $state([]);
  let loading = $state(true);
  let loadError = $state(null);

  let title = $state('');
  let minutes = $state('');
  let addError = $state('');
  let removeMessage = $state({ id: null, text: '' });
  let codes = $state({});

  // The page asks the server for its data when it opens (in SvelteKit, `load` runs before the page is drawn)
  async function refresh() {
    try {
      const data = await callServer(() => loadRecipes());
      recipes = data.recipes;
    } catch (problem) {
      loadError = { status: problem.status ?? 500, message: problem.message };
    } finally {
      loading = false;
    }
  }

  onMount(refresh);

  // The form sends its values to the server's `add` action: a failure comes back with a status and a message to show
  async function submitAdd(event) {
    event.preventDefault();
    const result = await callServer(() => actions.add({ fields: { title, minutes } }));
    if (result && result.failed) {
      addError = result.data.error;
      title = result.data.title ?? title;
      return;
    }
    addError = '';
    title = '';
    minutes = '';
    await refresh();
  }

  async function submitRemove(event, id) {
    event.preventDefault();
    const result = await callServer(() => actions.remove({ fields: { id, code: codes[id] ?? '' } }));
    if (result && result.failed) {
      removeMessage = { id, text: result.data.error };
      return;
    }
    removeMessage = { id: null, text: '' };
    await refresh();
  }
</script>

<!-- Verify: the list shows both starting recipes after a short "Loading..."; the add form and the delete boxes work through the server code. -->
<h2>Recipes</h2>

{#if loadError}
  <ErrorBox error={loadError} />
{:else if loading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each recipes as recipe (recipe.id)}
      <li>
        <a href="/recipes/{recipe.id}">{recipe.title}</a> ({recipe.minutes} min)
        <form class="inline" onsubmit={(event) => submitRemove(event, recipe.id)}>
          <input bind:value={codes[recipe.id]} placeholder="admin code" aria-label="admin code" />
          <button>Delete</button>
        </form>
        {#if removeMessage.id === recipe.id}
          <span class="error">{removeMessage.text}</span>
        {/if}
      </li>
    {:else}
      <li>No recipes yet.</li>
    {/each}
  </ul>
{/if}

<h3>Add a recipe</h3>
<form id="add-form" onsubmit={submitAdd}>
  <input name="title" placeholder="Title" bind:value={title} />
  <input name="minutes" type="number" placeholder="Minutes" bind:value={minutes} />
  <button>Add</button>
</form>

{#if addError}
  <p class="error">{addError}</p>
{/if}

<style>
  .inline {
    display: inline;
  }

  .error {
    color: #b00020;
  }
</style>
