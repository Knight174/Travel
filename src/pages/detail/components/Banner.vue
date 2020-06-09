<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" src="//img1.qunarzz.com/sight/p0/1911/49/4988ed643a1c6eb4a3.img.jpg_600x330_bc326677.jpg" alt="">
      <div class="banner-info">
        <div class="banner-title">灵山大佛(AAAAA景区)</div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe65b;</span>
          60
        </div>
      </div>
    </div>
    <common-gallery
      :imgs="imgs"
      v-show="showGallery"
      @close="handleGalleryClose"
    ></common-gallery>
  </div>
</template>

<script>
import CommonGallery from 'common/gallery/Gallery'
export default {
  name: 'Banner',
  data () {
    return {
      showGallery: false,
      imgs: ['http://img1.qunarzz.com/sight/p0/1911/49/4988ed643a1c6eb4a3.img.jpg_r_800x800_cb4e4a42.jpg', 'http://img1.qunarzz.com/sight/p0/1911/bf/bf8c16067a50ca4da3.img.jpg_r_800x800_ffd0eaec.jpg']
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallery = true
    },
    handleGalleryClose () {
      this.showGallery = false
    }
  },
  components: {
    CommonGallery
  }
}
</script>

<style lang="stylus" scoped>
  .banner
    position relative
    overflow hidden
    height 0
    padding-bottom 55%
    .banner-img
      width 100%
    .banner-info
      display flex
      position absolute
      left 0
      right 0
      bottom 0
      line-height .6rem
      color #fff
      background-image linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,0.8))
      .banner-title
        flex 1
        font-size .32rem
        padding 0 .2rem
      .banner-number
        margin-top .14rem
        padding 0 .4rem
        height .32rem
        line-height .32rem
        border-radius .2rem
        background-color rgba(0,0,0,.8)
        font-size .24rem
      .banner-icon
        font-size .24rem
</style>
