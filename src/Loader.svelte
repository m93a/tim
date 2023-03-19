<script lang="ts">
  import App from './App.svelte';
  import Context from './Context.svelte';
import Vips from './vips/vips';
  let vips: typeof Vips;
  Vips().then(v => (window as any).vips = vips = v);
</script>

{#await Vips()}
  <p>Loading libvips...</p>
{:then vips} 
  <Context {vips} />
{/await}
