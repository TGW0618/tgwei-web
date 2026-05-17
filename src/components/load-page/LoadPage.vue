<template>
  <div class="load-wrap">
    <PorousRock3DModel />
    <!-- <div class="load-circle"></div> -->
    <p class="load-text">加载中...</p>
  </div>

</template>

<script setup lang="ts">
import PorousRock3DModel  from '@/components/models-components/PorousRock3DModel.vue'
</script>

<style scoped lang="scss">
.load-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg-color);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
//   transition: opacity 0.6s ease, visibility 0.6s ease;
}


.load-circle {
  width: rpx(1);
  height:  rpx(1);
  border: rpx(20) solid var(--text-color);
  border-top-color: var(--bg-color);
  border-bottom-color: var(--bg-color);
  border-radius: 50%;
  animation: spin 0.3s linear infinite;
  background-color: var(--text-color);
  box-shadow: 0 0 rpx(100) var(--text-color);
}

@keyframes spin {
  to { transform: rotate(360deg); }


}

.load-text {
  color: var(--text-color);
  margin-top: rpx(20);
  font-size: rpx(16);
  letter-spacing: rpx(2);
}
</style>