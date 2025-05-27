<script setup lang="ts">
import { ref } from 'vue'
import MapContainer from "./components/MapContainer.vue"

</script>

<template>
  <div class="map-wrap">
    <MapContainer></MapContainer>
  </div>
</template>

<style>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>