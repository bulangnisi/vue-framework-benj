import toast from './Toast.vue'
export default {
  /*
   * Vue:Vue 构造器
   * options:可选插件参数
   */
  install(Vue, options) {
    /*
     *Vue.extend： https://cn.vuejs.org/v2/api/#Vue-extend
     *使用基础 Vue.extend 构造器，创建一个“子类” (Loading)。参数是一个包含组件选项的对象(toast)。
     *然后 创建一个 Loading 的实例 Profile 挂载到一个HTMLElement实例上
     */
    const Constructor = Vue.extend(toast)
    const instance = new Constructor({
      el: document.createElement('div')
    })

    /*
     *el： https://cn.vuejs.org/v2/api/#el
     *loading.vue中的template模板内容将会替换挂载的元素。挂载元素的内容都将被忽略。 *所以Profile.$el最终是template里面的内容
     */

    // insert document.body
    document.body.appendChild(instance.$el)

    // set options
    if (options) {
      if (options.duration) {
        instance.duration = options.duration
      }
    }

    // duration timer
    let timer = null
    // mount
    Vue.prototype.$toast = (message) => {
      instance.display = true
      if (message) {
        instance.message = message
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        instance.display = false
      }, instance.duration)
    }
  }
}
