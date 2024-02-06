<script lang="ts">
  import type { MyCountry } from '$lib/types/country';
  import { Feature, Map, View } from 'ol';
  import OSM from 'ol/source/OSM';
  import TileLayer from 'ol/layer/Tile';
  import { useGeographic } from 'ol/proj';
  import { onDestroy, onMount } from 'svelte';
  import 'ol/ol.css';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import { Point } from 'ol/geom';
  import Style from 'ol/style/Style';
  import Icon from 'ol/style/Icon';

  const { country } = $props<{ country: MyCountry }>();
  const coords = $state(country.latlng.toReversed());
  const point = $state(new Point(coords));

  const createMarker = () =>
    new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: point,
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          crossOrigin: 'anonymous',
          src: '/marker-icon.png',
        }),
      }),
    });

  let map: Map | undefined = $state();
  onMount(() => {
    useGeographic();
    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        createMarker(),
      ],
      target: 'map',
      view: new View({
        center: coords,
        zoom: 8,
      }),
    });
  });
  onDestroy(() => {
    // Clean up when the component is destroyed
    if (map) {
      map.setTarget(undefined); // Remove the map from the DOM
      map.dispose(); // Dispose the map instance
    }
  });

  $effect(() => {
    if (map) {
      map.setView(
        new View({
          center: [...country.latlng.toReversed()],
          zoom: 5,
        })
      );

      map.on('click', (e) => {
        point.setCoordinates(e.coordinate);
    //    map?.render();
      });
    }
  });
</script>

<div class="w-full max-h-60 relative">
  <div id="map" class="min-w-full w-52 h-52" />
</div>
