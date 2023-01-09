<template>
  <Modal
    v-if="modalStore.isOpen"
    @saveToStore="saveMarker"
    @closeModal="closeModalWithoutSave"
  />

  <TheAddMarker
    v-if="markerModal.isOpen"
    @addMarkerSubmit="submitTheAddMarker"
  />

  <div id="mapid"></div>
</template>

<script>
import L from 'leaflet'
import { onMounted, onBeforeUnmount } from 'vue'
import { useMapStore } from '../stores/map'
import { useModalStore } from '../stores/modal'
import { addMarkerModal } from '../stores/addMarkerModal'
import Modal from '../components/Modal.vue'
import TheAddMarker from '../components/TheAddMarker.vue'

export default {
  components: { Modal, TheAddMarker },
  setup() {
    let currentMap
    const mapStore = useMapStore()
    const modalStore = useModalStore()
    const markerModal = addMarkerModal()

    onMounted(() => {
      createMap()
      loadMarkers()
      mapStore.isMapOpen = true
      currentMap.addEventListener('click', createMarker)
      mapStore.delAllMarkers = false
    })

    onBeforeUnmount(() => {
      currentMap.removeEventListener('click', createMarker)
      mapStore.isMapOpen = false
      mapStore.markers = []
    })

    const createMap = () => {
      currentMap = L.map('mapid').setView(
        [mapStore.baseLat, mapStore.baseLng],
        6
      )

      const tileLayer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      )

      tileLayer.addTo(currentMap)
    }

    const loadMarkers = () => {
      mapStore.markers.forEach((marker) => {
        L.marker(marker.coordinates).addTo(currentMap).bindTooltip(marker.title)
      })

      if (!localStorage.getItem('markersLocal')) {
        JSON.stringify(localStorage.setItem('markersLocal', []))
      } else {
        JSON.parse(localStorage.getItem('markersLocal')).forEach((marker) => {
          L.marker(marker.coordinates)
            .addTo(currentMap)
            .bindTooltip(marker.title)

          mapStore.markers.push(marker)
        })
      }
    }

    const createMarker = (e) => {
      modalStore.openModal()
      let marker = {
        title: '',
        coordinates: [e.latlng.lat, e.latlng.lng],
      }

      mapStore.markers.push(marker)

      saveMarker()
    }

    const saveMarker = () => {
      const lastMarker = mapStore.markers[mapStore.markersLength - 1]
      lastMarker.title = mapStore.markerTitle

      if (mapStore.markersLength && mapStore.canAddMarker) {
        const newMarkerCoor = lastMarker.coordinates

        const markerTitle = mapStore.markers[mapStore.markersLength - 1].title
        L.marker(newMarkerCoor).addTo(currentMap).bindTooltip(markerTitle)

        mapStore.markerTitle = ''

        localStorage.setItem('markersLocal', JSON.stringify(mapStore.markers))
      }
    }

    const submitTheAddMarker = (e) => {
      mapStore.markers.push(e)
      const lastMarker = mapStore.markers[mapStore.markersLength - 1]

      if (mapStore.markersLength && mapStore.canAddMarker) {
        const newMarkerCoor = lastMarker.coordinates

        const markerTitle = mapStore.markers[mapStore.markersLength - 1].title
        L.marker(newMarkerCoor).addTo(currentMap).bindTooltip(markerTitle)

        localStorage.setItem('markersLocal', JSON.stringify(mapStore.markers))
      }
    }

    const closeModalWithoutSave = () => {
      mapStore.markers.pop()
    }

    return {
      mapStore,
      modalStore,
      markerModal,
      currentMap,
      createMarker,
      saveMarker,
      closeModalWithoutSave,
      submitTheAddMarker,
    }
  },
}
</script>

<style>
#mapid {
  margin-top: 40px;
  min-height: 600px;
  z-index: 1;
}
</style>
