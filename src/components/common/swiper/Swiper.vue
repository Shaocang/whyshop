<template>
  <div class="container">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="focus">
      <div
        class="circle"
        v-for="n in imgsNum"
        :key="n"
        :class="{active: focus(n)}"></div>
    </div>
    <button class="btn left" @click="toggleLast">&lt;</button>
    <button class="btn right" @click="toggleNext">&gt;</button>
  </div>
</template>

<script>

export default {
  name: 'Swiper',
  mounted() {
    // 父组件挂载好 调用dom处理 并删除该timer
    const domTimer = setInterval(() => {
      if (this.isMounted) {
        this.handleDom()
        this.autoToggle()
        clearInterval(domTimer)
      }
    }, 300)
  },
  props: {
    // 轮播图片数量
    imgsNum: {
      type: Number,
      default: 0
    },
    // 过渡动画时间
    transitionDuration: {
      type: Number,
      default: 300
    },
    // 轮播切换时间
    toggleTime: {
      type: Number,
      default: 3000
    },
    // 父组件是否成功挂载
    isMounted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      swiperEl: null,
      currentIndex: 1,
      autoTogTimer: 0,
      // 判断是否正在滚动
      isToggle: false,
      startPageX: 0,
      containerWidth: 0
    }
  },
  computed: {
    // 格式化过渡时间
    formatTransDur() {
      return this.transitionDuration + 'ms'
    },
    formatLeft() {
      return -this.currentIndex * 100 + '%'
    },
    // 用于计算touchmove
    pxLeft() {
      return -this.currentIndex * this.containerWidth
    }
  },
  methods: {
    // 自动轮播
    autoToggle() {
      console.log(this.currentIndex)
      console.log(this.imgsNum)
      this.autoTogTimer = setInterval(() => {
        // 左轮播
        // this.toggleLast()
        // 右轮播
        this.isToggle = true
        this.toggleNext()
        this.isToggle = false
      }, this.toggleTime)
    },
    // touch事件
    touchStart(e) {
      // 判断是否正在轮播 并且关闭自动轮播
      if (this.isToggle) { return }
      clearInterval(this.autoTogTimer)
      // 如果立即又拖拉下一张 则需要判断一下 将其置于左右都能拖动的位置
      this.rightLimit()
      this.leftLimit()

      // 获取初始点
      this.startPageX = e.targetTouches[0].pageX
      // 获取容器宽度  下面计算left
      this.containerWidth = document.querySelector('.container').offsetWidth
    },
    touchMove(e) {
      // 拉动过程拉动swiper
      this.swiperEl.style.transition = 'none'
      const moveDistance = e.targetTouches[0].pageX - this.startPageX
      const left = moveDistance + this.pxLeft
      this.swiperEl.style.left = left + 'px'
    },
    touchEnd(e) {
      // 判断该不该切换到下一张
      const endDistance = e.changedTouches[0].pageX - this.startPageX
      if (Math.abs(endDistance) > this.containerWidth / 3) {
        endDistance > 0 ? this.currentIndex-- : this.currentIndex++
      }
      this.setPos()
      // 打开轮播
      this.autoToggle()
    },
    // 左切换
    toggleLast() {
      this.leftLimit()
      this.currentIndex--
      this.setPos()
    },
    // 右切换
    toggleNext() {
      this.rightLimit()
      this.currentIndex++
      this.setPos()
    },
    // 下方圆点聚焦
    focus(n) {
      let step = this.currentIndex
      if (step === 0) step = 4
      if (step === 5) step = 1
      return step === n
    },
    // 设置与index相关的位置
    setPos() {
      this.swiperEl.style.transition = this.formatTransDur
      this.swiperEl.style.left = this.formatLeft
    },
    // 左边界处理
    leftLimit() {
      if (this.currentIndex === 0) {
        this.swiperEl.style.transition = 'none'
        this.currentIndex = this.imgsNum
        this.swiperEl.style.left = this.formatLeft
        // 中断浏览器队列渲染
        this.swiperEl.offsetLeft
      }
    },
    // 右边界处理
    rightLimit() {
      if (this.currentIndex === this.imgsNum + 1) {
        this.swiperEl.style.transition = 'none'
        this.swiperEl.style.left = '-100%'
        this.currentIndex = 1
        // 中断浏览器队列渲染
        this.swiperEl.offsetLeft
      }
    },
    // 在前后添加Slide 这里克隆的slide用到了父组件
    // 但是该组件和父组件的渲染
    // 所以需要等待父组件渲染完后再调用此方法
    // 给后续的拖动事件准备
    handleDom() {
      const swiper = document.querySelector('.swiper')
      this.swiperEl = swiper

      const firstChildNode = swiper.firstElementChild
      const lastChildNode = swiper.lastElementChild
      const cloneFirst = firstChildNode.cloneNode(true)
      const cloneLast = lastChildNode.cloneNode(true)
      swiper.appendChild(cloneFirst)
      swiper.insertBefore(cloneLast, firstChildNode)

      swiper.style.width = (this.imgsNum + 2) * 100 + '%'
      swiper.style.left = '-100%'
    }
  }
}

// ------------ 轮播图的关键在于同时控制currentIndex和left的变化 必须一致 一个变则另一个必须变
</script>

<style scoped>
  .container {
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;
  }

  .swiper {
    width: 600%;
    height: 100%;
    display: flex;
    position: absolute;
    left: 0;
  }

  .focus {
    display: flex;
    position: absolute;
    z-index: 10;
    justify-content: space-evenly;
    bottom: 5px;
    width: 30%;
    left: 50%;
    transform: translateX(-50%);
  }

  .circle {
    width: 16px;
    height: 16px;

    background-color: #fff;
    border-radius: 50%;
    opacity: 0.5;
  }

  .circle.active {
    opacity: 1;
  }

  .btn {
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);

    background-color: rgba(0, 0, 0, 0);
    border: none;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.7);
    user-select: none;
    }

  .btn.left {
    left: 0;
  }

  .btn.right {
    right: 0;
  }
</style>
