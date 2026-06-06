<template>
  <div class="contact">
    <div class="title">联系</div>

    <!-- 联系内容区域 -->
    <div class="contact-content">
      <!-- 左列：主要联系方式 -->
      <div class="content-left">
        <TitleIndex title="电子邮箱" :number="0">
          <div class="contact-item">
            <span class="label">Email:</span>
            <a href="mailto:1393847309@qq.com" class="value">1393847309@qq.com</a>
          </div>
          <div class="contact-desc">
            欢迎通过邮件进行业务咨询或技术交流，通常在24小时内回复。
          </div>
        </TitleIndex>

        <TitleIndex title="联系电话" :number="1">
          <div class="contact-item">
            <span class="label">Tel:</span>
            <a href="tel:+8619572361926" class="value">+86 195-7236-1926</a>
          </div>
          <div class="contact-desc">
            工作日 9:00 - 18:00 可拨打，紧急情况请短信留言。
          </div>
        </TitleIndex>
      </div>

      <!-- 中列：社交与即时通讯 -->
      <div class="content-center">
        <TitleIndex title="微信 / WeChat" :number="2">
          <div class="contact-item">
            <span class="label">WeChat:</span>
            <span class="value">TGWei0618</span>
          </div>
          <div class="contact-desc">
            添加时请备注姓名及来意。
          </div>
        </TitleIndex>

        <TitleIndex title="社交媒体" :number="3">
          <div class="social-links">
            <a href="https://github.com/TGW0618" target="_blank" class="social-item">
              <span class="platform">GitHub</span>
              <span class="arrow">→</span>
            </a>
            <a href="https://gitee.com/tgwei" target="_blank" class="social-item">
              <span class="platform">Gitee</span>
              <span class="arrow">→</span>
            </a>
            <a href="#" target="_blank" class="social-item">
              <span class="platform">Juejin</span>
              <span class="arrow">→</span>
            </a>
          </div>
        </TitleIndex>
      </div>

      <!-- 右列：在线留言或附加信息 -->
      <div class="content-right">
        <TitleIndex title="工作地点" :number="4">
          <div class="contact-item">
            <span class="value">广西 · 防城港</span>
          </div>
          <div class="contact-desc">
            目前位于防城港，接受远程协作或异地办公机会。
          </div>
        </TitleIndex>

        <TitleIndex title="其他" :number="5">
          <div class="contact-desc">
            如果您对我的简历或项目感兴趣，可以通过上述任意方式联系我。
            <br />
            期待与您合作！
          </div>
        </TitleIndex>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleIndex from '@/components/TitleIndex.vue'
</script>

<style scoped lang="scss">
.contact {
  width: 87vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-row-gap: rpx(10);
  padding-top: rpx(60);

  .title {
    font-size: rpx(90);
    letter-spacing: rpx(10);
    font-weight: 700;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: rpx(50);
    align-items: start;
    margin-top: rpx(20);

    /* 通用联系项样式 */
    .contact-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: rpx(10);
      font-size: rpx(32);

      .label {
        color: var(--component-text-color, #fff);
        opacity: 0.7;
        min-width: rpx(80);
      }

      .value {
        flex: 1;
        text-align: right;
        color: var(--component-text-color, #fff);
        font-weight: 500;
        text-decoration: none;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
      }
    }

    .contact-desc {
      font-size: rpx(24);
      color: var(--component-text-color, #fff);
      opacity: 0.6;
      line-height: 1.6;
      text-align: justify;
      margin-top: rpx(5);
    }

    /* 社交链接样式 */
    .social-links {
      display: flex;
      flex-direction: column;
      gap: rpx(15);

      .social-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: rpx(10) 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        text-decoration: none;
        color: var(--component-text-color, #fff);
        transition: all 0.3s;

        &:hover {
          padding-left: rpx(10);
          border-bottom-color: rgba(255, 255, 255, 0.3);
        }

        .platform {
          font-size: rpx(30);
          font-weight: 500;
        }

        .arrow {
          font-size: rpx(24);
          opacity: 0.5;
        }
      }
    }
  }
}
</style>