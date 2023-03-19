<script lang="ts">
  import { getVips } from "./Context.svelte";
  const { Image, Source } = getVips();

  const supportedTypes = new Set(["image/png", "image/jpeg"]);

  async function onPaste(e: ClipboardEvent) {
    const blob: File = [...e.clipboardData.files].filter((f) =>
      supportedTypes.has(f.type)
    )[0];
    if (blob === undefined) return;
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const source = Source.newFromMemory(bytes);
    const img = Image.newFromSource(source);
    console.log(img);
  }
</script>

<svelte:body on:paste={onPaste} />

<main class="container">
  <h1>Welcome to Tauri!</h1>

  <div class="row">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src="/svelte.svg" class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
</main>

<style>
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }
</style>
