import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MapLibreGl from '@indoorequal/vue-maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const app = createApp(App)
app.use(MapLibreGl)
app.mount('#app')