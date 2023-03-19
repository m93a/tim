import "./styles.css";
import Loader from "./Loader.svelte";

const app = new Loader({
  target: document.getElementById("app"),
});

export default app;
