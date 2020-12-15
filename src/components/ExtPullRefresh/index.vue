<template>
  <div ref="pullWrapper" class="pull-refresh" :style="{ height: pullHeight }">
    <div class="pull-info" :style="{ height: tipHeight }">
      <img
        v-if="status !== 2"
        src="./imgs/refresh_arrow.png"
        :style="{ transform: `rotate(${arrowDeg}deg)`, transition: transition }"
      />
      <img v-if="status === 2" src="./imgs/loading.gif" />
      <span>{{ tipText }}</span>
    </div>
    <div
      ref="pull"
      class="pull-con"
      :style="{ transform: `translateY(${moveY}px)`, transition: transition }"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PullRefresh',
  props: {
    refreshing: {
      type: Boolean,
      default: false
    },
    onRefresh: {
      type: Function,
      default: function () {}
    },
    tipHeight: {
      type: String,
      default: '50px'
    },
    pullHeight: {
      type: String,
      default: 'auto'
    },
    pullTip: {
      type: String,
      default: '下拉刷新'
    },
    releaseTip: {
      type: String,
      default: '松开刷新'
    },
    refreshTip: {
      type: String,
      default: '正在刷新'
    }
  },
  data() {
    return {
      clientY: 0,
      moveY: 0,
      disabled: false,
      arrowDeg: 0,
      transition: 'all 0.2s',
      status: 0
    }
  },
  computed: {
    getPullInfoHeight: function () {
      return parseFloat(getComputedStyle(document.querySelector('.pull-info')).height)
    },
    tipText() {
      return this.status === 0 ? this.pullTip : this.status === 1 ? this.releaseTip : this.refreshTip
    }
  },
  watch: {
    refreshing: function (nv, ov) {
      if (!nv && ov) {
        this.clientY = 0
        this.moveY = 0
        this.disabled = false
        this.arrowDeg = 0
        this.transition = 'all 0.2s'
      } else if (nv && !ov) {
        this.moveY = this.getPullInfoHeight
        this.disabled = true
        this.arrowDeg = 180
      }
    }
  },
  methods: {
    touchstart(e) {
      if (window.scrollY > 0) {
        this.disabled = true
      } else {
        this.transition = 'all 0s'
        this.clientY = e.touches[0].clientY
      }
    },
    touchmove(e) {
      const moveY = e.touches[0].clientY - this.clientY
      const infoHeight = this.getPullInfoHeight
      const maxRange = infoHeight * 2
      if (!this.disabled && moveY >= 0) {
        e.preventDefault()
        this.moveY = moveY
        this.moveY >= maxRange && (this.moveY = maxRange)
        this.arrowDeg = this.moveY >= infoHeight ? 180 : (this.moveY / infoHeight) * 180
      }
      if (this.moveY >= infoHeight) {
        this.status = 1
      } else {
        this.status = 0
      }
    },
    touchend() {
      const infoHeight = this.getPullInfoHeight
      this.transition = 'all 0.2s'
      if (this.moveY >= infoHeight) {
        this.moveY = infoHeight
        this.disabled = true
        this.status = 2
        this.onRefresh && this.onRefresh()
      } else {
        this.moveY = 0
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pull-refresh {
  position: relative;
  overflow-y: hidden;
}
.pull-refresh::-webkit-scrollbar {
  display: none;
}
.pull-con {
  height: 100%;
}
.pull-info {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
}
.pull-info img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.pull-info span {
  color: #333333;
  font-size: 14px;
  font-weight: bold;
}
</style>
