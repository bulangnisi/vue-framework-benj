<template>
  <div class="container">
    <div>
      <span>store fields:</span>
      <span>{{ testText }}</span>
    </div>
    <div>
      localstorage fields:
      <span>{{ storageText }}</span>
    </div>
    <router-link to="/page1">Go to page1</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import localStorage from '@/common/localStorage'
export default {
  name: 'Page2',
  computed: {
    ...mapGetters(['testText']),
    storageText() {
      return localStorage.get('storageText')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: blue;
}
</style>
