<script lang="ts">
import { page } from "$app/stores";
import type { Response } from "$lib/api/grpc/proto/category";
import { Button } from "$lib/components/ui/button";
import * as Carousel from "$lib/components/ui/carousel";
import { IconDevices } from "@tabler/icons-svelte";
import { getContext } from "svelte";
import { FilterOutline } from "svelte-ionicons";
import type { Writable } from "svelte/store";

let sliderCategories: Writable<Promise<Response>> =
	getContext("sliderCategories");

let searchParams = $state();

$effect(() => {
	page.subscribe((page) => {
		searchParams = page.url.searchParams.get("explore");
	});
});

function routePage(name: string): string {
	let url = new URLSearchParams($page.url.searchParams);

	url.set("explore", name);
	return `?${url.toString()}`;
}
</script>

<div
    class="flex flex-col items-center 2xl:mx-4 2xl:flex-row-reverse 2xl:gap-1.5"
>
    <Button
        variant="secondary"
        size="sm"
        class="mx-auto gap-2 2xl:mt-3 2xl:hidden"
    >
        <FilterOutline class="h-4 w-4" />
        Filter
    </Button>
    <div class="relative h-[65px] w-full">
        <nav class="absolute left-0 right-0">
            <Carousel.Root class="mx-16">
                <Carousel.Content class="-ml-4">
                    {#await $sliderCategories then queryResult}
                        {#each queryResult.connection?.edges ?? [] as { node }}
                            {#if node}
                                <Carousel.Item
                                    class="mt-4 h-16 min-w-24 basis-auto pl-4 text-xs opacity-80 hover:opacity-100"
                                >
                                    <a
                                        href={routePage(node.name)}
                                        class="flex flex-col items-center"
                                    >
                                        <IconDevices size={28} stroke={1} />
                                        <span class="font-semibold"
                                            >{node.name}</span
                                        >
                                    </a>
                                    <div
                                        class={`mt-1 h-[2px] w-full rounded-full bg-primary ${searchParams === node.name ? "" : "invisible"} `}
                                    ></div>
                                </Carousel.Item>
                            {/if}
                        {/each}
                    {/await}
                </Carousel.Content>
                <Carousel.Previous />
                <Carousel.Next />
            </Carousel.Root>
        </nav>
    </div>
</div>
