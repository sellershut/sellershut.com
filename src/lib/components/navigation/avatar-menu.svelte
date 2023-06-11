<script lang="ts">
  import type { Session } from '@auth/core/types';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import type { AvatarDropDown } from '$lib/@types/common';
  import { navAvatarDropdownVisible } from '$lib/util/stores/nav-avatar-dropdown';
  import { clickOutside } from '$lib/util/click-outside';
  import IconUser from '../icons/icon-user.svelte';
  import AvatarDropdownItem from './avatar-dropdown-item.svelte';
  import IconShoppingBag from '../icons/icon-shopping-bag.svelte';
  import IconSignout from '../icons/icon-signout.svelte';

  export let session: Session | null;

  const toggleDropDownContent = (show?: boolean) => {
    $navAvatarDropdownVisible =
      show === undefined ? !$navAvatarDropdownVisible : show;
  };

  const avatarDropdownContent: AvatarDropDown[] = [
    {
      text: 'Create an Ad',
      icon: IconShoppingBag,
      onClick: () => {
        // open dialog
      },
    },
  ];
</script>

<div class="relative inline-block text-left h-full">
  <div class="h-full flex items-center justify-center">
    <button
      class="h-full"
      type="button"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      on:click={() => {
        if (session) {
          toggleDropDownContent();
        } else {
          signIn();
        }
      }}
    >
      {#if session}
        {#if session.user?.image}
          <img
            src={`${session.user.image}`}
            alt={'profile picture'}
            class="h-7 aspect-square rounded-full"
          />
        {/if}
      {:else}
        <IconUser class="h-7 aspect-square rounded-full" />
      {/if}
    </button>
  </div>
  <div
    class={`${
      $navAvatarDropdownVisible ? '' : 'hidden'
    } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-100/60
    dark:bg-zinc-800/60 backdrop-blur text-zinc-800 dark:text-zinc-300 shadow-lg
    ring-1 ring-black ring-opacity-5 focus:outline-none`}
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
    use:clickOutside
    on:click_outside={() => {
      $navAvatarDropdownVisible = false;
    }}
  >
    <div class="py-1" role="none">
      {#each avatarDropdownContent as entry, i}
        <AvatarDropdownItem {entry} index={i} />
      {/each}
      <button
        type="submit"
        on:click={signOut}
        class="avatar-dropdown-item"
        role="menuitem"
        tabindex="-1"
        id={`menu-item-${avatarDropdownContent.length}`}
      >
        <IconSignout class="scale-75" />
        Sign out</button
      >
    </div>
  </div>
</div>
