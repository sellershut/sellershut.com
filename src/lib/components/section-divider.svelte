<script lang="ts">
  import type { ISectionDivider } from '$lib/types/common';

  export let params: ISectionDivider;
</script>

<div
  class={`w-full h-1 bg-zinc-200 dark:bg-gray-800 flex items-center ${
    params.position === 'centre' ? 'justify-center' : ''
  } ${params.position === 'left' ? 'justify-start' : ''} ${
    params.position === 'right' ? 'justify-end' : ''
  } `}
>
  {#if params.hintEnabled}
    <span class="h-full w-24 rounded bg-rose-500" />
  {/if}
</div>
