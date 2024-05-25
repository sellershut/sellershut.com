<script lang="ts">
import TopNav from "$lib/components/header/TopNav.svelte";
import "../app.scss";
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-muted text-foreground duration-150 transition-colors">
<TopNav/>
{@render children()}
</div>
