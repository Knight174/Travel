<template>
  <div>
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom"
        v-for="item of list"
        :key="item.id"
      >
        <div class="item-img-wrapper">
          <img class="item-img" :src="item.imgUrl" alt="">
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  props: {
    list: Array
  },
  data () {
    return {
      // recommandList: [{
      //   id: '0001',
      //   imgUrl: 'http://img1.qunarzz.com/sight/source/1505/24/4b609109dba139.jpg_r_640x214_b28f6052.jpg',
      //   title: '灵山大佛',
      //   desc: '灵山胜境，虔诚佛音'
      // }, {
      //   id: '0002',
      //   imgUrl: 'http://img1.qunarzz.com/sight/source/1505/24/4b609109dba139.jpg_r_640x214_b28f6052.jpg',
      //   title: '灵山大佛',
      //   desc: '灵山胜境，虔诚佛音'
      // }, {
      //   id: '0003',
      //   imgUrl: 'http://img1.qunarzz.com/sight/source/1505/24/4b609109dba139.jpg_r_640x214_b28f6052.jpg',
      //   title: '灵山大佛',
      //   desc: '灵山胜境，虔诚佛音'
      // }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    line-height .8rem
    background-color #eee
    text-indent .2rem
  .item-img-wrapper
    overflow hidden
    height 0
    padding-bottom 37.09%
    .item-img
      width 100%
  .item-info
    padding .1rem
    .item-title
      line-height .54rem
      font-size .32rem
      ellipsis()
    .item-desc
      line-height .4rem
      color #ccc
      ellipsis()
</style>
