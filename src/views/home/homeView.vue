<template>
  <div class="home-content">
    <div>Hello</div>
    <div>
      欢迎来到我的个人网站<br />
      你可以通过这个网站来了解我的个人信息
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: rpx(20);

  div:nth-child(1) {
    border-radius: rpx(20);
    background-color: var(--text-color);
    color: var(--bg-color);
    font-size: rpx(180);
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: rpx(12);
    padding: rpx(10) rpx(100);
  }
  div:nth-child(2) {
    font-size: rpx(18);
    letter-spacing: rpx(2);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
