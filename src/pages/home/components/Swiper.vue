<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for='item of list' :key='item.id'>
        <img class="swiper-img" :src="item.imgUrl"/>
      </swiper-slide>
      <!-- 页码 也就是小圆点 -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true, // 控制轮播插件支持循环轮播
        autoplay: 3000
      }
      // swiperList: [
      //   {id: '0001', imgUrl: 'http://img1.qunarzz.com/sight/p0/2003/6c/6cd013b870474899a3.img.jpg_350x240_91f1395b.jpg'},
      //   {id: '0002', imgUrl: 'http://img1.qunarzz.com/sight/p0/1803/ae/ae876a8017aeadefa3.img.jpg_350x240_a891c2c3.jpg'}
      // ]
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
      background #fff
  .wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 68.6%
    background-color #eee
    .swiper-img
      width 100%
</style>
