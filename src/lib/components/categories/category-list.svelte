<script lang="ts">
  import type { ICategory } from '$lib/types/category';
  import { categoryIcons } from '$lib/shared/category-icons';
  import CategoryListEntry from './category-list-entry.svelte';

  export let categories: ICategory[];

  const sort = (arr: ICategory[]): ICategory[] => arr.sort((a, b) => a.name.localeCompare(b.name));
</script>

<div class="pt-4 flex items-stretch justify-between overflow-x-auto">
  {#each sort(categories) as category}
    <CategoryListEntry icons={categoryIcons(categories)} {category} />
  {/each}
</div>
