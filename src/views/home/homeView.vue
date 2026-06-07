<template>
  <div class="home-content">
    <h1>TGWei</h1>
    <p>前端开发工程师</p>
    <p>你好，我是唐国威，欢迎来到我的个人网站</p>
    <p>我在找一份前端开发的工作，你可以通过这个网站来了解我的个人信息</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: rpx(50);
    letter-spacing: rpx(10);
    margin-bottom: rpx(5);
    font-weight: 700;
  }
  p {
    font-size: rpx(12);
    letter-spacing: rpx(3);
  }



  p:nth-of-type(2) {
    margin-top: rpx(30);
  }

   p:nth-of-type(n+2) {
    font-size: rpx(20);
  }



}
</style>
