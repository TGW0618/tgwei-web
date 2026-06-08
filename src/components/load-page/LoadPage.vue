<template>
  <!-- Loading 遮罩层容器，点击触发进入动画 -->
  <div class="load-wrap" ref="wrapRef" @click="handleEnterClick">
    <!-- 欢迎文字容器，用于 GSAP SplitText 拆分动画 -->
    <div class="load-text" ref="scrollText">
      <div>你好</div>
    </div>

  </div>

  <!-- SVG 转场动画容器，位于底层 -->
  <div class='wrapper'>
    <svg class="transition" viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
      <defs>
        <!-- 定义渐变色，用于 SVG 路径填充 -->
        <linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
           <stop offset="0.2" stop-color="rgb(255, 135, 9)" />
            <stop offset="0.7" stop-color="rgb(247, 189, 248)" />
        </linearGradient>
      </defs>
      <!-- 初始状态的路径：底部封闭的矩形/曲线形状 -->
      <path class="path" stroke="url(#grad)" fill="url(#grad)" stroke-width="2px" vector-effect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

// 注册 GSAP 插件
gsap.registerPlugin(SplitText)

// 定义组件接收的属性：图片列表，用于预加载
const props = defineProps<{
  images: { src: string }[]
}>()

// 定义组件事件：加载完成时通知父组件
const emit = defineEmits<{
  (e: 'loaded'): void
}>()

// DOM 引用
const wrapRef = ref<HTMLElement | null>(null) // Loading 层容器
const scrollText = ref<HTMLElement | null>(null) // 文字容器
const progress = ref(0) // 预加载进度（当前未在前端显示，可用于后续扩展）

// GSAP 相关变量
let ctx: gsap.Context | null = null // GSAP 上下文，用于统一管理动画和清理
let splitInstance: SplitText | null = null // SplitText 实例，用于文字拆分
let isExiting = false // 标记是否正在执行退出动画，防止重复点击

/**
 * 初始化进入动画
 * 在图片预加载完成后调用，展示文字入场效果
 */
const initEntryAnimation = () => {
  // 确保必要的 DOM 元素存在
  if (!wrapRef.value || !scrollText.value) return

  // 创建 GSAP 上下文，绑定到 wrapRef，方便后续统一撤销
  ctx = gsap.context(() => {
    if (scrollText.value) {
      // 使用 SplitText 将文字拆分为单个字符
      splitInstance = new SplitText(scrollText.value, {
        type: 'chars', // 按字符拆分
        charsClass: 'char-item', // 给每个字符添加类名
      })

      // 执行字符入场动画：从下方淡入
      gsap.from(splitInstance.chars, {
        opacity: 0,
        y: 40,
        stagger: 0.1, // 每个字符动画间隔
        duration: 0.8,
        ease: 'back.out(1.7)', // 弹性缓动效果
      })
    }
  }, wrapRef.value)
}

/**
 * 处理点击进入主页的逻辑
 * 执行退出动画序列，然后通知父组件
 */
const handleEnterClick = () => {
  // 如果已经在退出中或上下文不存在，则忽略
  if (isExiting || !ctx) return
  isExiting = true

  // 获取 SVG 路径元素
  const pathElement = document.querySelector('.path') as SVGPathElement

  if (pathElement && ctx) {
    // 创建退出时间轴
    const exitTl = gsap.timeline({
      onComplete: () => {
        // 动画全部完成后，发射 loaded 事件，父组件可据此显示主页
        emit('loaded')
      }
    })

    // 1. 文字向上飞出并淡出
    if (splitInstance) {
      exitTl.to(splitInstance.chars, {
        y: -50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.in'
      }, 0) // 在时间轴起点开始
    }

    // 2. SVG 路径变形动画
    // 定义结束状态的路径：顶部闭合的形状，模拟幕布拉开或覆盖效果
    const endPath = "M 0 0 V 0 Q 50 0 100 0 V 0 z"

    exitTl.to(pathElement, {
      morphSVG: endPath, // 变形到目标路径
      ease: "power2.inOut",
      duration: 0.8
    }, 0.2) // 延迟 0.2 秒开始

    // 3. 整个 Loading 层淡出并轻微放大
    exitTl.to(wrapRef.value, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.in'
    }, 0.6) // 延迟 0.6 秒开始
  } else {
    // 如果缺少必要元素，直接发射事件，避免卡死
    emit('loaded')
  }
}

/**
 * 预加载图片资源
 * 限制只预加载前 30 张图片，防止过多请求
 */
const preloadImages = async () => {
  // 如果没有图片数据，直接初始化动画
  if (!props.images || props.images.length === 0) {
    initEntryAnimation()
    return
  }

  let loadedCount = 0
  const total = props.images.length
  const targets = props.images.slice(0, 30) // 只预加载前 30 张

  // 如果没有有效图片，直接初始化动画
  if (targets.length === 0) {
    initEntryAnimation()
    return
  }

  // 创建所有图片的加载 Promise
  const promises = targets.map((item) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.src = item.src
      // 加载成功
      img.onload = () => {
        loadedCount++
        progress.value = Math.floor((loadedCount / total) * 100)
        resolve()
      }
      // 加载失败也视为完成，避免阻塞
      img.onerror = () => {
        loadedCount++
        resolve()
      }
      // 超时保护：3 秒后强制 resolve，防止某张图片卡死
      setTimeout(() => resolve(), 3000)
    })
  })

  // 等待所有图片加载完成或超时
  await Promise.all(promises)

  // 初始化入场动画
  initEntryAnimation()
}

// 组件挂载后开始预加载
onMounted(() => {
  preloadImages()
})

// 组件卸载前清理资源
onBeforeUnmount(() => {
  // 撤销 GSAP 上下文中的所有动画和样式修改
  if (ctx) {
    ctx.revert()
  }
  // 还原 SplitText 拆分的 DOM 结构
  if (splitInstance) {
    splitInstance.revert()
  }
})
</script>

<style scoped lang="scss">
.load-wrap {
background-image: url('../../../public/imgs/reflex_production-drift-7248723.jpg');
background-size: cover;
background-position: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // background: var(--bg-color, #fff); // 背景色，支持 CSS 变量
  z-index: 99999; // 确保在最顶层
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer; // 提示可点击
  overflow: hidden; // 防止动画溢出可视区域

  .load-text {
    font-size: rpx(98); // 假设 rpx 是项目中的自定义单位函数
    font-weight: bold;
    color: var(--text-color, #333);
    display: flex;
    z-index: 2; // 确保文字在 SVG 之上
  }

  .hint-text {
    margin-top: rpx(38);
    font-size: rpx(24);
    color: var(--text-color, #ffffff);
    opacity: 1; // 初始隐藏
    z-index: 2;
  }
}

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // 不拦截鼠标事件，让点击穿透到 load-wrap
  z-index: 1; // 位于 load-wrap 之下
}

.transition {
  width: 100%;
  height: 100%;
}


</style>
