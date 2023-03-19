<script lang="ts" context="module">
  import type Vips from "./vips/vips";
  import { createContext } from "svelte-create-context";
  const { get, setup } = createContext<typeof Vips>();
  export { get as getVips };
</script>

<script lang="ts">
  import App from "./App.svelte";

  export let vips: typeof Vips;
  setup(vips);
</script>

<App />
