import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const validateError = ref(false)

  const closeModal = () => (isOpen.value = false)
  const openModal = () => (isOpen.value = true)

  return {
    isOpen,
    closeModal,
    openModal,
    validateError
  }
})
