<template>
  <div class="post">
    <div class="post__title">{{ post.id }}. {{ postTitleSnippet }}</div>
    <div class="post__body">{{ postBodySnippet }}</div>
    <div class="post__comments">
      <div class="post__comments-body">
        <div class="post__comments-item">
          Comments
          <span class="post__comments-amount">{{ commentsAmount }}</span>
        </div>
        <router-link
          class="post__comments-item post__comments-btn"
          :to="{ name: 'PostDetails', params: { id: post.id } }"
          >Read more</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from '../components/BaseIcon.vue'
import { useCommentsStore } from '../stores/comments'
import { computed } from 'vue'
export default {
  props: ['post'],
  components: { BaseIcon },

  setup(props) {
    const commentsStore = useCommentsStore()

    commentsStore.getComments()

    const commentsAmount = computed(
      () =>
        commentsStore.comments.filter(
          (comment) => comment.postId === props.post.id
        ).length
    )

    const postTitleSnippet = computed(
      () => props.post.title.substring(0, 50) + '...'
    )
    const postBodySnippet = computed(
      () => props.post.body.substring(0, 100) + '...'
    )

    return {
      commentsStore,
      commentsAmount,
      postTitleSnippet,
      postBodySnippet,
    }
  },
}
</script>
