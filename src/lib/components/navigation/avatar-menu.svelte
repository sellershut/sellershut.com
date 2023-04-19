<script lang="ts">
  import type { Session } from '@auth/core/types';
  import { signIn } from '@auth/sveltekit/client';
  import IconUser from '../icons/icon-user.svelte';

  let showDropDownContent = false;

  const toggleDropDownContent = (show?: boolean) => {
    if (show === undefined) {
      showDropDownContent = !showDropDownContent;
    } else {
      showDropDownContent = show;
    }
  };

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
    } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div class="py-1" role="none">
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <a
        href={'#'}
        class="block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-0">Account settings</a
      >
      <a
        href={'#'}
        class="block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-1">Support</a
      >
      <a
        href={'#'}
        class="block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-2">License</a
      >
      <form method="POST" action="#" role="none">
        <button
          type="submit"
          class="block w-full px-4 py-2 text-left text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-3">Sign out</button
        >
      </form>
    </div>
  </div>
</div>
