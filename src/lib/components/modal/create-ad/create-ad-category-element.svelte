<script lang="ts">
  import type { Category } from '$lib/@types/category';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let category: Category;
</script>

<div class="border">
  <button
    class="text-sm"
    on:click={() => {
      dispatch('message', category.id);
    }}
  >
    {category.name}</button
  >
</div>
