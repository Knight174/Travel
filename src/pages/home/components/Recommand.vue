<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommandList" :key="item.id">
        <img class="item-img" :src="item.imgUrl" alt="">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommand',
  data () {
    return {
      recommandList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1911/49/4988ed643a1c6eb4a3.img.jpg_200x200_e8ef6872.jpg',
        title: '灵山大佛',
        desc: '灵山胜境，虔诚佛音'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1911/49/4988ed643a1c6eb4a3.img.jpg_200x200_e8ef6872.jpg',
        title: '灵山大佛',
        desc: '灵山胜境，虔诚佛音'
      }, {
        id: '0003',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1911/49/4988ed643a1c6eb4a3.img.jpg_200x200_e8ef6872.jpg',
        title: '灵山大佛',
        desc: '灵山胜境，虔诚佛音'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    margin-top: .2rem
    line-height .8rem
    background-color #eee
    text-indent .2rem
  .item
    overflow hidden
    display flex
    height 1.9rem
    .item-img
      width 1.7rem
      height 1.7rem
      padding .1rem
    .item-info
      flex 1
      padding .1rem
      overflow hidden
      .item-title
        line-height .54rem
        font-size .32rem
        ellipsis()
      .item-desc
        line-height .4rem
        color #ccc
        ellipsis()
      .item-button
        line-height .44rem
        margin-top .16rem
        background #ff9300
        padding 0 .2rem
        border-radius .06rem
        color #fff
</style>
