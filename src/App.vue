<template>
  <div id="app">
    <transition :name="routeTransition">
      <keep-alive>
        <router-view class="router-view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      routeTransition: null
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index !== undefined && from.meta.index !== undefined) {
        if (to.meta.index > from.meta.index) {
          this.routeTransition = 'slide-right'
        } else if (to.meta.index < from.meta.index) {
          this.routeTransition = 'slide-left'
        } else {
          this.routeTransition = ''
        }
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
