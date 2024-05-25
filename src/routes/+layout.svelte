<script lang="ts">
import "../app.scss";
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

      {@render children()}

