<template>
  <div ref="canvasContainer" class="porousRock3DModel"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { PorousRockScene } from '@/util/models/PorousRock3DModel'

const canvasContainer = ref<HTMLDivElement | null>(null)
let sceneInstance: PorousRockScene | null = null

onMounted(() => {
  if (canvasContainer.value) {
    // 实例化 Three.js 场景
    sceneInstance = new PorousRockScene(canvasContainer.value)
  }
})

onBeforeUnmount(() => {
  // 组件卸载时，彻底清理 Three.js 资源
  if (sceneInstance) {
    sceneInstance.dispose()
    sceneInstance = null
  }
})
</script>

<style scoped lang="scss">
.porousRock3DModel {
  position: relative; 
  height: 100vh;
  width: 100%;
  overflow: hidden; 
}
</style>