<template>
  <form class="search" @submit.prevent="postsStore.findPosts">
    <div class="search__wrap">
      <BaseIcon
        name="search"
        fill="#ffa900"
        stroke=""
        stroke-width="1.5"
        class="search__icon"
        @click="postsStore.findPosts"
      />
      <input
        type="text"
        placeholder="Find post by title"
        class="search__input"
        @input="postsStore.resetInput"
        v-model="postsStore.searchInput"
      />
    </div>
  </form>
</template>



<script>
import BaseIcon from './BaseIcon.vue'
import { usePostsStore } from '../stores/posts'
export default {
  components: { BaseIcon },

  setup() {
    const postsStore = usePostsStore()

    return {
      postsStore,
    }
  },
}
</script>
