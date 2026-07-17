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
    text: 'TGW0618',
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
        flex-shrink: 0; /* 防止图标在小屏幕上被挤压 */
      }

      div:nth-child(2) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        cursor: pointer;
        border: none;
        overflow-wrap: break-word;
        word-break: break-word;
      }

      div > img {
        object-position: center;
      }
    }
  }

  // =============================================
  // 响应式：平板适配 (≤900px)
  // =============================================
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    width: 85%;
    gap: rpx(30);
    padding-top: rpx(40);

    .contact-left {
      gap: rpx(12);
      text-align: center;

      div:nth-child(2) {
        padding: 0 rpx(20);
      }
    }

    .contact-right {
      .contact-item {
        font-size: rpx(30);
        padding: rpx(14) rpx(20);
        gap: rpx(14);
        justify-content: flex-start;

        div:nth-child(1) {
          width: rpx(54);
          height: rpx(54);
        }
      }
    }
  }

  // =============================================
  // 响应式：手机适配 (≤480px)
  // =============================================
  @media (max-width: 480px) {
    width: 92%;
    gap: rpx(20);
    padding: rpx(30) rpx(15) rpx(15) rpx(15);
    border-radius: rpx(40);

    .contact-left {
      gap: rpx(8);

      div:nth-child(1) {
        font-size: rpx(38);
      }

      div:nth-child(2) {
        font-size: rpx(22);
      }
    }

    .contact-right {
      .contact-item {
        font-size: rpx(24);
        padding: rpx(10) rpx(12);
        gap: rpx(10);

        div:nth-child(1) {
          width: rpx(42);
          height: rpx(42);
        }
      }
    }
  }
}
</style>
