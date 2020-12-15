const getters = {
  loading: (state) => state.app.state,
  testText: (state) => state.app.testText,
  locale: (state) => state.app.locale
}
export default getters
