<script>
  // Pre-built: leave this file as it is. The banner tells you the "server" on this page is a stand-in.
  let { files = 'src/lib/mock-server/' } = $props();
</script>

<div class="pretend-banner" role="note">
  Pretend server: the code in <code>{files}</code> would run on a server. Here it runs inside this page, so nothing is sent
  anywhere and anyone who opens the page's code can read it. Press Refresh in the preview to start again from the starting data.
</div>

<style>
  .pretend-banner {
    margin: 0 0 1rem;
    padding: 0.6rem 0.9rem;
    background: #e8f5e9;
    border: 1px solid #81c784;
    border-radius: 8px;
    color: #1b5e20;
    font: 0.875rem/1.4 system-ui, sans-serif;
  }

  code {
    font-size: 0.85em;
  }
</style>
