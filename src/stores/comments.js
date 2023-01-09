import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([])
  const error = ref(null)

  const getComments = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      const data = await res.json()
      comments.value = data
    } catch (err) {
      error.value = err
      console.log(error.value)
    }
  }

  return {
    getComments,
    comments,
    error
  }
})
