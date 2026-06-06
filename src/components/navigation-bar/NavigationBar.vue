<template>
  <div class="nav">
    <!-- 点击触发 scrollToSection 方法，传入对应的 ID -->
    <div @click="scrollToSection('section-home')">TGWei</div>
    <div @click="scrollToSection('section-work')">作品</div>
    <div @click="scrollToSection('section-about')">关于</div>
    <div @click="scrollToSection('section-contact')">联系</div>
  </div>
</template>

<script setup lang="ts">
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    // 使用 scrollIntoView 实现平滑滚动
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start' // 将元素顶部与视口顶部对齐
    })
  }
}
</script>

<style scoped lang="scss">
.nav {
  // display: flex;
  // justify-content: space-around;
  // align-items: center;

  display: flex;
  flex-direction: column;
  align-items: flex-start;


  gap: rpx(18);
  font-size: rpx(16);
  letter-spacing: rpx(5);
  position: relative; 

  div {
    padding: rpx(0) rpx(20);
    position: relative;
    cursor: pointer;
    transition: opacity 0.3s ease;
    
    // 增加点击反馈
    &:active {
      opacity: 0.7;
      transition: opacity 0.1s ease;
    }
  }

  div:nth-child(1) {
    font-size: rpx(18);
    font-weight: bold;
  }

  div::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: rpx(-5);
    width: 0;
    height: rpx(1);
    background-color: #ffffff;
    transition: width 0.3s ease;
  }

  div:hover::after {
    width: 100%;
  }
}
</style>