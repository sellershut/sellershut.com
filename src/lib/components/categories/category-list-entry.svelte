<script lang="ts">
  import type { ICategory } from '$lib/types/category';
  import type { SvelteComponent } from 'svelte';

  export let focused = false;
  export let icons: Map<string, typeof SvelteComponent>;
  export let category: ICategory;
</script>

<a
  href={'#'}
  class={`flex flex-col items-center gap-2 p-3 ${
    focused ? 'border-b-2' : ''
  } text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer hover:border-b-2 border-rose-500`}
>
  <svelte:component this={icons.get(category.name)} />
  <p class="font-medium text-center text-xs small-caps">
    {category.name}
  </p>
</a>
