
import type { FillLayerSpecification } from "maplibre-gl";
import { defineComponent, PropType } from 'vue';

import { LAYER_EVENTS, LayersWithSource } from "@indoorequal/vue-maplibre-gl/dist/lib/lib/layer.lib"
import { useLayer } from "@indoorequal/vue-maplibre-gl/dist/lib/composable/useLayer";


export function layerProps<
  T extends LayersWithSource,
>() {
  return {
    /**
     * The id of the layer
     */
    
    layerId: {
      type: String as PropType<T['id']>,
      required: true,
    },
    source: {
      type: String as PropType<T['source']>
    },
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: {
      type: [Object, Array, String, Number] as PropType<T['metadata']>
    },
    /**
     * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
     */
    sourceLayer: {type: String as PropType<T['source-layer']>},
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: {type: Number as PropType<T['minzoom']>},
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: {type: Number as PropType<T['maxzoom']>},
    /**
     * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
     */
    filter: {type: Object as PropType<T['filter']>},
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: {type: String as PropType<string>},
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    layout: {type: Object as PropType<T["layout"]>},
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    paint: {type: Object as PropType<T["paint"]>},
  };
}


export default defineComponent({
  name: "MglFillLayer",
  props: layerProps<FillLayerSpecification>(),
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<FillLayerSpecification>("fill", props);
  },
});
