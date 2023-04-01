<script lang="ts">
  import Stat from './stat.svelte';

  const statistics = [
    {
      name: 'Live Ads',
      value: 120,
    },
    {
      name: 'Users',
      value: 60,
    },
    {
      name: 'In crafting',
      value: 43,
    },
    {
      name: 'Interactions',
      value: 541,
    },
  ];
</script>

<div class="px-5 mx-auto flex flex-wrap items-center justify-center">
  <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
    <div class="w-full sm:p-4 px-4 mb-6">
      <h4 class="title-font font-medium text-xl mb-2">Statistics</h4>
      <div class="leading-relaxed">
        Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar neutra sustainable
        fingerstache kickstarter.
      </div>
    </div>
    {#each statistics as { value, name }}
      <Stat {value} {name} />
    {/each}
  </div>
</div>
