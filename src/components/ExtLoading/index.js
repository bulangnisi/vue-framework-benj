import loading from './Loading.vue'
export default {
  install(Vue) {
    const Constructor = Vue.extend(loading)
    const instance = new Constructor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
    const methods = {
      show(message) {
        if (!instance.display) {
          instance.display = true
          if (message) {
            instance.message = message
          }
        }
      },
      hide() {
        instance.display = false
        setTimeout(() => {
          instance.message = null
        }, 300)
      },
      setMessage(message) {
        instance.message = message
      }
    }
    Vue.prototype.$loading = methods
  }
}
