<script lang="ts">
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

let exploreParams: Writable<string | null> = getContext("exploreParams");
</script>

<section>
  {#if $exploreParams}
    <div class="container space-y-2">
      {#await import("$lib/components/home/explore.svelte") then Module}
        <Module.default />
      {/await}
    </div>
  {:else}
    <div class="space-y-12">
    {#await import("$lib/components/home/hero.svelte") then Module}
      <Module.default />
    {/await}
    </div>
  {/if}
</section>
