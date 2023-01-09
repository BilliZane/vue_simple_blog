<template>
  <header class="header">
    <div class="header__title">
      {{ mapStore.isMapOpen ? 'Super Map' : 'Super Blog' }}
    </div>
    <div class="header__subtitle">
      {{
        mapStore.isMapOpen ? 'Leaflet based map' : 'jsonplaceholder based blog'
      }}
    </div>
  </header>
</template>

<script>
import { useMapStore } from '../stores/map'

export default {
  setup() {
    const mapStore = useMapStore()

    return {
      mapStore,
    }
  },
}
</script>
