<template>
  <div class="nav">
    <div class="nav__wrap">
      <ul class="nav__body">
        <li v-for="(link, idx) in links" class="nav__item" :key="idx">
          <router-link :to="{ name: link.name }">{{ link.text }}</router-link>
        </li>
      </ul>
      <div v-if="mapStore.isMapOpen" @click="openModal" class="nav__item">
        Add marker
      </div>
    </div>
  </div>
</template>

<script>
import { useMapStore } from '../stores/map.js'
import { addMarkerModal } from '../stores/addMarkerModal.js'

export default {
  setup() {
    const links = [
      { name: 'Home', text: 'Home' },
      { name: 'Map', text: 'Map' },
    ]

    const mapStore = useMapStore()
    const markerModal = addMarkerModal()

    const openModal = () => {
      markerModal.open()
    }

    return {
      links,
      mapStore,
      markerModal,
      openModal,
    }
  },
}
</script>
