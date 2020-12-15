import Vue from 'vue'
import fileDownload from 'js-file-download'

export function download(res) {
  try {
    const filename = res.headers['content-disposition'].split(';')[1].split('=')[1]
    fileDownload(res.data, decodeURI(filename))
  } catch (err) {
    console.error('download file error ', err)
  }
}

export function showToast() {
  // console.log(Vue.prototype.$t)
  // Vue.prototype.$t('阿里')
  console.log(Vue.prototype.$t('la'))
}
