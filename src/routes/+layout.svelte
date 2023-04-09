<script lang="ts">
	import NavigationBar from '$lib/components/navigation/navigation-bar.svelte';
	import type { PageData } from './$types';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	export let data: PageData;
</script>

<QueryClientProvider client={data.tanstackQueryClient}>
	<NavigationBar />
	<slot />
</QueryClientProvider>
