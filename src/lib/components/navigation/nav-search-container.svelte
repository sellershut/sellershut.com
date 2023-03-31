<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import IconSearch from '../icons/icon-search.svelte';
  import IconX from '../icons/icon-x.svelte';

  export let showSearchContainer = false;

  const quickLinks = [
    {
      name: 'Gaming Console',
      path: '#',
    },
    {
      name: 'iPhone',
      path: '#',
    },
    {
      name: 'Laptop',
      path: '#',
    },
    {
      name: 'Cricket bat',
      path: '#',
    },
    {
      name: 'User manual',
      path: '#',
    },
  ];

  const dispatch = createEventDispatcher();

  function closeSearch() {
    dispatch('message', false);
  }
</script>

<div
  transition:fly={{ x: 150, delay: 50 }}
  class="search-container w-3/5 mx-auto px-10 fixed top-0 left-0 right-0 z-30"
>
  {#if showSearchContainer}
    <a
      transition:fly={{ x: 200, delay: 400 }}
      href={'#'}
      class="link-search flex h-10 items-center justify-center absolute left-3 opacity-50"
    >
      <IconSearch class={'text-white'} />
    </a>

    <div transition:fly={{ x: 200, delay: 450 }} class="search-bar">
      <form action="" class={'w-full mx-auto'}>
        <input
          class="w-full h-10 outline-none bg-transparent text-white text-base border-transparent shadow-sm border-1 focus:border-transparent focus:ring-transparent"
          type="text"
          placeholder="Search sellershut.com"
        />
      </form>
    </div>

    <a
      transition:fade={{ delay: 800 }}
      href={'#'}
      on:click={closeSearch}
      class="link-close flex items-center justify-center h-10 absolute top-0 right-3 opacity-50 cursor-pointer transition-all duration-300 hover:opacity-40"
    >
      <IconX class={'text-white'} />
    </a>
  {/if}
  <!-- nav quick links -->
  <div class="quick-links bg-white absolute left-0 right-0 py-4 px-2 rounded-b-2xl">
    {#if showSearchContainer}
      <h2 transition:fly={{ x: 100, delay: 100 }} class="uppercase text-xs mx-8 font-bold mt-3">
        Quick Links
      </h2>
    {/if}

    <ul class="mt-2">
      {#each quickLinks as { path, name }, i}
        {#if showSearchContainer}
          <li transition:fly={{ x: 100, delay: (i + 1) * 50 }}>
            <a
              class="inline-block w-full py-2 px-12 text-black font-normal hover:bg-gray-100 hover:text-blue-400"
              href={path}>{name}</a
            >
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</div>
