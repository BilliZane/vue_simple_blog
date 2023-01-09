<template>
  <div class="post-datails">
    <div class="post-datails__title">{{ id }}. {{ currentPost[0].title }}</div>
    <div class="post-datails__body">{{ currentPost[0].body }}</div>
    <Table :emails="postEmails" :length="postEmaislLength" />
    <div class="post-datails__chart">
      <Chart
        :emails="postEmails"
        :length="postEmaislLength"
        labelText="Amount"
        chartColor="#f87979"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCommentsStore } from '../stores/comments'
import { usePostsStore } from '../stores/posts'
import Table from '../components/Table.vue'
import Chart from '../components/Chart.vue'

export default {
  props: ['id'],
  components: { Table, Chart },

  setup(props) {
    const postsStore = usePostsStore()
    const commentsStore = useCommentsStore()

    const currentPost = computed(() =>
      postsStore.posts.filter((post) => post.id === +props.id)
    )

    const postEmails = computed(() =>
      commentsStore.comments
        .filter((comment) => comment.postId === +props.id)
        .map((comment) => comment.email)
    )

    const postEmaislLength = computed(() =>
      commentsStore.comments
        .filter((comment) => comment.postId === +props.id)
        .map((comment) => comment.email.length)
    )

    return {
      postsStore,
      commentsStore,
      currentPost,
      postEmails,
      postEmaislLength,
    }
  },
}
</script>
