<script lang="ts">
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

let exploreParams: Writable<string | null> = getContext("exploreParams");
</script>

<section class="container px-5 py-12 mx-auto space-y-6 min-h-screen">
  {#if $exploreParams}
    {#await import("$lib/components/home/explore.svelte") then Module}
      <Module.default />
    {/await}
  {:else}
    {#await import("$lib/components/home/hero.svelte") then Module}
      <Module.default />
    {/await}
  {/if}
</section>
