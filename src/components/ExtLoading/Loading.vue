<template>
  <transition name="fade">
    <div v-show="display" class="ext-loading-wrapper">
      <img class="ext-loading" src="./imgs/loading.png" />
      <span class="ext-loading-message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ExtLoading',
  data() {
    return {
      message: null,
      display: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  background-color: #000000b0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.ext-loading {
  width: 64px;
  height: 64px;
  animation: load 1.5s infinite linear;
}
.ext-loading-message {
  margin-top: 16px;
  color: white;
}
@keyframes load {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
