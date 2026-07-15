<template>
  <div id="homeView" class="home-view">
    <!-- <div class="home-nav" :class="{ 'home-nav--hidden': !navVisible }">
      <NavigationBar />
    </div> -->
    <div class="home-nav">
      <NavigationBar />
    </div>

    <!-- 1. 首页 -->
    <div id="section-home" class="section-container full-screen-section">
      <HomeView />
    </div>

    <!-- 2. 作品页  -->
    <div id="section-work" class="section-container full-screen-section">
      <WorkView />
    </div>

    <!-- 3. 关于页 -->
    <div id="section-about" class="section-container full-screen-section">
      <AboutView />
    </div>

    <!-- 4. 联系页 -->
    <div id="section-contact" class="section-container full-screen-section">
      <ContactView />
    </div>

    <!-- 待开发页/底部 -->
    <div id="section-other" class="section-container home-content">
      <h1>敬请期待</h1>
      <p>TGWei</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, onMounted, onUnmounted } from 'vue'
import NavigationBar from '@/components/navigation-bar/NavigationBar.vue'
import AboutView from '@/views/about/aboutView.vue'
import WorkView from '@/views/work/workView.vue'
import ContactView from '@/views/contact/contactView.vue'
import HomeView from './home/homeView.vue'

// const navVisible = ref(true)
// let lastScrollTop = 0

// const handleScroll = () => {
//   const container = document.getElementById('homeView')
//   if (!container) return

//   const scrollTop = container.scrollTop

//   if (scrollTop > lastScrollTop && scrollTop > 80) {
//     // 向下滚动 → 隐藏
//     navVisible.value = false
//   } else {
//     // 向上滚动 → 显示
//     navVisible.value = true
//   }

//   lastScrollTop = scrollTop
// }

// onMounted(() => {
//   const container = document.getElementById('homeView')
//   if (container) {
//     container.addEventListener('scroll', handleScroll, { passive: true })
//   }
// })

// onUnmounted(() => {
//   const container = document.getElementById('homeView')
//   if (container) {
//     container.removeEventListener('scroll', handleScroll)
//   }
// })
</script>

<style scoped lang="scss">
.home-view {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth; /* 关键：启用 CSS 平滑滚动 */

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

    // justify-content: flex-start;
    // align-items: center;
    top: 3%;
    width: 100%;
    pointer-events: none;
    color: #fff;
    // 色差混合模式
    // mix-blend-mode: difference;
    z-index: 1000;
    // background-color: #ff000013;

    transform: translateY(0);
    transition: transform 0.3s ease;

    > * {
      pointer-events: auto;
    }

    &--hidden {
      transform: translateY(calc(-100% - rpx(40)));
      pointer-events: none;
    }
  }

  /* 通用区块样式 */
  .section-container {
    min-height: 100vh; /* 确保每个板块至少占满一屏，方便锚点定位 */

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding: rpx(100) 0;
    box-sizing: border-box;
  }

  .full-screen-section {
    background-color: transparent; /* 可根据需要设置背景色区分板块 */
  }
}
</style>
