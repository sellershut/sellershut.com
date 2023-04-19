<script lang="ts">
  import type { AvatarDropDown } from '$lib/@types/common';

  export let entry: AvatarDropDown;
  export let index: number;
</script>

<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
<a
  href={'#'}
  class="avatar-dropdown-item"
  role="menuitem"
  tabindex="-1"
  on:click={entry.onClick}
  id={`avatar-menu-item-${index}`}
>
  <svelte:component this={entry.icon} class="scale-75" />
  {entry.text}</a
>
