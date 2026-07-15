<template>
  <div class="nav">
  <div @click="scrollToSection(item.id)" v-for="item in dataList" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSound } from '@/util/sound/useMouseCilckSound.ts'

const { play } = useSound()

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)

  play()

  if (element) {
    // 使用 scrollIntoView 实现平滑滚动
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // 将元素顶部与视口顶部对齐
    })
  }
}


const dataList = [
  {
    id: 'section-home',
    title: 'TGWei',
  },
  {
    id: 'section-work',
    title: '作品',
  },
  {
    id: 'section-about',
    title: '关于',
  },
  {
    id: 'section-contact',
    title: '联系',
  },
  {
    id: 'section-other',
    title: '其他',
  }
]

</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;

  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;

  gap: rpx(18);
  font-size: rpx(16);
  letter-spacing: rpx(3);
  position: relative;
  background-color: #f5f5f50a;
  height: rpx(60);
  padding: rpx(0) rpx(20);
  border-radius: rpx(8);
  // 磨砂玻璃效果
  backdrop-filter: blur(rpx(15));
  -webkit-backdrop-filter: blur(rpx(15));
  box-shadow: 0 rpx(5) rpx(15) rgba(0, 0, 0, 0.01);
  color: var(--text-color);

  div {
    padding: rpx(0) rpx(20);
    position: relative;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:active {
      opacity: 0.7;
      transition: opacity 0.1s ease;
    }
  }

  div:nth-child(1) {
    font-size: rpx(24);
    font-weight: bold;
    background-color: var(--number-text-color);
    color: var(--bg-color);
    height: rpx(38);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: rpx(4);
  }

  div:nth-child(n + 2):after {
    content: '';
    position: absolute;
    left: 0;
    bottom: rpx(-5);
    width: 0;
    height: rpx(1);
    background-color: #f5f5f5;
    transition: width 0.3s ease;
  }

  div:hover::after {
    width: 100%;
  }
}
</style>
