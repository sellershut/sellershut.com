<script lang="ts">
  import type { StepItem } from '$lib/@types/steps';

  export let num: number;
  export let step: StepItem;
  export let isCurrent: boolean;
  export let max: number;
</script>

<div class="flex flex-col space-y-1 w-40 items-center justify-start">
  <span
    class={`block w-full border ${
      isCurrent ? 'border-rose-500' : 'border-zinc-600'
    } border-t`}
  />
  <div class="flex flex-col items-start justify-start">
    <div class="lg:hidden">
      {#if step.icon}
        <svelte:component this={step.icon} class="opacity-90" />
      {/if}
    </div>
    <div class="hidden lg:block text-xs">
      <span>Step {num} of {max}</span>
      <p class="font-medium">{step.text}</p>
    </div>
  </div>
</div>
