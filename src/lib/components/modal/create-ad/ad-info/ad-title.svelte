<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  export let title: string;
  export let titleInvalid: boolean;
</script>

<div transition:fade class="flex flex-col flex-1 text-left space-y-4">
  <div class="flex flex-col space-y-2">
    <p class="inline-flex gap-2 text-xs">
      Title <span
        transition:fade
        class={`${
          titleInvalid ? 'block' : 'hidden'
        } font-light text-red-500 italic`}
        >(your title is empty or too short)</span
      >
    </p>
    <input
      type="text"
      bind:value={title}
      on:input={() => {
        dispatch('titleChanged', title);
      }}
      class={`w-full ${
        titleInvalid ? 'border-2 border-red-500' : ''
      } focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm`}
      placeholder="My ad title"
    />
  </div>
  <div class="flex flex-col space-y-2 flex-1">
    <p class="text-xs">Description</p>
    <textarea
      class="w-full flex-1 focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm"
      placeholder="Don't shy away from the details now :)"
    />
  </div>
</div>
