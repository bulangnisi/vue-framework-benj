import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const languages = require.context('./languages', true, /\.js$/)

const messages = languages.keys().reduce((messages, path) => {
  const key = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = languages(path)
  messages[key] = value.default
  return messages
}, {})

console.log(messages)
// const lang = navigator.language || navigator.userLanguage

// create instance
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages // set message
})

export default i18n
