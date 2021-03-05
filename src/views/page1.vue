<template>
  <ext-pull-refresh :refreshing="isRefresh" :on-refresh="onRefresh">
    <div class="container">
      <ExtTest />
      <input v-model="text" type="text" />
      <button @click="handleClick">set</button>
      <button @click="handleLocale">{{ locale }}</button>
      <button @click="handleToast">toast</button>
      <button @click="handleLoading">loading</button>
      <div class="vwtest">use vw unit</div>
      <div class="fonttest">
        <span class="fontrem">中文</span>
        <span class="fontrem">English</span>
        <span class="none">中文</span>
        <span class="none">English</span>
      </div>
      <div>
        store fields:
        <span>{{ testText }}</span>
      </div>
      <div>
        localstorage fields:
        <span>{{ storageText }}</span>
      </div>
      <div>
        i18n test:
        <span>{{ $t('la') }}</span>
      </div>
      <router-link to="/page2">Go to page2</router-link>
      <div v-for="item in list" :key="item">{{ item }}</div>
      <div></div>
    </div>
  </ext-pull-refresh>
</template>

<script>
import ExtPullRefresh from '@/components/ExtPullRefresh'
import { mapGetters } from 'vuex'
import { showToast } from '@/common/utils'
// import { set, get } from '@/common/localStorage'
import localStorage from '@/common/localStorage'
import ExtTest from '@/components/ExtTest'
export default {
  name: 'Page1',
  components: {
    ExtPullRefresh,
    ExtTest
  },
  data() {
    return {
      isRefresh: false,
      text: '',
      list: []
    }
  },
  computed: {
    ...mapGetters(['testText', 'locale']),
    storageText() {
      return localStorage.get('storageText')
    }
  },
  created() {
    console.log('page 1 created ')
    for (let i = 0; i < 100; i++) {
      this.list.push(i)
    }
  },
  methods: {
    onRefresh() {
      console.log('on refresh')
      this.isRefresh = true
      setTimeout(() => {
        this.isRefresh = false
        console.log(this)
      }, 1000)
    },
    handleLocale() {
      // console.log(this.$t('la'))
      // showToast()
      // console.log('change locale ', this.locale === 'zh' ? 'en' : 'zh')
      this.$store.dispatch('app/setLocale', this.locale === 'zh' ? 'en' : 'zh')
    },
    handleClick() {
      this.$store.dispatch('app/setTestText', this.text)
      localStorage.set('storageText', this.text)
    },
    handleToast() {
      // this.$toast('asdadadasasdadadasasdadadasasdadadasasdadadasasdadadasasdadadas')
      showToast()
    },
    handleLoading() {
      // this.$loading.setMessage('请求数据' + Date.now())
      this.$store.dispatch('app/setLoading', 1)
      this.$store.dispatch('app/setLoading', 1)
      this.$store.dispatch('app/setLoading', 1)
      /* eslint-disable-next-line */
      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
      /* eslint-disable-next-line */
      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 700)
      })
      /* eslint-disable-next-line */
      const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 900)
      })
      /* eslint-disable-next-line */
      p1.then(res => this.$store.dispatch("app/setLoading", -1));
      /* eslint-disable-next-line */
      p2.then(res => this.$store.dispatch("app/setLoading", -1));
      /* eslint-disable-next-line */
      p3.then(res => this.$store.dispatch("app/setLoading", -1));
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .fonttest {
    .fontrem {
      font-size: 16px;
    }
    .none {
      color: blue;
    }
  }
}
.vwtest {
  width: 10vw;
  height: 60px;
  background-color: red;
}
// 1rem = 12 px
</style>
