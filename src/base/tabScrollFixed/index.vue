<template>
  <!-- 吸顶方案实现 -->
  <div class="tabScrollFixed">
    <div class="header">
      <img src="https://img1.dxycdn.com/2022/0818/164/1850097290281856653-66.png" class="img" />
    </div>
    <!-- 第一种：设置position为sticky的话，父级元素的高度必须大于设了该属性的元素高度 -->
    <div class="tab-wrapper">
      <div :class="{ tab: true, 'tab-fixed': tabIsFixed }" @click="handleTab" ref="tabRef">
        <div class="tab-row1">
          <div class="tab-item active">tab1</div>
          <div class="tab-item">tab2</div>
        </div>
        <div class="tab-row2">
          <div @click="handleClickContent" class="tab-item" :class="{ active: !commentActive }">内容</div>
          <div @click="handleClickComment" class="tab-item" :class="{ active: commentActive }">评价</div>
        </div>
      </div>
    </div>
    <div class="tab-label"></div>
    <!-- 占位符 -->
    <div class="tab-content1" ref="contentRef">内容scroll</div>
    <div class="tab-content2" ref="commentRef">测试scrollFixed2</div>
  </div>
</template>
<script>
import throttle from 'lodash.throttle';
export default {
  name: 'tab-scroll-fixed',
  data() {
    return {
      tabIsFixed: false,
      commentActive: false,
    };
  },
  computed: {
  },
  methods: {
    handleWindowScroll() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      // 是否置顶
      if (scrollTop >= this.tabOffsetTop) {
        this.tabIsFixed = true
      } else {
        this.tabIsFixed = false
      }
      // tabHeight * 2 因为会控制成fixed，脱离文档流了，+5:滚动一点游标即切换
      if (scrollTop + this.tabHeight + 5 - this.commentOffsetTop >= 0) {
        this.commentActive = true
      } else {
        this.commentActive = false
      }
      // console.log(111, scrollTop)
    },
    handleClickContent() {
      window.scrollTo(0, this.contentOffsetTop - this.tabHeight)
    },
    handleClickComment() {
      window.scrollTo(0, this.commentOffsetTop - this.tabHeight)
    },
    handleTab() { },
  },
  mounted() {
    this.$nextTick(() => {
      // 计算高度
      this.tabHeight = Math.round(this.$refs.tabRef.getBoundingClientRect().height)
      this.tabOffsetTop = this.$refs.tabRef.offsetTop;
      this.contentOffsetTop = this.$refs.contentRef.offsetTop;
      this.commentOffsetTop = this.$refs.commentRef.offsetTop;
      // console.log(222, this.contentOffsetTop, this.tabOffsetTop, this.commentOffsetTop);
    })
    this.handleScroll = throttle(this.handleWindowScroll, 250);
    window.addEventListener('scroll', this.handleScroll);
  },
}
</script>
<style lang="styl" scoped>
.tabScrollFixed {
  min-height: 100%;
  .header {
    width: 100%;
    height: 250px;

    .img {
      display: block;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }

  .tab-wrapper {
    width: 100%;
    min-height: 98px;
  }
  .tab {
    width: 100%;
    /* position: -webkit-sticky; */
    /* position: sticky; */
    top: 0;

    &.tab-fixed {
      position: fixed;
      background: #f6f6f6;
    }

    .tab-row1 {
      display: flex;

      .tab-item {
        width: 50%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: #000;

        &.active {
          background-color: rgb(64, 158, 255);
          color: #fff;
        }
      }
    }

    .tab-row2 {
      display: flex;
      padding: 10px;

      .tab-item {
        font-size: 16px;
        border-radius: 16px;
        padding: 5px 16px;
        color: #333;
        background: #fff;
        margin-right: 10px;

        &.active {
          border: 1px solid #409eff;
          color: rgb(64, 158, 255);
        }
      }
    }

    .tab-item-label {
      width: 100%;
      height: 50px;
    }
  }
  .tab-content1 {
    height: 400px;
  }
  .tab-content2 {
    height: 400px;
  }
}
</style>
