<script lang="ts">
  import IconSearch from '../icons/icon-search.svelte';
  import IconX from '../icons/icon-x.svelte';

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

  export let showSearchContainer = true;
</script>

<div
  class={showSearchContainer
    ? 'search-container w-3/5 mx-auto px-10 relative z-30'
    : 'hidden pointer-events-none'}
>
  <a
    href={'#'}
    class="link-search flex h-10 items-center justify-center absolute left-3 opacity-50"
  >
    <IconSearch class={'text-white'} />
  </a>

  <div class="search-bar">
    <form action="" class="w-full mx-auto">
      <input
        class="w-full h-10 outline-none bg-transparent text-white text-base border-transparent shadow-sm border-1 focus:border-transparent focus:ring-transparent"
        type="text"
        placeholder="Search sellershut.com"
      />
    </form>
  </div>

  <div
    class="link-close flex items-center justify-center h-10 absolute top-0 right-3 opacity-50 cursor-pointer transition-all duration-300 hover:opacity-40"
  >
    <IconX class={'text-white'} />
  </div>

  <!-- nav quick links -->
  <div class="quick-links bg-white absolute left-0 right-0 py-4 px-2 rounded-b-2xl">
    <h2 class="uppercase text-xs mx-8 font-bold mt-3">Quick Links</h2>
    <ul class="mt-2">
      {#each quickLinks as link}
        <li>
          <a
            class="inline-block w-full py-2 px-12 text-black font-normal hover:bg-gray-100 hover:text-blue-400"
            href={link.path}>{link.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</div>
