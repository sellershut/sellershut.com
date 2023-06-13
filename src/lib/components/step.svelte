<script lang="ts">
  export let num: number;
  export let text: string;
  export let isCurrent: boolean;
  export let max: number;
</script>

<div class="flex flex-col space-y-1 w-40">
  <span
    class={`block w-full border ${
      isCurrent ? 'border-rose-500' : 'border-zinc-600'
    } border-t`}
  />
  <div>
    <span class="text-xs">Step {num} of {max}</span>
    <p>{text}</p>
  </div>
</div>
