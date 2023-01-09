<template>
  <main class="main">
    <div class="main__top">
      <div class="main__text" v-if="!postsStore.findPostsAmount">
        All posts:
      </div>
      <div class="main__text" v-else>
        Posts found: {{ postsStore.findPostsAmount }}
      </div>

      <div class="main__item">
        <Search />
      </div>
    </div>
    <Posts />
    <Pagination />
  </main>
</template>

<script>
import Search from '../components/Search.vue'
import Posts from './Posts.vue'
import Pagination from '../components/Pagination.vue'
import { usePostsStore } from '../stores/posts'
export default {
  components: { Search, Posts, Pagination },

  setup() {
    const postsStore = usePostsStore()

    return {
      postsStore,
    }
  },
}
</script>
