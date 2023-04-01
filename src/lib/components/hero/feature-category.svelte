<script lang="ts">
  import type { ICategory } from '$lib/types/category';

  export let category: ICategory;
</script>

<a href={'#'} class="group flex flex-col items-center gap-2">
  <img
    alt={`${category.name} image`}
    class="object-fill w-36 lg:w-40 aspect-square duration-200 transition-all rounded-full
    bg-zinc-500 group-hover:border-4 group-hover:scale-105 group-hover:border-rose-500 shadow-lg"
    src={category.imageUrl}
  />
  <p class="small-caps tracking-wider font-medium dark:opacity-70">{category.name}</p>
  <span
    class="invisible w-2 aspect-square transition-all duration-200 bg-rose-500 rounded-full
    group-hover:visible"
  />
</a>
