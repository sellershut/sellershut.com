<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import type { ComponentType } from 'svelte';

  const gapSize = 4;

  let { component, data } = $props<{
    component: ComponentType;
    data: { text: string; icon?: ComponentType }[];
  }>();

  let windowWidth = $state(0);
</script>

<svelte:window bind:outerWidth={windowWidth} />

<Carousel.Root class="w-screen md:max-w-screen-2xl py-2">
  <Carousel.Content class={`-ml-${gapSize}`}>
    {#each data as content}
      <Carousel.Item class={`place-self-center basis-auto min-w-24 pl-${gapSize}`}>
        <svelte:component this={component} data={content} />
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  {#if windowWidth > 768}
    <Carousel.Previous />
    <Carousel.Next />
  {/if}
</Carousel.Root>
