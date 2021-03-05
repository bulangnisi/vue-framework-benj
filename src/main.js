import Vue from 'vue'
// a modern alternative to CSS resets
import 'normalize.css/normalize.css'
// global css
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/localStorage'
import i18n from './i18n'
import ExtToast from '@/components/ExtToast'
import ExtLoading from '@/components/ExtLoading'

// console.log('version ', process.env)
// ;(function fiexible(window, document) {
//   var docEl = document.documentElement
//   var dpr = window.devicePixelRatio || 1

//   // adjust body font size
//   function setBodyFontSize() {
//     console.log('set body font size')
//     if (document.body) {
//       document.body.style.fontSize = 12 * dpr + 'px'
//     } else {
//       document.addEventListener('DOMContentLoaded', setBodyFontSize)
//     }
//   }

//   setBodyFontSize()

//   function setRemUnit() {
//     console.log('set rem unit')
//     var rem = docEl.clientWidth / 10
//     docEl.style.fontSize = rem + 'px'
//   }

//   setRemUnit()

//   // reset rem unit on page resize
//   window.addEventListener('resize', setRemUnit)
//   window.addEventListener('pageshow', function (e) {
//     if (e.persisted) {
//       setRemUnit()
//     }
//   })
// })(window, document)

// register toast
Vue.use(ExtToast)

// register loading
Vue.use(ExtLoading)

// hack i18n use in js
Vue.prototype.$t = (key, value) => i18n.t(key, value)

Vue.config.productionTip = false

Promise.all([store.dispatch('app/init')]).then(() => {
  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App)
  }).$mount('#app')
})
