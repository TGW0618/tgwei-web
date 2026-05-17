<template>
  <div class="nav">
    <div>TGWei-唐国威</div>
    <div>档案</div>
    <div>项目</div>
    <div>技术栈</div>
    <div>联系我</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: rpx(18);
  font-size: rpx(16);
  letter-spacing: rpx(6);
   position: relative; 

  div {
    position: relative;
    cursor: pointer;
    // color: var(--text-color);
    // color: #ffffff; 
    transition:  opacity 0.3s ease;
    
  }

  div:nth-child(1) {
    font-size: rpx(18);
    font-weight: bold;
   
  }





  div::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: rpx(-5);
    width: 0;
    height: rpx(1);
    background-color: var(--text-color);
    // background-color: var(--link-color);
    // background-color: #ffffff;
    transition: width 0.3s ease;
  
  }

  div:hover::after {
    width: 100%;
    transition: width 0.3s ease;

  }
}
</style>
