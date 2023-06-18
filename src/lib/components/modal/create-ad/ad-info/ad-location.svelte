<script lang="ts">
  import type { Country } from '$lib/@types/country';
  import { rose400, rose500, zinc300, zinc800 } from '$lib/data/colours';
  import { formattedCountries, getCountryByValue } from '$lib/data/countries';
  import { onMount } from 'svelte';
  import Select from 'svelte-select';
  import type { LatLngExpression } from 'leaflet';
  import Map from './map.svelte';

  let value: Country;
  $: icon = getCountryByValue(value?.value)?.icon;

  let isDark: boolean;
  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  $: background = isDark ? zinc800 : zinc300;
  $: coords = value?.latlng as LatLngExpression;
  const defaultCoords = [51.505, -0.09] as LatLngExpression;
</script>

<Select
  class="z-[2000]"
  --border={`2px solid ${rose400}`}
  --border-hover={`2px solid ${rose500}`}
  --border-focused={`2px solid ${rose500}`}
  --background={background}
  --list-background={background}
  --item-hover-bg={`${rose500}`}
  --item-is-active-bg={`${rose500}`}
  items={formattedCountries}
  bind:value
>
  <div slot="prepend">
    {#if icon}
      <div class="pr-2">{icon}</div>
    {/if}
  </div>
</Select>
<Map latlng={coords || defaultCoords} />
