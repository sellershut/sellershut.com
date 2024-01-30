<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import type { ComponentType } from 'svelte';

  let { component, data } = $props<{
    component: ComponentType;
    data: { text: string; icon?: ComponentType }[];
  }>();
</script>

<div class="overflow-hidden w-screen md:w-auto" use:emblaCarouselSvelte>
  <div class="flex gap-2 pb-1">
    {#each data as content}
      <div class="place-self-center max-w-24 min-w-24 flex-shrink-0 flex-grow-0 basis-auto">
        <svelte:component this={component} data={content} />
      </div>
    {/each}
  </div>
</div>
