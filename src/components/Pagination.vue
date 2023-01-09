<template>
  <div
    class="pagination"
    v-if="postsStore.posts.length && !postsStore.areSearchUsed"
  >
    <div class="pagination__body">
      <div class="pagination__prev" @click="postsStore.paginatePrev">&lt;</div>
      <div
        :class="[
          'pagination__item',
          { 'pagination__item--active': idx === postsStore.currentElemIdx },
        ]"
        v-for="(item, idx) in postsStore.itemsAmount"
        :key="idx"
        @click="changeItem(idx)"
      >
        {{ idx + 1 }}
      </div>
      <div class="pagination__next" @click="postsStore.paginateNext">&gt;</div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '../stores/posts'

export default {
  setup() {
    const postsStore = usePostsStore()

    const changeItem = (idx) => {
      postsStore.currentElemIdx = idx
      postsStore.paginate(idx)
    }

    return {
      postsStore,
      changeItem,
    }
  },
}
</script>
