<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import type { Map, LatLngExpression } from 'leaflet';

  let mapElement: string | HTMLElement;
  let map: Map;

  export let latlng: LatLngExpression;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      map = leaflet.map(mapElement).setView(latlng, 5);

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      leaflet
        .marker(latlng)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    }
  });

  onDestroy(async () => {
    if (map) {
      map.remove();
    }
  });
</script>

<div class="mt-2 h-[35vh] rounded-lg" bind:this={mapElement} />

<style>
  @import 'leaflet/dist/leaflet.css';
</style>
