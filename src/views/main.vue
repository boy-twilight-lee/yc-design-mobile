<template>
  <div class="container">
    <yc-list
      :finished="current > 10"
      :loading="loading"
      finished-text="没有更多了"
      @load="fetchData"
    >
      <div v-for="item in data" :key="item">
        {{ item }}
      </div>
    </yc-list>
    <van-list
      :finished="current > 10"
      :loading="loading"
      finished-text="没有更多了"
      @load="fetchData"
    >
      <div v-for="item in data" :key="item">
        {{ item }}
      </div>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const visible = ref<boolean>(false);
const current = ref(1);
const data = reactive<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const loading = ref<boolean>(false);
const fetchData = () => {
  loading.value = true;
  window.setTimeout(() => {
    const index = data.length;
    data.push(
      ...[
        `Beijing Bytedance Technology Co., Ltd. ${index + 1}`,
        `Bytedance Technology Co., Ltd. ${index + 2}`,
        `Beijing Toutiao Technology Co., Ltd. ${index + 3}`,
        `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
        `China Beijing Bytedance Technology Co., Ltd. ${index + 5}`,
      ]
    );
    current.value += 1;
    loading.value = false;
  }, 100000);
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .yc-list,
  .van-list {
    height: 200px;
    width: 100%;
    overflow: auto;
    div {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      font-size: 14px;
    }
  }
}
</style>
