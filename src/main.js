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
