<template>
<!-- 首屏加载页面 -->
  <div 
    class="loading-container" 
    :class="{ 'is-hidden': !isLoading }"
  >
    <LoadPage />
  </div>
  <div id="homeView" class="home-view" @scroll="handleScroll">
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
import { ref,onMounted } from 'vue'
import NavigationBar from '@/components/navigation-bar/NavigationBar.vue'
import BoxTopBottom from '@/components/BoxTopBottom.vue'
import PorousRock3DModel from '@/components/models-components/PorousRock3DModel.vue'
import LoadPage from '@/components/load-page/LoadPage.vue'




const isScrolling = ref(false)
let scrollTimeout: number | null = null

const isLoading = ref(true)

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

// 图片预加载函数
const preloadImages = async (imageList: { src: string }[], limit: number = 20) => {
  // 策略：只预加载前 N 张图片，或者全部加载但设置超时
  // 这里我们尝试加载前 20 张作为“首屏关键资源”，其余后台加载
  // 如果你希望所有图片都加载完，去掉 slice 即可，但建议增加超时控制
  
  const targets = imageList.slice(0, limit) 
  
  const promises = targets.map((item) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.src = item.src
      
      // 加载成功
      img.onload = () => resolve()
      
      // 加载失败也 resolve，避免一张图坏了卡死整个页面
      img.onerror = () => {
        console.warn(`Failed to load: ${item.src}`)
        resolve() 
      }
      
      // 超时保护：每张图最多等 3 秒
      setTimeout(() => resolve(), 3000)
    })
  })

  // 等待所有关键图片处理完毕
  await Promise.all(promises)
}


onMounted(async () => {
  // 先显示加载页，然后开始加载图片
  console.log('Start preloading images...')
  
  // 可选：给一个最小加载时间，避免闪屏（例如至少显示 500ms）
  const minLoadTime = new Promise(resolve => setTimeout(resolve, 800))
  
  // 并行执行：预加载图片 和 最小等待时间
  await Promise.all([
    preloadImages(data.value, 30), // 预加载前30张图，数量可根据需求调整
    minLoadTime
  ])
  
  console.log('Images loaded, hiding loader.')
  isLoading.value = false
})

</script>
  
<style scoped lang="scss">

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  // pointer-events: none; /* 隐藏后允许点击下方内容 */
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: 1;
  visibility: visible;

  &.is-hidden {
    opacity: 0;
    visibility: hidden;
  }
}

.home-view {
  position: relative;
  height: 100vh; 
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