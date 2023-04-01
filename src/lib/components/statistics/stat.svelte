<script lang="ts">
  const numberFormatter = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  export let value: number;
  export let name: string;
</script>

<div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
  <h2 class="title-font font-medium text-3xl">{numberFormatter.format(value)}</h2>
  <p class="leading-relaxed dark:text-zinc-400 text-zinc-600 slashed-zero">{name}</p>
</div>
