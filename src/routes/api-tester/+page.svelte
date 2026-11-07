<script>
  // Loading the file is what registers the routes on the pretend server
  import '$lib/mock-server/api.js';

  let status = $state('');
  let body = $state('');

  async function send(method, payload) {
    const options = { method };
    if (payload !== undefined) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
    const response = await fetch('/api/recipes', options);
    status = `${response.status}`;
    body = JSON.stringify(await response.json(), null, 2);
  }
</script>

<!-- Verify: GET shows the recipes as JSON; POST with an empty body answers 400; POST with a title answers 201 and the new recipe. -->
<h2>JSON feed: /api/recipes</h2>
<p>These buttons call the endpoint you write in <code>src/lib/mock-server/api.js</code>, the way another app would.</p>

<p>
  <button onclick={() => send('GET')}>GET /api/recipes</button>
  <button onclick={() => send('POST', {})}>POST {'{}'}</button>
  <button onclick={() => send('POST', { title: 'Teh tarik', minutes: 5 })}>POST a recipe with a title</button>
</p>

{#if status}
  <p>Status: <strong id="status">{status}</strong></p>
  <pre id="body">{body}</pre>
{/if}
