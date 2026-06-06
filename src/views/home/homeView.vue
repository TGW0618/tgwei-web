<template>
  <!-- 首屏加载页面 -->
  <div>
    <LoadPage v-if="isLoading" :images="data" @loaded="handleLoaded" />
  </div>

  <div id="homeView" class="home-view">
    <div class="home-nav">
      <!-- 传递滚动方法或让导航栏内部处理，这里我们让导航栏直接操作 DOM 或通过事件通信 -->
      <!-- 更简单的做法：导航栏只负责发射事件，或者直接在导航栏里写死 ID 进行滚动 -->
      <NavigationBar />
    </div>

    <!-- 1. 首页 -->
    <div id="section-home" class="section-container home-box-top-bottom-wrapper">
      <div class="home-box-top-bottom">
        <div class="home-box-top-bottom-item" v-for="(item, index) in data" :key="item.id">
          <BoxTopBottom
            :img="item.src"
            :number="index + 1"
            :index="index"
            :is-scrolling="isScrolling"
          />
        </div>
      </div>
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
    <div id="section-footer" class="section-container home-content">
      <h1>敬请期待</h1>
      <p>TGWei</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavigationBar from '@/components/navigation-bar/NavigationBar.vue'
import BoxTopBottom from '@/components/BoxTopBottom.vue'
import LoadPage from '@/components/load-page/LoadPage.vue'
import AboutView from '@/views/about/aboutView.vue'
import WorkView from '@/views/work/workView.vue'
import ContactView from '@/views/contact/contactView.vue'

const isScrolling = ref(false)


const isLoading = ref(true)

const handleLoaded = () => {
  isLoading.value = false
}

// 生成随机不重复序号的工具函数
const generateRandomIds = (total: number, count: number): number[] => {
  const ids = Array.from({ length: total }, (_, i) => i + 1)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids.slice(0, count)
}

const data = ref(
  generateRandomIds(222, 30).map((num) => ({
    id: num,
    src: `/imgs/1 (${num}).jpg`,
  })),
)

onMounted(async () => {
  console.log('Start preloading images...')
})
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
    // justify-content: center;
    // align-items: center;

    justify-content: flex-start;
    align-items: center;
    top: 80%;
    width: 100%;
    pointer-events: none;
    color: #fff;
    mix-blend-mode: difference;
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

  .home-box-top-bottom-wrapper {
    /* 首页图片墙可能不需要 min-height: 100vh，视内容而定，但为了锚点对齐建议保留或调整 */
    min-height: auto; 
    padding-top: rpx(50);
  }

  .home-box-top-bottom {
    margin: rpx(100) auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: rpx(80);
    width: 100%;
    padding-bottom: rpx(100);

    .home-box-top-bottom-item {
      height: rpx(250);
      width: rpx(230);
      transform-style: preserve-3d;
      will-change: transform;
    }
  }

  .full-screen-section {
    background-color: transparent; /* 可根据需要设置背景色区分板块 */
  }

  .home-content {
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