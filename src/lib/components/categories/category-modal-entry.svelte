<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import type { Category } from '$lib/@types/category';

  export let icons: Map<string, typeof SvelteComponent>;
  export let category: Category;
</script>

<a
  href={'#'}
  class="rounded-xl border-2 dark:border-zinc-700 dark:hover:border-rose-500 p-4 hover:border-rose-500 inline-flex w-full items-start flex-col gap-3 transition cursor-pointer"
>
  <svelte:component this={icons.get(category.name)} class="scale-75" />
  <p class="font-semibold text-center text-xs whitespace-nowrap">
    {category.name}
  </p>
</a>
