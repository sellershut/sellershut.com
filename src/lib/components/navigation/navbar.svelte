<script lang="ts">
  import { fade } from 'svelte/transition';
  import IconHome from '../icons/icon-home.svelte';
  import IconMoon from '../icons/icon-moon.svelte';
  import IconSearch from '../icons/icon-search.svelte';
  import NavSearchContainer from './nav-search-container.svelte';

  const navigationLinks = [
    { name: 'Electronics', path: '#' },
    { name: 'Pets', path: '#' },
    { name: 'Vehicles', path: '#' },
    { name: 'Apparel', path: '#' },
    { name: 'Recreational', path: '#' },
  ];

  const navigationState = { showSearchContainer: false };

  function toggleSearchContainer() {
    navigationState.showSearchContainer = !navigationState.showSearchContainer;
  }

  function handleMessage(event: { detail: boolean }) {
    navigationState.showSearchContainer = event.detail;
  }
</script>

<div>
  <div
    class="nav-container bg-black bg-opacity-80 backdrop-blur-2xl h-10 z-50 fixed top-0 left-0 right-0"
  >
    <nav class={'w-[1000px] mx-auto px-2 h-full'}>
      <ul
        class={`desktop-nav flex justify-between items-center h-full [&>*]:transition-all [&>*]:duration-300 ${
          navigationState.showSearchContainer
            ? '[&>*]:opacity-0 [&>*]:pointer-events-none [&>*]:scale-75'
            : ''
        } `}
      >
        <li
          class={navigationState.showSearchContainer
            ? 'desktop-nav-link-search'
            : 'desktop-nav-link-no-search'}
        >
          <a href={'#'} class="link-logo">
            <IconHome class={'navigation-link scale-75'} />
          </a>
        </li>
        <li
          class={navigationState.showSearchContainer
            ? 'desktop-nav-link-search'
            : 'desktop-nav-link-no-search'}
        >
          <a href={'#'} class="navigation-link">All</a>
        </li>
        {#each navigationLinks as link}
          <li
            class={navigationState.showSearchContainer
              ? 'desktop-nav-link-search'
              : 'desktop-nav-link-no-search'}
          >
            <a href={link.path} class="navigation-link">{link.name}</a>
          </li>
        {/each}
        <li
          class={navigationState.showSearchContainer
            ? 'desktop-nav-link-search'
            : 'desktop-nav-link-no-search'}
        >
          <a href={'#'} on:click={toggleSearchContainer} class="link-search">
            <IconSearch class={'navigation-link scale-75'} />
          </a>
        </li>
        <li
          class={navigationState.showSearchContainer
            ? 'desktop-nav-link-search'
            : 'desktop-nav-link-no-search'}
        >
          <a href={'#'} class="navigation-link">Login</a>
        </li>
        <li
          class={navigationState.showSearchContainer
            ? 'desktop-nav-link-search'
            : 'desktop-nav-link-no-search'}
        >
          <a href={'#'} class="link-theme">
            <IconMoon class={'navigation-link scale-75 font-thin'} />
          </a>
        </li>
      </ul>
    </nav>

    <!-- end of navigation items -->

    {#if navigationState.showSearchContainer}
      <NavSearchContainer
        on:message={handleMessage}
        showSearchContainer={navigationState.showSearchContainer}
      />
    {/if}
  </div>

  {#if navigationState.showSearchContainer}
    <a
      transition:fade
      href={'#'}
      class="overlay fixed bg-black opacity-50 w-full h-screen left-0 top-0 z-20"
      on:click={() => {
        navigationState.showSearchContainer = false;
      }}
    >
      <div />
    </a>
  {/if}
</div>
