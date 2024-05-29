<script lang="ts">
import * as Pagination from "$lib/components/ui/pagination/index";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-svelte";

let windowWidth = $state(0);
let isDesktop = $derived(windowWidth > 768);

$effect(() => {});

let count = 20;
let perPage = $derived(isDesktop ? 3 : 8);
let siblingCount = $derived(isDesktop ? 1 : 0);
</script>

<svelte:window bind:outerWidth={windowWidth} />

  <section class="container px-5 py-12 mx-auto">
    <div class="flex flex-wrap -m-4">
      {#each Array(24) as _}
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
          <a href={"#"} class="block relative h-48 rounded overflow-hidden">
            <img
              alt="ecommerce"
              class="object-cover object-center w-full h-full block"
              src="https://dummyimage.com/420x260"
            />
          </a>
          <div class="mt-4">
            <h3 class="text-xs tracking-widest title-font mb-1">CATEGORY</h3>
            <h2 class="title-font text-lg font-medium">The Catalyzer</h2>
            <p class="mt-1">$16.00</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton>
        <IconChevronLeft class="h-4 w-4" />
        <span class="hidden sm:block">Previous</span>
      </Pagination.PrevButton>
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item>
          <Pagination.Link {page} isActive={currentPage === page.value}>
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton>
        <span class="hidden sm:block">Next</span>
        <IconChevronRight class="h-4 w-4" />
      </Pagination.NextButton>
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
