import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// posts info
export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const error = ref(null)
  let postsLoaded = ref(false)

  const getPosts = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      posts.value = data

      postsLoaded.value = true
    } catch (err) {
      error.value = err
      console.log(error.value)
      postsLoaded.value = false
    }
  }

  //info for posts pagination
  const pagLength = computed(() => posts.value.length)
  const pagAmount = ref(10) // amount of posts per page
  const pagFrom = ref(0) // start element for pagination
  const currentElemIdx = ref(0)

  const itemsAmount = computed(() =>
    Math.ceil(pagLength.value / pagAmount.value)
  )

  const paginatedPosts = computed(() =>
    [...posts.value].splice(pagFrom.value, pagAmount.value)
  )

  const paginate = idx => {
    pagFrom.value = idx * pagAmount.value
    areSearchUsed.value = false
    findPostsAmount.value = 0
    searchInput.value = ''
    window.scrollTo(0, 0)
  }

  const paginatePrev = () => {
    if (pagFrom.value > 0) {
      pagFrom.value -= pagAmount.value
      currentElemIdx.value--
      areSearchUsed.value = false
      findPostsAmount.value = 0
      searchInput.value = ''
      window.scrollTo(0, 0)
    }
  }

  const paginateNext = () => {
    if (pagFrom.value < pagLength.value - pagAmount.value) {
      pagFrom.value += pagAmount.value
      currentElemIdx.value++
      areSearchUsed.value = false
      findPostsAmount.value = 0
      searchInput.value = ''
      window.scrollTo(0, 0)
    }
  }

  // search info
  const searchInput = ref('')
  const areSearchUsed = ref(false)
  const findPostsAmount = ref(0)

  const searchResults = computed(() => {
    if (searchInput.value) {
      return posts.value.filter(post => post.title.includes(searchInput.value))
    }
    return []
  })

  const findPosts = () => {
    if (searchInput.value.length) {
      areSearchUsed.value = true
      findPostsAmount.value = searchResults.value.length
    } else {
      areSearchUsed.value = false
    }
  }

  const resetInput = () => {
    if (!searchInput.value.length) {
      areSearchUsed.value = false
      findPostsAmount.value = searchResults.value.length
    } else {
      areSearchUsed.value = false
      findPostsAmount.value = 0
    }
  }

  return {
    getPosts,
    posts,
    error,
    postsLoaded,
    pagLength,
    pagAmount,
    pagFrom,
    itemsAmount,
    paginatedPosts,
    paginate,
    paginatePrev,
    paginateNext,
    currentElemIdx,
    searchInput,
    findPostsAmount,
    searchResults,
    areSearchUsed,
    findPosts,
    resetInput
  }
})
