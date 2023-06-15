<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  export let amount: number;
  export let amountInvalid: boolean;
</script>

<div transition:fade class="flex flex-col flex-1 text-left space-y-4">
  <div class="flex flex-col space-y-2">
    <p class="inline-flex gap-2 text-xs">
      Amount <span
        transition:fade
        class={`${
          amountInvalid ? 'block' : 'hidden'
        } font-light text-red-500 italic`}
        >(that doesn't look like a valid amount)</span
      >
    </p>
    <input
      bind:value={amount}
      on:input={() => {
        dispatch('amountChanged', amount);
      }}
      class={`w-full ${
        amountInvalid ? 'border-2 border-red-500' : ''
      } focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm`}
      placeholder="Enter an amount"
      type="number"
      min="0.01"
      step="0.01"
    />
  </div>
</div>
