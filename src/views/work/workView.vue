<template>
  <div class="work-view">
    <!-- 顶部标签 -->
    <div class="work-header">
      <!-- <span class="work-label">作品</span>
      <span class="work-divider">/</span>
      <span class="work-subtitle">Selected Works</span> -->
    </div>

    <!-- 项目网格轮播 -->
    <div class="work-carousel">
      <!-- 左箭头 -->
      <button
        class="carousel-arrow carousel-arrow--left"
        :class="{ 'is-disabled': currentPage === 0 }"
        @click="prevPage"
        aria-label="上一页"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- 轮播视口 -->
      <div class="carousel-viewport">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentPage * 100}%)` }"
        >
          <div
            v-for="(page, pageIndex) in pages"
            :key="pageIndex"
            class="carousel-page"
          >
            <div class="work-grid">
              <div
                v-for="(project, index) in page.projects"
                :key="page.startIndex + index"
                class="project-card"
                @mouseenter="hoveredIndex = page.startIndex + index"
                @mouseleave="hoveredIndex = null"
                @click="openDetail(page.startIndex + index)"
              >
                <div class="card-visual">
                  <img
                    :src="project.cover"
                    :alt="project.name"
                    loading="lazy"
                    class="card-image"
                  />
                  <div class="card-overlay" :class="{ 'is-active': hoveredIndex === page.startIndex + index }">
                    <div class="overlay-number">{{ String(page.startIndex + index + 1).padStart(2, '0') }}</div>
                    <div class="overlay-desc">{{ project.description }}</div>
                  </div>
                </div>
                <div class="card-meta">
                  <span class="meta-index">{{ String(page.startIndex + index + 1).padStart(2, '0') }}</span>
                  <span class="meta-name">{{ project.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右箭头 -->
      <button
        class="carousel-arrow carousel-arrow--right"
        :class="{ 'is-disabled': currentPage >= totalPages - 1 }"
        @click="nextPage"
        aria-label="下一页"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <!-- 页码指示器 -->
      <div v-if="totalPages > 1" class="carousel-dots">
        <button
          v-for="(_, i) in totalPages"
          :key="i"
          class="carousel-dot"
          :class="{ 'is-active': currentPage === i }"
          @click="currentPage = i"
          :aria-label="`第${i + 1}页`"
        />
      </div>
    </div>

    <!-- 项目详情弹窗 -->
    <Teleport to="body">
      <Transition name="detail">
        <div
          v-if="detailVisible"
          class="detail-overlay"
          @click.self="closeDetail"
        >
          <div class="detail-panel">
            <!-- 关闭按钮 -->
            <button class="detail-close" @click="closeDetail" aria-label="关闭">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <!-- 项目信息 -->
            <div class="detail-info">
              <div class="detail-number">{{ String((activeIndex ?? 0) + 1).padStart(2, '0') }}</div>
              <h2 class="detail-title">{{ activeProject?.name }}</h2>
              <p class="detail-desc">{{ activeProject?.description }}</p>
              <p class="detail-link" v-if="activeProject?.link">项目链接：<a :href="activeProject?.link" target="_blank" rel="noopener noreferrer">点击查看</a></p>
            </div>

            <!-- 图片画廊 -->
            <div class="detail-gallery">
              <div
                v-for="(img, i) in activeProject?.images"
                :key="i"
                class="gallery-item"
              >
                <img :src="img" loading="lazy" :alt="`${activeProject?.name} - ${i + 1}`" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// --- 项目数据 ---
interface Project {
  name: string
  description: string
  folder: string
  cover: string
  images: string[]
  link?: string
}

const projects: Project[] = [

   {
    name: '宠物护理平台B端',
    description: '宠物护理管理平台B端',
    folder: '宠物护理平台B端',
    cover: '/imgs/宠物护理平台/总览.png',
    images: [
      '/imgs/宠物护理平台/总览.png',
      '/imgs/宠物护理平台/一级泵站.png',
      '/imgs/宠物护理平台/输水统计.png',
      '/imgs/宠物护理平台/应急动态.png',
    ],
    link: 'https://github.com/TGW0618/Heartwarming-Pet-Care-Network.git',
  },
     {
    name: '宠物护理平台C端',
    description: '宠物护理管理平台C端',
    folder: '宠物护理平台C端',
    cover: '/imgs/宠物护理平台/总览.png',
    images: [
      '/imgs/宠物护理平台/总览.png',
      '/imgs/宠物护理平台/一级泵站.png',
      '/imgs/宠物护理平台/输水统计.png',
      '/imgs/宠物护理平台/应急动态.png',
    ],
    link: 'https://github.com/TGW0618/Heartwarming-Pet-Care-Network.git',
  },
  {
    name: '数字厂房态势大屏系统',
    description: '工业数字孪生大屏可视化',
    folder: '数字厂房态势大屏系统',
    cover: '/imgs/数字厂房态势大屏系统/1.png',
    images: [
      '/imgs/数字厂房态势大屏系统/1.png',
      '/imgs/数字厂房态势大屏系统/1-2.png',
      '/imgs/数字厂房态势大屏系统/2-1.png',
      '/imgs/数字厂房态势大屏系统/3-1.png',
      '/imgs/数字厂房态势大屏系统/4-1.png',
    ],
  },
  {
    name: '水厂数字孪生模拟仿真平台',
    description: '自来水厂数字孪生仿真平台',
    folder: '水厂数字孪生模拟仿真平台',
    cover: '/imgs/水厂数字孪生模拟仿真平台/总览.png',
    images: [
      '/imgs/水厂数字孪生模拟仿真平台/总览.png',
      '/imgs/水厂数字孪生模拟仿真平台/安防管理.png',
      '/imgs/水厂数字孪生模拟仿真平台/能耗管理.png',
      '/imgs/水厂数字孪生模拟仿真平台/设备健康.png',
    ],
  },
  {
    name: '灌域工程数字孪生平台',
    description: '灌域工程数字孪生管理平台',
    folder: '灌域工程数字孪生平台',
    cover: '/imgs/灌域工程数字孪生平台/总览.png',
    images: [
      '/imgs/灌域工程数字孪生平台/总览.png',
      '/imgs/灌域工程数字孪生平台/1.png',
      '/imgs/灌域工程数字孪生平台/2.png',
      '/imgs/灌域工程数字孪生平台/3.png',
    ],
  },
  {
    name: '知识库管理平台',
    description: '企业知识库管理与协作平台',
    folder: '知识库管理平台',
    cover: '/imgs/知识库管理平台/Snipaste_2026-01-27_16-24-40.png',
    images: [
      '/imgs/知识库管理平台/Snipaste_2026-01-27_16-24-40.png',
      '/imgs/知识库管理平台/Snipaste_2026-01-27_16-25-10.png',
      '/imgs/知识库管理平台/Snipaste_2026-01-27_16-26-06.png',
      '/imgs/知识库管理平台/Snipaste_2026-01-27_16-27-49.png',
    ],
  },
   {
    name: '调水工程数字孪生平台',
    description: '调水工程数字孪生仿真平台',
    folder: '调水工程数字孪生平台',
    cover: '/imgs/调水工程数字孪生平台/总览界面.png',
    images: [
      '/imgs/调水工程数字孪生平台/总览界面.png',
      '/imgs/调水工程数字孪生平台/一级泵站.png',
      '/imgs/调水工程数字孪生平台/输水统计.png',
      '/imgs/调水工程数字孪生平台/应急动态.png',
    ],
  },
  {
    name: '竖井运行监测调度系统',
    description: '竖井运行监测与智能调度',
    folder: '竖井运行监测调度系统',
    cover: '/imgs/竖井运行监测调度系统/图片1.png',
    images: [
      '/imgs/竖井运行监测调度系统/图片1.png',
    ],
  },


]

// --- 轮播状态 ---
const projectsPerPage = 6 // 2行 × 3列
const currentPage = ref(0)
const totalPages = computed(() => Math.ceil(projects.length / projectsPerPage))

const pages = computed(() => {
  const result: { projects: Project[]; startIndex: number }[] = []
  for (let i = 0; i < projects.length; i += projectsPerPage) {
    result.push({
      projects: projects.slice(i, i + projectsPerPage),
      startIndex: i,
    })
  }
  return result
})

function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}

// --- 交互状态 ---
const hoveredIndex = ref<number | null>(null)
const activeIndex = ref<number | null>(null)
const detailVisible = ref(false)

const activeProject = computed(() => {
  if (activeIndex.value === null) return null
  return projects[activeIndex.value] ?? null
})

function openDetail(index: number) {
  activeIndex.value = index
  detailVisible.value = true
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'
}

function closeDetail() {
  detailVisible.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped lang="scss">


.work-view {
  width: 85vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: rpx(40);
  padding: rpx(40) rpx(0);
  user-select: none;
}

/* ---- 顶部标签 ---- */
.work-header {
  display: flex;
  align-items: baseline;
  gap: rpx(12);
  padding-left: rpx(4);

  .work-label {
    font-size: rpx(14);
    font-weight: 500;
    letter-spacing: rpx(4);
    color: var(--text-color);
  }

  .work-divider {
    font-size: rpx(12);
    color: var(--component-text-color);
    margin: 0 rpx(4);
  }

  .work-subtitle {
    font-size: rpx(12);
    letter-spacing: rpx(2);
    color: var(--component-text-color);
    text-transform: uppercase;
  }
}

/* ---- 轮播容器 ---- */
.work-carousel {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
}

/* 轮播视口 */
.carousel-viewport {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

/* 轮播轨道 */
.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* 每一页 */
.carousel-page {
  min-width: 100%;
  height: 100%;
}

/* ---- 项目网格 ---- */
.work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: rpx(16);
  height: 100%;
}

/* ---- 左右箭头 ---- */
.carousel-arrow {
  position: absolute;
  top: 48%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: rpx(36);
  height: rpx(36);
  border: none;
  border-radius: rpx(4);
  background: rgb(0, 0, 0);
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    opacity 0.3s ease;

  &:hover:not(.is-disabled) {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  &.is-disabled {
    opacity: 0.2;
    cursor: default;
  }

  &--left {
    left: rpx(-120);
  }

  &--right {
    right: rpx(-120);
  }
}

/* ---- 页码指示器 ---- */
.carousel-dots {
  position: absolute;
  bottom: rpx(-32);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: rpx(8);
}

.carousel-dot {
  width: rpx(6);
  height: rpx(6);
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 0;
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &.is-active {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.3);
  }

  &:hover:not(.is-active) {
    background: rgba(255, 255, 255, 0.4);
  }
}

/* ---- 项目卡片 ---- */
.project-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: rpx(12);

  .card-visual {
    position: relative;
    flex: 1;
    overflow: hidden;
    background-color: var(--component-bg-color);
    border-radius: rpx(4);
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%) brightness(0.92);
      transition:
        filter 0.6s cubic-bezier(0.25, 0.1, 0.25, 1),
        transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    // 悬停遮罩层
    .card-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: rpx(24);
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.55) 0%,
        rgba(0, 0, 0, 0.15) 40%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);

      &.is-active {
        opacity: 1;
      }

      .overlay-number {
        font-size: rpx(48);
        font-weight: 300;
        color: #fff;
        letter-spacing: rpx(2);
        line-height: 1;
        margin-bottom: rpx(8);
      }

      .overlay-desc {
        font-size: rpx(12);
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: rpx(1);
      }
    }
  }

  // 悬停时卡片微动
  &:hover .card-visual {
    transform: scale(1.015);

    .card-image {
      filter: grayscale(0%) brightness(1);
      transform: scale(1.03);
    }
  }

  // 卡片底部信息
  .card-meta {
    display: flex;
    align-items: center;
    gap: rpx(12);
    padding: 0 rpx(4);
    flex-shrink: 0;

    .meta-index {
      font-size: rpx(11);
      font-weight: 400;
      color: var(--component-text-color);
      letter-spacing: rpx(1);
      font-variant-numeric: tabular-nums;
    }

    .meta-name {
      font-size: rpx(13);
      font-weight: 400;
      color: var(--text-color);
      letter-spacing: rpx(2);
    }
  }
}

/* ---- 详情弹窗 ---- */
.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(rpx(20));
  -webkit-backdrop-filter: blur(rpx(20));
  padding: rpx(60);
}

.detail-panel {
  width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  gap: rpx(40);
  position: relative;
}

/* 关闭按钮 */
.detail-close {
  position: absolute;
  top: rpx(-10);
  right: 0;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: rpx(8);
  transition: color 0.3s ease;
  z-index: 10;

  &:hover {
    color: #fff;
  }
}

/* 项目信息 */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: rpx(8);
  color: #fff;
  padding-right: rpx(60);

  .detail-number {
    font-size: rpx(13);
    font-weight: 300;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: rpx(3);
  }

  .detail-title {
    font-size: rpx(36);
    font-weight: 400;
    letter-spacing: rpx(6);
    margin: 0;
    color: #fff;
  }

  .detail-desc {
    font-size: rpx(14);
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: rpx(2);
    margin: 0;
  }

  .detail-link{
    color: #fff;
    a{
      color: rgba(255, 255, 255, 0.6);
      text-decoration: underline;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

/* 图片画廊 */
.detail-gallery {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(rpx(360), 1fr));
  gap: rpx(12);
  overflow-y: auto;
  padding-right: rpx(4);

  // 隐藏滚动条
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .gallery-item {
    border-radius: rpx(8);
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.05);

    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
  }
}

/* ---- 详情弹窗过渡动画 ---- */
.detail-enter-active {
  transition: opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.detail-leave-active {
  transition: opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.detail-enter-from,
.detail-leave-to {
  opacity: 0;
}
.detail-enter-to,
.detail-leave-from {
  opacity: 1;
}
</style>
