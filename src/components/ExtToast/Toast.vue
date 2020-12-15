<template>
  <transition name="fade">
    <div v-show="display" class="ext-toast-wrapper">
      <div class="ext-toast">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ExtToast',
  data() {
    return {
      message: null,
      duration: 1500,
      display: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-toast-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  text-align: center;
}
.ext-toast {
  position: relative;
  top: 30%;
  width: 60%;
  padding: 16px;
  margin: 0 auto;
  color: white;
  z-index: 1100;
  text-align: center;
  background-color: #000000b0;
  border-radius: 8px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
