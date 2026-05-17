<template>
  <div class="home-view" @scroll="handleScroll">
    <div class="home-nav">
      <NavigationBar />
    </div>

    <div class="home-box-top-bottom">
      <!-- ✅ 1. 绑定 index，并传递 isScrolling 状态 -->
      <div class="home-box-top-bottom-item" v-for="(item, index) in data" :key="item.id">
        <BoxTopBottom :img="item.src" :number="index+1" :index="index" :is-scrolling="isScrolling" />
      </div>
    </div>
    <div class="home-Me">
      <p>TGW</p>
    </div>
    <div class="home-content">
      <h1>敬请期待</h1>
      <p>TGWei</p>
    </div>
    <PorousRock3DModel />
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import NavigationBar from '@/components/navigation-bar/NavigationBar.vue'
import BoxTopBottom from '@/components/BoxTopBottom.vue'
import PorousRock3DModel from '@/components/models-components/PorousRock3DModel.vue'

// ✅ 2. 定义滚动状态
const isScrolling = ref(false)
let scrollTimeout: number | null = null

// ✅ 3. 处理滚动事件
const handleScroll = () => {
  // 标记为正在滚动
  isScrolling.value = true

  // 清除之前的定时器
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  // 设置新的定时器：如果 150ms 内没有新的滚动事件，则认为停止
  scrollTimeout = window.setTimeout(() => {
    isScrolling.value = false
  }, 150)
}

const data = ref(
  Array.from({ length: 222 }, (_, i) => {
    const num = i + 1 // 生成 1 到 222 的序号
    return {
      id: num,
      // 注意：public 目录下的资源在运行时直接挂载在网站根路径，路径中不能写 '/public/'
      src: `/imgs/1 (${num}).jpg` 
    }
  })
)


</script>
  
<style scoped lang="scss">
.home-view {
  position: relative;
  height: 100vh; /* ✅ 改回 100vh，因为我们要监听这个容器的滚动 */
  overflow-y: auto;
  overflow-x: hidden;

  /* 隐藏滚动条样式保持不变 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .home-nav {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    width: 100%;
    pointer-events: none;
    color: #fff;
    mix-blend-mode: difference;
    z-index: 1000;


    > * {
      pointer-events: auto;
    }
  }

  .home-box-top-bottom {
    margin: rpx(100) auto;
    padding-top: rpx(50);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: rpx(80);
    width: 100%;
    /* 增加底部 padding，确保最后一行能滚上来 */
    padding-bottom: rpx(100);

    .home-box-top-bottom-item {
      height: rpx(250);
      width: rpx(230);
      /* 关键：保留 3D 空间以支持 transform */
      transform-style: preserve-3d;
      will-change: transform; /* 性能优化 */
    }
  }



  .home-Me {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: rpx(800);
    letter-spacing: rpx(10);
    font-weight: bold;
    z-index: 1;
    // background: #960d0d;
    // border: rpx(10) solid #072661;
  }

    .home-content {
    // position: fixed;
    position: relative;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    text-align: center;
    pointer-events: none;
    h1 {
      font-size: rpx(50);
      letter-spacing: rpx(10);
      margin-bottom: 20px;
    }
    p {
      font-size: rpx(25);
      letter-spacing: rpx(6);
    }
  }
}
</style>