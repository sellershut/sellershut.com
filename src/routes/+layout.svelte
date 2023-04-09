<script lang="ts">
	import '../stylesheet.scss';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import NavigationBar from '$lib/components/navigation/navigation-bar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<QueryClientProvider client={data.tanstackQueryClient}>
	<NavigationBar />
	<slot />
</QueryClientProvider>
