<template>
  <div class="about">
    <!-- <div class="title">关于</div> -->

    <!-- 个人信息区域 -->
    <div class="about-info">
      <div class="info-img">
        <img src="/imgs/头像.jpg" alt="唐国威头像" />
      </div>
      <div class="info-name">
        唐国威
        <br />
        TangGuoWei
      </div>
      <div class="info-mgs">
        <!-- <div>A</div>
        <div>G</div>
        <div>E</div>
        <div>22</div> -->
      </div>
    </div>

    <!-- 详细内容区域 -->
    <div class="about-content">
      <!-- 左列：理念、简介、教育 -->
      <div class="content-left">
        <TitleIndex title="Tip" :number="0">
          <div class="text-block">Hi，我是唐国威</div>
        </TitleIndex>

        <TitleIndex title="简介" :number="1">
          <div class="text-block">
            我叫唐国威，4年制计算机本科应届生，拥有6个月工业数字孪生大屏可视化全职实习经验， 熟练掌握
            Vue3+TS可视化开发、WebRTC三维像素流通信；擅长大屏性能优化、通用业务组件封装、政企多端自适应适配。
            熟练使用AI开发工具辅助编码与问题排查，拥有水利 / 电力行业数字孪生项目前端落地， 具备从0 到1
            搭建前端工程、全栈联调能力； 擅长与UE美术、后端、产品跨团队协作解决三维渲染、内存泄漏、高并发数据渲染等复杂问题，
            具备工业可视化赛道经验，追求代码规范与页面性能。
          </div>
        </TitleIndex>

        <TitleIndex title="教育" :number="2">
          <div class="education-item">
            <div class="time">2022.09-2026.06</div>
            <div class="degree">本科</div>
            <div class="school">
              广西农业职业技术大学<br />
              <span class="major">计算机应用工程</span>
            </div>
          </div>
        </TitleIndex>
      </div>

      <!-- 中列：工作经历、奖项 -->
      <div class="content-center">
        <TitleIndex title="工作经历" :number="3">
          <div class="work-box">
            <div class="work-header">
              <div class="time">2025.10-2026.05</div>
              <div class="company">元能星泰科技有限公司</div>
              <div class="role">前端开发工程师</div>
            </div>
            <div class="work-desc">
              实习<br />
              负责水利、电力行业数字孪生大屏可视化项目前端开发，配合UE美术团队完成高精三维场景的Web端接入、双向通信机制建设及数据看板联动
            </div>
          </div>

          <div class="work-box">
            <div class="work-header">
              <div class="time">2025.06-2025.09</div>
              <div class="company">广西农信社</div>
              <div class="role">大堂经理</div>
            </div>
            <div class="work-desc">
              实习<br />
              协助客户开卡,解决客户需求,维护厅堂秩序，及时处理客户投诉和纠纷
            </div>
          </div>

          <div class="work-box">
            <div class="work-header">
              <div class="time">2023.11-2024.03</div>
              <div class="company">广西钜派通贸易有限公司</div>
              <div class="role">跨境电商运营</div>
            </div>
            <div class="work-desc">
              实习<br />
              负责Shopee越南站点店铺整体管控、调研挖掘潜力新品、广告投放、流量推广、数据分析
            </div>
          </div>
        </TitleIndex>

        <TitleIndex title="奖项" :number="4">
          <div class="award-item">
            <div class="time">2022</div>
            <div class="content">广西壮族自治区职业技能大赛（微网站设计）</div>
          </div>
          <div class="award-item">
            <div class="time">2022</div>
            <div class="content">广西自治区人民政府奖学金</div>
          </div>
          <div class="award-item">
            <div class="time">2025</div>
            <div class="content">学业一等奖学金</div>
          </div>
        </TitleIndex>
      </div>

      <!-- 右列：语言、兴趣爱好 -->
      <div class="content-right">
        <TitleIndex title="语言" :number="5">
          <div class="language-item">
            <div class="content">白语 客家话</div>
          </div>
        </TitleIndex>

        <TitleIndex title="兴趣爱好" :number="6">
          <div class="hobbies">
            <div class="hobby-group">
              <p>游泳</p>
              <p>打篮球</p>
              <p>玩游戏</p>
            </div>
            <div class="hobby-group">
              <p>3D</p>
              <p>看动漫</p>
            </div>
          </div>
        </TitleIndex>

        <TitleIndex title="专业技能" :number="7">
          <div class="hobbies">
            <div class="hobby-group">
              <p>HTML5</p>
              <p>CSS3</p>
              <p>JavaScript</p>
              <p>TypeScript</p>
              <p>Vite</p>
            </div>
            <div class="hobby-group">
              <p>Vue.js</p>
              <p>Three.js</p>
              <p>Node.js</p>
              <p>ECharts</p>
              <p>Bootstrap</p>
            </div>
            <div class="hobby-group">
              <p>Sass/SCSS、Less</p>
              <p>Git+GitHub/GitLab/Gitee</p>
              <p>Element Plus</p>
              <p>Ant Design Vue</p>
            </div>
            <div class="hobby-group"></div>
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
.about {
  width: 80vw;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr; /* 优化：标题和信息区自适应高度 */
  grid-row-gap: rpx(10);
  padding: rpx(46) rpx(60) rpx(0) rpx(60);

  border-radius: rpx(50) rpx(50) rpx(60) rpx(60);
  border-left: var(--border-color, #fff) solid rpx(1);
  border-right: var(--border-color, #fff) solid rpx(1);
  border-top: var(--border-color, #fff) solid rpx(1);
  border-bottom: var(--border-color, #fff) solid rpx(1);

  .title {
    font-size: rpx(90);
    letter-spacing: rpx(10);
    font-weight: 700;
  }

  .about-info {
    display: grid;
    grid-template-columns: 1fr 3fr 10fr;
    grid-column-gap: rpx(50);

    .info-img {
      width: rpx(150);
      height: rpx(150);
      border-radius: 50%;
      box-shadow: 0 0 rpx(50) var(--component-bg-color, #000);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden; /* 确保图片不溢出圆形容器 */

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info-name {
      font-size: rpx(45);
      font-weight: 700;
      letter-spacing: rpx(3);
    }

    .info-mgs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: rpx(20);

      div {
        // background: var(--component-bg-color, #000);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: rpx(50);
    align-items: start; /* 优化：顶部对齐，避免内容被拉伸居中 */
    margin-top: rpx(20);

    /* 通用文本块样式 */
    .text-block {
      line-height: 1.6;
      text-align: justify;
    }

    /* 通用列表项样式 (教育/奖项) */
    .education-item,
    .award-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: rpx(18);

      .time {
        color: var(--component-text-color, #fff);
        min-width: rpx(100); /* 防止时间宽度不一致导致错位 */
      }

      .content,
      .school,
      .degree {
        flex: 1;
        text-align: right;
      }

      .degree {
        text-align: center;
      }

      .school {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .major {
          color: var(--component-text-color, #fff);
          width: auto;
          position: static;
        }
      }
    }

    /* 工作经历样式 */
    .work-box {
      padding-bottom: rpx(18);

      .work-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .time {
          color: var(--component-text-color, #fff);
        }
      }

      .work-desc {
        color: var(--component-text-color, #fff);
        text-align: right;
        margin-top: rpx(5);
      }
    }

    /* 兴趣爱好样式 */
    .hobbies {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: rpx(80);

      .hobby-group {
        display: flex;
        flex-direction: column;
        gap: rpx(10);

        p {
          margin: 0;
          color: var(--component-text-color, #fff);
        }
      }
    }

    /* 语言样式 */
    .language-item {
      color: var(--component-text-color, #fff);
    }

    /* 溢出安全：防止长文本在任意宽度下溢出 */
    .text-block,
    .work-desc,
    .award-item .content,
    .school,
    .language-item .content {
      overflow-wrap: break-word;
      word-break: break-word;
    }
  }

  // =============================================
  // 响应式：平板适配 (≤1200px)
  // =============================================
  @media (max-width: 1200px) {
    width: 90vw;
    padding: rpx(46) rpx(40) rpx(0) rpx(40);

    .about-info {
      grid-template-columns: 1fr 3fr;
      .info-mgs {
        display: none;
      }
    }

    .about-content {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: rpx(30);

      .content-right {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: rpx(30);
      }

      .work-header {
        flex-wrap: wrap;
        gap: rpx(4) rpx(8);
      }

      .hobbies {
        gap: rpx(40);
      }
    }
  }

  // =============================================
  // 响应式：手机适配 (≤768px)
  // =============================================
  @media (max-width: 768px) {
    width: 94vw;
    padding: rpx(30) rpx(20) rpx(0) rpx(20);
    grid-row-gap: rpx(20);

    .about-info {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      grid-row-gap: rpx(15);

      .info-name {
        text-align: center;
      }

      .info-mgs {
        display: none;
      }
    }

    .about-content {
      grid-template-columns: 1fr;
      grid-column-gap: 0;
      grid-row-gap: rpx(10);

      .content-right {
        grid-column: auto;
        display: block;
      }

      .work-header {
        flex-direction: column;
        align-items: flex-start;
        gap: rpx(4);
      }

      .education-item,
      .award-item {
        flex-direction: column;
        align-items: flex-start;
        gap: rpx(4);

        .time {
          min-width: auto;
        }

        .content,
        .school,
        .degree {
          text-align: left;
        }
      }

      .education-item .school {
        align-items: flex-start;
        .major {
          position: static;
          width: auto;
          margin-top: rpx(4);
        }
      }

      .hobbies {
        gap: rpx(20);
        flex-wrap: wrap;
      }
    }
  }
}
</style>
