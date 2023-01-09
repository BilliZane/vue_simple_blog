<template>
  <div class="table">
    <div class="table__title">Amount of characters in email comments</div>
    <div class="table__wrap">
      <div class="table__col">
        <div class="table__caption">Email</div>
        <div v-for="(email, idx) in emails" :key="idx" class="table__row">
          {{ email }}
        </div>
      </div>
      <div class="table__col">
        <div class="table__caption">Number of characters</div>
        <div class="table__row" v-for="(length, idx) in length" :key="idx">
          {{ length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['emails', 'length'],
}
</script>
