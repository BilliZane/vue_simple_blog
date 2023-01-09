<template>
  <div class="posts">
    <Loader v-if="!postsStore.postsLoaded" />
    <Post
      v-for="post in postsStore.searchResults"
      :key="post.id"
      :post="post"
      v-else-if="postsStore.areSearchUsed && postsStore.searchResults.length"
    />
    <Post
      v-for="post in postsStore.paginatedPosts"
      :key="post.id"
      :post="post"
      v-else
    />
  </div>
</template>

<script>
import Post from './Post.vue'
import Loader from './Loader.vue'
import { usePostsStore } from '../stores/posts'

export default {
  components: { Post, Loader },

  setup() {
    const postsStore = usePostsStore()

    postsStore.getPosts()

    return {
      postsStore,
    }
  },
}
</script>
