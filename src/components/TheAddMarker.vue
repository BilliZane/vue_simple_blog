<template>
  <div class="add-marker-modal">
    <form class="add-marker-modal__wrap" @submit.prevent="submitHandler">
      <BaseIcon
        class="add-marker-modal__close"
        name="close"
        fill="#ffa900"
        stroke="#fff"
        stroke-width="2"
        @click="closeModal"
      />
      <input
        type="text"
        class="add-marker-modal__input"
        name="add-marker-modalInput"
        placeholder="Marker's title"
        v-model="markerModal.title"
      />
      <input
        type="number"
        step="0.0000000001"
        class="add-marker-modal__input"
        name="add-marker-modalInput"
        placeholder="Marker's latitude"
        v-model="markerModal.latitude"
      />
      <input
        type="number"
        step="0.0000000001"
        class="add-marker-modal__input"
        name="add-marker-modalInput"
        placeholder="Marker's longitude"
        v-model="markerModal.longitude"
      />

      <button class="add-marker-modal__btn" type="submit">Save marker</button>
      <div class="add-marker-modal__error" v-if="markerModal.validateError">
        Inputs should not be empty
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import BaseIcon from '../components/BaseIcon.vue'
import { addMarkerModal } from '../stores/addMarkerModal'
import { useMapStore } from '../stores/map'

export default {
  emits: ['addMarkerSubmit'],
  components: { BaseIcon },

  setup(_, context) {
    const markerModal = addMarkerModal()
    const mapStore = useMapStore()

    const closeModal = () => {
      markerModal.close()
    }

    const submitHandler = () => {
      if (markerModal.title && markerModal.latitude && markerModal.longitude) {
        context.emit('addMarkerSubmit', {
          title: markerModal.title,
          coordinates: [markerModal.latitude, markerModal.longitude],
        })
        markerModal.close()
      } else {
        markerModal.validateError = true
      }
    }

    onBeforeUnmount(() => {
      markerModal.title = ''
      markerModal.latitude = null
      markerModal.longitude = null
      mapStore.canAddMarker = false
    })

    onMounted(() => {
      mapStore.canAddMarker = true
    })

    return {
      markerModal,
      mapStore,
      closeModal,
      submitHandler,
    }
  },
}
</script>
