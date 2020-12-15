import LocalStorage from '@/common/localStorage'
import I18n from '@/i18n'
import { LOCALE } from '@/common/constant'
import Vue from 'vue'

const state = {
  loading: 0,
  locale: LocalStorage.get(LOCALE),
  testText: ''
}

const mutations = {
  INIT_APP() {
    console.timeEnd('app init')
  },
  SET_LOCALE(state, locale) {
    state.locale = locale
    I18n.locale = locale
    LocalStorage.set(LOCALE, locale)
  },
  SET_LOADING(state, count) {
    state.loading = count >= 0 ? count : 0
    if (state.loading > 0) {
      Vue.prototype.$loading.show()
    } else {
      Vue.prototype.$loading.hide()
    }
  },
  SET_TEST_TEXT(state, data) {
    state.testText = data
  }
}

const actions = {
  async init({ commit }) {
    console.time('app init')
    // init locale
    const locale = state.locale ?? (navigator.language ?? navigator.userLanguage ?? '').split('-')[0] ?? 'zh'
    commit('SET_LOCALE', locale)
    commit('INIT_APP', {})
  },
  setLocale({ commit }, locale) {
    commit('SET_LOCALE', locale)
  },
  setLoading({ commit, state }, count = 0) {
    const loadingCount = state.loading
    // console.log(state.loading)
    commit('SET_LOADING', loadingCount + count)
  },
  setTestText({ commit }, text) {
    commit('SET_TEST_TEXT', text)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
