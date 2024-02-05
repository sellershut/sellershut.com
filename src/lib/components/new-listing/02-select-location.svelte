<script lang="ts">
  import * as Dialog from '$components/ui/dialog';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import OSM from 'ol/source/OSM';
  import TileLayer from 'ol/layer/Tile';
  import { Attribution, defaults as defaultControls } from 'ol/control';

  let map: Map;

  $effect(() => {
    const attribution = new Attribution({
      collapsible: false,
    });
    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  });
</script>

<Dialog.Description>Which city are you located in?</Dialog.Description>

<div id="map" class="h-64 aspect-auto map"></div>

