<template>
  <div class="container">
    <div class="font-xx">输入文本</div>
    <ExtTest />
  </div>
</template>

<script>
import ExtTest from '@/components/ExtTest'
export default {
  name: 'Draw',
  components: {
    ExtTest
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0;
  padding-top: 5px;
  text-align: left;
  .font-xx {
    width: 120px;
    height: 22px;
    margin-top: 12px;
    margin-left: 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    color: #f25959;
    text-align: center;
  }
}
</style>
