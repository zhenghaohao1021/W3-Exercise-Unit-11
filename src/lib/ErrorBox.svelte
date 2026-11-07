<script>
  // `error` is { status, message }: what a server function stopped with (in SvelteKit this is +error.svelte and `page`)
  let { error } = $props();
</script>

<div class="error-box" role="alert">
  <h2>Something went wrong</h2>
  <p><strong>{error.status}</strong> {error.message}</p>
  <p><a href="/recipes">Back to the recipe list</a></p>
</div>

<style>
  .error-box {
    padding: 0.5rem 1rem;
    border: 1px solid #e0a0a8;
    background: #fff5f5;
    border-radius: 8px;
  }
</style>
