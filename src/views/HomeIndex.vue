<template>
  <div id="homeView" class="home-view">
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
import NavigationBar from '@/components/navigation-bar/NavigationBar.vue'
import AboutView from '@/views/about/aboutView.vue'
import WorkView from '@/views/work/workView.vue'
import ContactView from '@/views/contact/contactView.vue'
import HomeView from './home/homeView.vue'
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

    > * {
      pointer-events: auto;
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
