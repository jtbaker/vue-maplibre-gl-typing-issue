<script setup lang="ts">

import { MglMap, MglGeoJsonSource, MglFillLayer } from '@indoorequal/vue-maplibre-gl';
import LocalFillLayerComponent from "./FillLayerComponent"
// Props
const props = defineProps({
  center: {
    type: Array as () => [number, number],
    default: () => [0, 0],
  },
  zoom: {
    type: Number,
    default: 2,
  },
});
</script>

<template>
  <mgl-map :map-style="'https://demotiles.maplibre.org/style.json'" :center="center" :zoom="zoom" height="100vh">
    <mgl-navigation-control />
    <mgl-geo-json-source :sourceId="'test'" :data="{
      type: 'Feature',
      geometry: {
        type: 'Polygon', coordinates: [[
          [-124.848974, 24.396308], [-66.93457, 24.396308], [-66.93457, 49.384358],
          [-124.848974, 49.384358], [-124.848974, 24.396308]]]
      },
      properties: {}
    }">

      <mgl-fill-layer layerId="test" :paint="{ 'fill-color': 2}"></mgl-fill-layer>
      <local-fill-layer-component layerId="test2" :paint="{ 'fill-color': 2 }"></local-fill-layer-component>
    </mgl-geo-json-source>
  </mgl-map>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

/* Animation for map movement */
:deep(.maplibregl-map) {
  transition: opacity 0.3s ease;
}
</style>
