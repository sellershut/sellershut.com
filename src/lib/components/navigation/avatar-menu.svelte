<script lang="ts">
  import type { Session } from '@auth/core/types';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import type { AvatarDropDown } from '$lib/@types/common';
  import IconUser from '../icons/icon-user.svelte';
  import AvatarDropdownItem from './avatar-dropdown-item.svelte';
  import IconShoppingBag from '../icons/icon-shopping-bag.svelte';
  import IconSignout from '../icons/icon-signout.svelte';

  let showDropDownContent = false;

  const toggleDropDownContent = (show?: boolean) => {
    if (show === undefined) {
      showDropDownContent = !showDropDownContent;
    } else {
      showDropDownContent = show;
    }
  };

  const avatarDropdownContent: AvatarDropDown[] = [
    {
      text: 'Create an Ad',
      icon: IconShoppingBag,
    },
  ];

  export let session: Session | null;
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
      showDropDownContent ? '' : 'hidden'
    } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-300/60 dark:bg-zinc-800/60 backdrop-blur text-zinc-800 dark:text-zinc-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div class="py-1" role="none">
      {#each avatarDropdownContent as { text, icon }, i}
        <AvatarDropdownItem {text} {icon} index={i} />
      {/each}
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <button
        type="submit"
        on:click={signOut}
        class="px-4 py-2 text-sm inline-flex items-center justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
        role="menuitem"
        tabindex="-1"
        id={` menu-item-${avatarDropdownContent.length}`}
      >
        <IconSignout class="scale-75" />
        Sign out</button
      >
    </div>
  </div>
</div>
