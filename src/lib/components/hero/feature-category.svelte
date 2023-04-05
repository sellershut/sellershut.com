<script lang="ts">
  import type { ICategory } from '$lib/types/category';

  export let category: ICategory | null = null;
</script>

<a href={'#'} class="group flex flex-col items-center gap-2 py-2">
  <img
    alt={`${category ? category.name : 'loading category'} image`}
    class={`object-fill w-36 lg:w-40 aspect-square duration-200 transition-all rounded-full
    bg-zinc-500 group-hover:border-4 group-hover:scale-105 group-hover:border-rose-500 shadow-lg ${
      !category ? 'animate-pulse' : ''
    }`}
    src={`${category ? category.imageUrl : ''}`}
  />
  <p
    class={`small-caps tracking-wider font-medium dark:opacity-70 ${
      !category ? 'animate-pulse bg-zinc-500 rounded-md h-4 w-20' : ''
    }`}
  >
    {`${category ? category.name : ''}`}
  </p>
  <span
    class="invisible hidden w-2 aspect-square transition-all duration-200 bg-rose-500 rounded-full
    group-hover:visible md:block"
  />
</a>
