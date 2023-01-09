<template>
  <div class="container">
    <TheHeader />
    <TheNav />
    <router-view />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
export default {
  components: { TheHeader, TheNav },
}
</script>
