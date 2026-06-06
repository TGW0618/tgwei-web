<template>
  <div class="title-index">
    <div>{{ props.title }}</div>
    <div>{{ String(props.number).padStart(2, '0') }}</div>
  </div>
  <div class="title-slot">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string; number: number }>()
</script>

<style scoped lang="scss">
.title-index {
  border-top: solid rpx(1) var(--border-color, #fff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--component-text-color, #333);
  font-size: rpx(12);
  padding: rpx(10) rpx(0);


}

.title-slot{
    font-size: rpx(12);
    padding-bottom: rpx(38);
}
</style>
