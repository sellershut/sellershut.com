<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import IconSearch from '../icons/icon-search.svelte';
  import IconX from '../icons/icon-x.svelte';

  const links = [
    {
      name: 'All',
      path: '#',
    },
    {
      name: 'Electronics',
      path: '#',
    },
    {
      name: 'Apparel',
      path: '#',
    },
    {
      name: 'Recreational',
      path: '#',
    },
    {
      name: 'Sporting',
      path: '#',
    },
    {
      name: 'Vehicles',
      path: '#',
    },
  ];

  const quickLinks = [
    {
      name: 'iPhone',
      path: '#',
    },
    {
      name: 'MacBook',
      path: '#',
    },
    {
      name: 'Mechanical Keyboard',
      path: '#',
    },
    {
      name: 'Cricket Bat',
      path: '#',
    },
    {
      name: 'Rugby Ball',
      path: '#',
    },
  ];

  let searchFocused = false;
  let showSearchContainer = false;
</script>

<nav class="bg-black flex h-screen md:h-10 text-white z-50 text-sm">
  {#if !searchFocused}
    <ul
      transition:fly={{ y: -100, duration: 500 }}
      class="z-10 flex w-full lg:w-[1000px] justify-between md:justify-around md:mx-auto px-2 fixed top-0 left-0 right-0 h-10 items-center"
    >
      <li class="w-1/3 md:hidden">menu</li>
      {#if !showSearchContainer}
        <li class="w-1/3 md:w-auto text-center md:text-left">logo</li>
        <li class="hidden md:flex h-full items-center justify-center">
          {#each links as { path, name }}
            <a class="mx-4 py-3 opacity-80 hover:opacity-100 inline" href={path}>{name}</a>
          {/each}
        </li>
        <li class="hidden md:block">
          <a
            href={'#'}
            on:click={() => {
              showSearchContainer = true;
            }}
          >
            <IconSearch />
          </a>
        </li>
        <li class="hidden md:block">Login</li>
        <li class="w-1/3 md:w-auto text-right md:text-left">theme</li>
      {:else}
        <div class="hidden: md:flex items-center justify-center w-full relative">
          <div>
            <IconSearch class="text-gray-400" />
          </div>
          <form class="flex-1 flex flex-col">
            <input
              type="text"
              placeholder="search sellershut.com"
              class="w-full bg-transparent border-transparent"
            />
            <div
              class="text-black absolute top-10 left-0 w-full px-12 py-8 rounded-b-2xl flex flex-col space-y-1 bg-white shadow-md"
            >
              <h2>Quick Links</h2>
              {#each quickLinks as { path, name }, i}
                <a class="mx-4 opacity-80 hover:opacity-100 hover:bg-blue-50 p-2" href={path}
                  >{name}</a
                >
              {/each}
            </div>
          </form>
          <a
            href={'#'}
            on:click={() => {
              showSearchContainer = false;
            }}
          >
            <IconX class="text-gray-400" />
          </a>
        </div>
      {/if}
    </ul>
  {/if}

  <div
    class={`md:hidden absolute top-0 left-0 right-0 transition-all duration-500 w-full ${
      searchFocused ? 'translate-y-0' : 'translate-y-[40px]'
    } h-screen flex flex-col`}
  >
    <form
      action=""
      class="relative flex space-x-2 px-2 w-full overscroll-x-none justify-center items-center"
    >
      <input
        type="text"
        on:focus={() => {
          searchFocused = true;
        }}
        class="h-10 flex-1 rounded bg-zinc-800 pl-8 w-full"
        placeholder="search sellershut.com"
      />
      <div class="absolute top-2 left-1 text-gray-500">
        <IconSearch />
      </div>
      {#if searchFocused}
        <a
          on:click={() => {
            searchFocused = false;
          }}
          href={'#'}
          class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded">Cancel</a
        >
      {/if}
    </form>

    {#if !searchFocused}
      {#each links as { path, name }, i}
        <a
          in:fly={{ x: -20, y: 20, delay: 300 + (i + 1) * 100 }}
          class="mx-4 py-3 border-b border-gray-600 opacity-80 hover:opacity-100"
          href={path}>{name}</a
        >
      {/each}
    {:else}
      <h2 transition:fade class="pt-4 px-10 font-bold">Quick Links</h2>
      {#each quickLinks as { path, name }, i}
        <a
          in:fly={{ x: 20, y: -20, delay: (i + 1) * 100 }}
          class="mx-4 py-3 border-b border-gray-600 opacity-80 hover:opacity-100"
          href={path}>{name}</a
        >
      {/each}
    {/if}
  </div>
</nav>
