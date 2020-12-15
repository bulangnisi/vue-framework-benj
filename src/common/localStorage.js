import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

const appKey = 'app'

const appNameSpace = process.env.VUE_APP_NAME_SPACE

// register localstorage
Vue.use(VueLocalStorage, {
  name: 'ls'
})

// set namespace
Vue.prototype.$ls.namespace = appNameSpace

// set root property
Vue.prototype.$ls.addProperty(appKey, Object)

function _getApp() {
  return Vue.prototype.$ls.get(appKey)
}

function _setApp(data) {
  Vue.prototype.$ls.set(appKey, data)
}

export default {
  set(key, value) {
    const app = _getApp()
    app[key] = value
    _setApp(app)
  },
  get(key) {
    const app = _getApp()
    return app[key]
  },
  remove(key) {
    const app = _getApp()
    app[key] = undefined
    _setApp(app)
  },
  clear() {
    Vue.prototype.$ls.remove('app')
  }
}
