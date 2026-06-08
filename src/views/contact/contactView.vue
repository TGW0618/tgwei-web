<template>
  <div class="contact-View">
    <div class="contact-left">
      <div>Contact Me</div>
      <div>期待与您的合作，随时欢迎您联系我。</div>
    </div>
    <div class="contact-right">
      <div class="contact-item" v-for="(item, index) in dataList" :key="index">
        <div><img :src="item.img" alt="邮箱" /></div>
        <div>{{ item.title }}：{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface contactItemType {
  img: string
  title?: string
  text: string
}

const dataList: contactItemType[] = [
  {
    img: '/imgs/邮箱.svg',
    title: '邮箱',
    text: 'yitang0618@gmail.com',
  },
  {
    img: '/imgs/电话.svg',
    title: '电话',
    text: '195 7236 1926',
  },
  {
    img: '/imgs/微信.svg',
    title: '微信',
    text: 'TGWei0618',
  },
  {
    img: '/imgs/github.svg',
    title: 'GitHub',
    text: 'github.com/TGW0618',
  },
]
</script>

<style scoped lang="scss">
.contact-View {
  display: grid;
  /* 2列，均分宽度 */
  grid-template-columns: 1fr 1fr;
  /* 2行，高度自适应内容 */
  grid-template-rows: auto auto;
  gap: rpx(50);
  width: 80%;
  // 超出不显示
  overflow: hidden;
  border-radius: rpx(70);
  background-color: var(--component-bg-color);
  padding-top: rpx(70);

  .contact-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: rpx(20);

    div:nth-child(1) {
      font-size: rpx(50);
      font-weight: bold;
    }

    div:nth-child(2) {
      font-size: rpx(28);
    }
  }

  .contact-right {
    .contact-item {
      height: auto;
      font-size: rpx(38);
      font-weight: bold;
      padding: rpx(20) rpx(30);
      gap: rpx(20);
      display: flex;
      align-items: center;
      justify-content: center;

      div:nth-child(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: rpx(80);
        height: rpx(80);
        border: none;
        cursor: pointer;
      }

      div:nth-child(2) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        cursor: pointer;
        border: none;
      }

      div > img {
        object-position: center;
      }
    }
  }
}
</style>
