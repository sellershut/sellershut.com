<script lang="ts">
import TopNav from "$lib/components/header/TopNav.svelte";
import "../app.scss";
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<TopNav/>
{@render children()}
