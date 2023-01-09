<template>
  <div class="modal">
    <form class="modal__wrap" @submit.prevent="saveToStore">
      <BaseIcon
        class="modal__close"
        name="close"
        fill="#ffa900"
        stroke="#fff"
        stroke-width="2"
        @click="closeModal"
      />
      <input
        type="text"
        class="modal__input"
        name="modalInput"
        placeholder="Marker's title"
        v-model="mapStore.markerTitle"
      />
      <div class="modal__info">
        <div class="modal__lat">
          lat:
          {{
            mapStore.markers[mapStore.markersLength - 1].coordinates[0].toFixed(
              6
            )
          }}
        </div>
        <div class="modal__lon">
          lon:
          {{
            mapStore.markers[mapStore.markersLength - 1].coordinates[1].toFixed(
              6
            )
          }}
        </div>
      </div>

      <button class="modal__btn" type="submit">Save marker</button>
      <div class="modal__error" v-if="modalStore.validateError">
        The marker title should not be empty
      </div>
    </form>
  </div>
</template>

<script>
import { useModalStore } from '../stores/modal'
import { useMapStore } from '../stores/map'
import BaseIcon from '../components/BaseIcon.vue'
import { onMounted, onBeforeUnmount } from 'vue'

export default {
  components: { BaseIcon },
  emits: ['saveToStore', 'closeModal'],
  setup(_, context) {
    const modalStore = useModalStore()
    const mapStore = useMapStore()

    const saveToStore = () => {
      if (mapStore.markerTitle.length === 0) {
        modalStore.validateError = true
      } else {
        context.emit('saveToStore')
        modalStore.closeModal()
        modalStore.validateError = false
      }
    }

    const closeModal = () => {
      context.emit('closeModal')
      modalStore.closeModal()
      mapStore.markerTitle = ''
    }

    onMounted(() => {
      mapStore.canAddMarker = true
      mapStore.markerTitle
    })

    onBeforeUnmount(() => {
      mapStore.canAddMarker = false
      modalStore.validateError = false
    })

    return {
      modalStore,
      mapStore,
      saveToStore,
      closeModal,
    }
  },
}
</script>
