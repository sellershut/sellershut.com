<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import type { Category } from '$lib/@types/category';
  import { scale } from 'svelte/transition';

  export let icons: Map<string, typeof SvelteComponent>;
  export let category: Category;
  export let selected = false;
  const getRandomNumber = (min = 0, max = 400): number =>
    Math.random() * (max - min) + min;
</script>

<a
  href={'#'}
  transition:scale={{ delay: getRandomNumber() }}
  class={`rounded-xl border-2 ${
    selected ? 'border-rose-500 dark:border-rose-500' : ''
  } dark:border-zinc-700 dark:hover:border-rose-500 p-4 hover:border-rose-500 inline-flex w-full items-start flex-col gap-3 transition cursor-pointer`}
>
  <svelte:component this={icons.get(category.name)} class="scale-75" />
  <p class="font-semibold text-center text-xs whitespace-nowrap">
    {category.name}
  </p>
</a>
