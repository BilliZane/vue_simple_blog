import { ref } from 'vue'
import { defineStore } from 'pinia'

export const addMarkerModal = defineStore('addMarkerModal', () => {
  const isOpen = ref(false)
  const validateError = ref(false)

  const title = ref('')
  const latitude = ref(null)
  const longitude = ref(null)

  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)

  return {
    isOpen,
    validateError,
    title,
    latitude,
    longitude,
    close,
    open
  }
})
