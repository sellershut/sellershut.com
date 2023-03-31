<script lang="ts">
  import IconHome from '../icons/icon-home.svelte';
  import IconMoon from '../icons/icon-moon.svelte';
  import IconSearch from '../icons/icon-search.svelte';

  const navigationLinks = [
    { name: 'Electronics', path: '#' },
    { name: 'Pets', path: '#' },
    { name: 'Vehicles', path: '#' },
    { name: 'Apparel', path: '#' },
    { name: 'Recreational', path: '#' },
  ];
</script>

<div class="nav-container bg-black h-10 z-50 fixed top-0 left-0 right-0">
  <nav class="w-[1000px] mx-auto px-2 h-full">
    <ul class="desktop-nav flex justify-between items-center h-full">
      <li>
        <a href={'#'} class="link-logo">
          <IconHome class={'navigation-link scale-75'} />
        </a>
      </li>
      <li>
        <a href={'#'} class="navigation-link">All</a>
      </li>
      {#each navigationLinks as link}
        <li>
          <a href={link.path} class="navigation-link">{link.name}</a>
        </li>
      {/each}
      <li>
        <a href={'#'} class="link-search">
          <IconSearch class={'navigation-link scale-75'} />
        </a>
      </li>
      <li>
        <a href={'#'} class="navigation-link">Login</a>
      </li>
      <li>
        <a href={'#'} class="link-theme">
          <IconMoon class={'navigation-link scale-75 font-thin'} />
        </a>
      </li>
    </ul>
  </nav>

  <!-- end of navigation items -->
</div>
