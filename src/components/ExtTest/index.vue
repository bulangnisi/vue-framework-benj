<template>
  <div>Test Component</div>
</template>

<script>
// import { shuffle } from 'lodash'
export default {
  name: 'Test',
  computed: {
    fname() {
      const arr = [1, 2, 3]
      // return shuffle(arr)
      return arr
    }
  }
}
</script>
