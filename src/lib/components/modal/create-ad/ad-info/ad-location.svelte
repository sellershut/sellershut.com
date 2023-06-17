<script lang="ts">
  import type { Country } from '$lib/@types/country';
  import { formattedCountries, getCountryByValue } from '$lib/data/countries';
  import Select from 'svelte-select';

  let value: Country;
  $: icon = getCountryByValue(value?.value)?.icon;
</script>

<Select items={formattedCountries} bind:value>
  <div slot="prepend">
    {#if icon}
      <div class="pr-2">{icon}</div>
    {/if}
  </div>
</Select>
