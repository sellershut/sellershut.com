<script lang="ts">
  import { Button } from '$components/ui/button';
  import { Cross2, MagnifyingGlass } from 'radix-icons-svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let { searchOpen } = $props<{ searchOpen: boolean }>();
  const close = () => {
    dispatch('close', { text: 'mouse left search overlay' });
  };
</script>

<div
  class={`${searchOpen ? '' : 'hidden'} -mt-3 absolute z-20 top-full min-h-screen w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/90`}
>
  <div class="bg-background shadow rounded-b-xl pt-3">
    <div role="menu" tabindex="0" class="container flex flex-col" on:mouseleave={close}>
      <Button variant="ghost" class="place-self-end md:hidden" on:click={close}>
        <Cross2 />
      </Button>
      <div class="px-2 md:px-8 lg:px-16 xl:px-32 py-4">
        <form class="mb-2 relative">
          <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlass class="scale-125" />
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 font-semibold text-xl focus:outline-none bg-transparent focus:ring-0 focus:border-primary focus:border-none"
              placeholder="seach sellershut.com"
              required
            />
          </div>
        </form>
        <div class="px-8">
          <h1 class="text-2xl font-bold pb-4">Popular Now</h1>
          <ul class="flex flex-col px-2 text-popover-foreground">
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
