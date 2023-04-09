<script lang="ts">
	import { findCategories, keyRootCategories } from '$lib/api/category/query';
	import type { CategoriesResult } from '$lib/@types/category';
	import { createQuery } from '@tanstack/svelte-query';

	const categories = createQuery<CategoriesResult, Error>({
		queryKey: [keyRootCategories, 7],
		queryFn: () => findCategories(7, 0, 1)
	});
</script>

{#if $categories.isLoading}
	<span>Loading</span>
{:else if $categories.isError}
	<span>Error: {$categories.error.message}</span>
{:else}
	<ul>
		{#each $categories.data.categories as category}
			<div>{category.name}</div>
		{/each}
	</ul>
{/if}
