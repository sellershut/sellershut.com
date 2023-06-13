<script lang="ts">
  import { fade } from 'svelte/transition';

  let title = '';
  let titleEdited = false;

  $: titleInvalid = !title.trim().length && titleEdited;
</script>

<div class="h-full flex flex-col space-y-2">
  <div
    class="flex space-x-2 bg-zinc-900 p-2 rounded shadow drop-shadow items-center justify-center"
  >
    <div class="flex flex-col space-y-1">
      <span class="block w-full border border-zinc-600 border-t" />
      <div>
        <p>Step 1</p>
        <p>General Information</p>
      </div>
    </div>
  </div>
  <div transition:fade class="flex flex-col flex-1 text-left space-y-4">
    <div class="flex flex-col space-y-2">
      <p class="inline-flex gap-2">
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
          titleEdited = true;
        }}
        class={`w-full ${
          titleInvalid ? 'border-2 border-red-500' : ''
        } focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm`}
        placeholder="My ad title"
      />
    </div>
    <div class="flex flex-col space-y-2 flex-1">
      <p>Description</p>
      <textarea
        class="w-full flex-1 focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm"
        placeholder="Don't shy away from the details now :)"
      />
    </div>
  </div>
</div>
