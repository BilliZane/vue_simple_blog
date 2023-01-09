import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const isMapOpen = ref(false)
  const baseLat = ref(48.5)
  const baseLng = ref(31.0)
  const markers = ref([])
  const markerTitle = ref('')
  const canAddMarker = ref(false)

  const markersLength = computed(() => markers.value.length)

  return {
    isMapOpen,
    markers,
    baseLat,
    baseLng,
    markersLength,
    markerTitle,
    canAddMarker
  }
})
