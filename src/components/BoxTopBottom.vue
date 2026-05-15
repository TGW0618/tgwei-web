<template>
  <!-- ✅ 1. 根据 isScrolling 和 index 动态绑定 class -->
  <div 
    class="box-top-bottom" 
    :class="{
      'scroll-odd': isScrolling && index % 2 !== 0,
      'scroll-even': isScrolling && index % 2 === 0
    }"
  >
    <div class="box-img">
      <!-- 如果没有图片，显示占位符或颜色块 -->
      <img v-if="props.img" :src="props.img" alt="img">
      <span v-else class="img-placeholder"></span>
    </div>
    <!-- <div class="box-number">{{ props.number }}</div> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  img: String,
  number: Number,
  index: Number, // ✅ 1. 接收 index
  isScrolling: Boolean // ✅ 2. 接收滚动状态
});

</script>

<style scoped lang="scss">
.box-top-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  /* ✅ 3. 添加过渡效果，让移动和恢复更平滑 */
  transition: transform 8s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  /* 默认状态无位移 */
  transform: translateY(0);
}

/* ✅ 4. 奇数列：滚动时向上移动 */
.scroll-odd {
  transform: translateY(rpx(-20)); 
  transition: transform 8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* ✅ 5. 偶数列：滚动时向下移动 */
.scroll-even {
  transform: translateY(rpx(20));
  transition: transform 8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.box-img {
  width: 100%;
  height: 70%;
  // background: #2462ff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 防止图片缩放溢出 */
  
  img {
    // width: 100%;
    // height: 100%;
    object-fit: cover;
  }
  
  .img-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #2462ff, #4a8aff);
  }
}

/* 保持原有的 hover 效果，但要注意优先级 */
.box-img:hover {
  transform: scale(0.95);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.box-number {
  width: 100%;
  height: 30%;
  color: var(--number-text-color); 
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: rpx(18);
  padding-bottom: 10px;
}
</style>