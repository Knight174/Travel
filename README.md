[项目简述](#项目简述)

[一、初始化（都在main.js中操作）](#初始化（都在main.js中操作）)

[二、轮播图](#轮播图)

[三、icons图标](#icons图标)

[四、recommand热门推荐](#recommand热门推荐)

[五、用axios发送ajax请求](#用axios发送ajax请求)

[六、city页面路由配置](#city页面路由配置)

[七、城市选择页的列表布局](#城市选择页的列表布局)

[八、用better-scroll来实现原生app上下滑动的效果](#用better-scroll来实现原生app上下滑动的效果)

[九、右侧字母表区域布局](#右侧字母表区域布局)

[十、城市选择页面的动态数据渲染](#城市选择页面的动态数据渲染)

[十一、兄弟组件数据传递（从Alphabet到List，同步跳转）](#兄弟组件数据传递（从Alphabet到List，同步跳转）)

[十二、同步滑动](#同步滑动)

[十三、城市搜索框的搜索内容部分的逻辑](#城市搜索框的搜索内容部分的逻辑)

[十四、vuex的基础使用](#vuex的基础使用)

[十五、页面跳转的两种方式](#页面跳转的两种方式)

[十六、vuex的高级使用](#vuex的高级使用)

[十七、vuex代码优化（辅助函数）](#vuex代码优化（辅助函数）)

[十八、keep-alive优化网页性能](#keep-alive优化网页性能)

[十九、300ms延迟问题](#300ms延迟问题)

[二十、动态路由](#动态路由)

[二十一、渐变效果](#渐变效果)

[二十二、iconfont重新下载](#iconfont重新下载)

[二十三、公用图片画廊](#公用图片画廊)

[二十四、详情页Header部分的显示与隐藏效果](#详情页Header部分的显示与隐藏效果)

[二十五、递归组件与列表](#递归组件与列表)

[二十六、动态获取详情页数据](#动态获取详情页数据)

[二十七、基础动画和插槽](#基础动画和插槽)

# 项目简述
## 0. 使用vue2.x语法，css部分利用预编译处理器stylus
## 1. 主要实现功能区：首页+城市选择页+详情页
## 2. 首页中的轮播图和 icon 区域的滑动利用第三方包 swiper 完成
## 3. 首页中的热门推荐和城市选择按钮设置了路由跳转
## 4. 城市选择页的滑动效果利用第三方包 better-scroll 完成
## 5. 城市选择页支持字母滑动和城市搜索
## 6. 详情页的Banner区域有画廊
## 7. 画廊的左右翻动效果利用swiper
## 8. 画廊的显示和隐藏运用了vue的基础动画，动画的插入运用到了插槽
## 9. 票价部分用到了递归组件
## 10. 更多在下面的项目笔记中

# 初始化（都在main.js中操作）
## 1. 在main.js中引基础样式和解决1像素问题的样式（reset.css border.css）
```js
import './assets/styles/reset.css'
import './assets/styles/border.css'
```

## 2. 解决移动端300ms点击事件延迟问题（npm install fastclick --save）
```js
import fastClick from 'fastclick'
fastClick.attach(document.body)
```

## 3. 在iconfont网上新建项目文件夹 ==>
https://www.iconfont.cn/

# 轮播图
## 1. 下载轮播图插件 vue-awesome-swiper(稳定版本：v2.6.7) 
npm install vue-awesome-swiper@2.6.7 --save
## 2. 在main.js引入
```js
// import
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
```
**Use in SPA**
```js
<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
```

## 3. 修改轮播图背景
* data中返回一个数据：swiperOption
* stylus样式 (style lang="stylus" scoped)(/style) scoped表示该样式只能在当前模板中生效！
* 防止加载时页面抖动+自适应：（解决网速差时图片不能及时加载腾出位置的问题）
```css
/*第一种*/
overflow:hidden;
width: 100%;
height: 0;
padding-bottom: 68.6%; // 240/350
/*第二种（有兼容问题）*/
width: 100%;
height: 68.6vw;
```
（视口宽度被分成100份，1vw是1/100宽度。）
http://www.w3chtml.com/css3/units/length/vm.html
* 配置圆点样式：https://github.com/surmon-china/vue-awesome-swiper/tree/v2.6.7
```js
swiperOption: {
  pagination: '.swiper-pagination', // 页码选项和圆点样式绑定在一起
  loop: true, // 支持循环轮播
  autoplay: 3000 // 自动轮换时间
},
```
* 用三箭头>>>穿透样式：
通过控制台发现小圆点的样式.swiper-pagination-bullet-active，但是它在轮播图插件的swiper组件上，因此在自己的Swiper上没法修改样式。这时用>>>穿透样式。
```css
/*wrapper下所有的.swiper-pagination-bullet-active类都加上下面的css样式*/
.wrapper >>> .swiper-pagination-bullet-active 
  background #fff
```

## 4. git补充

开发前：
- 在线上新建分支index-swiper
- 将线上仓库拉到本地：git pull
- 切换本地分支：git checkout index-swiper
- (查看当前本地分支 git status)
- 启动项目：npm run dev
- (在当前分支开发轮播图功能代码)

开发完毕：
- 提交到本地缓存区：git add .
- 提交到本地仓库：git commit -m '描述'
- 提交到线上仓库：git push
- 切换到master分支：git checkout master
- 将线上index-swiper分支合并到本地master：git merge origin/index-swiper
- 提交master上的代码到线上：git push
(index-swiper上的代码是具体功能的代码，master上的代码是最新最全代码。)



# icons图标
## 1. 单行文字超出隐藏
```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

## 2. 多页轮播
> 根据数据项的不同，自动化地构建页码，实现多页切换功能。

利用iconList数组中的数据计算出两个数组 pages[[...], [...]]

可以用vuedevtool来查看。
```js
computed: {
  pages () {
    const pages = [];

    this.iconList.forEach((item, index)=>{
      const page = Math.floor(index / 8);
      if(!pages[page]) {
        pages[page] = [];
      }
      pages[page].push(item);
    })

    return pages;
  }
}
```

## 3. 添加vue-devtools
在谷歌应用商店搜索并下载安装，该工具方便于查看vue数据结构。

## 补充：解决文件路径太长的问题
> 添加文档位置配置：打开build文件夹下的webpack.base.config.js 找到resolve选项。
```js
alias: {
  'styles': resolve('src/assets/styles')
}
```
> 使用：@import '~styles/variables.styl'

> 相当于：@import 'src/assets/styles/variables.styl'

## 补充：溢出部分显示...的代码复用
创建一个mixins.styl
```js
ellipsis()
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
```
如何使用？直接在style标签中引入再使用。
```css
@import '~styles/mixins.styl'

.icon-desc
  ...
  ellipsis()
```

# recommand热门推荐
## 1. flex: 1
分配剩余父元素部分的宽度。
https://blog.csdn.net/m0_37058714/article/details/80765562

## 2. 解决...未显示的问题
```css
min-width: 0;
或者用：over-flow: hidden;
```

## 补充：解决git合并发生冲突问题
https://blog.csdn.net/mynameislinduan/article/details/82147965

1. 在需要修改的功能分支下修改代码
2. 改完提交到线上
3. 切换到其他分支合并：用git add xxx，把你修改的文件全部都添加进去。
4. 最后，用git commit -m '描述' 提交，完成。




# 用axios发送ajax请求
axios是一个第三方跨平台数据请求库。
## 1. axios
> npm install axios --save

## 2. axios使用
组件太多，如果分开一个组件对应请求一次数据，那么将会耗费大量的性能。所以，为了解决性能问题，做法是由父组件统一接收一次数据，然后从父组件向子组件传值即可解决问题。
```js
import axios from 'axios'
// 在组件的挂载阶段(mounted)，触发方法getHomeInfo，通过这个方法来利用axios接收数据。
methods: {
  getHomeInfo () {
    axios.get('/api/index.json')
      .then(this.getHomeInfoSucc)
  },
  getHomeInfoSucc (res) {
    res = res.data
    if (res.ret && res.data) {
      const data = res.data
      this.city = data.city
      this.swiperList = data.swiperList
      this.iconList = data.iconList
      this.recommandList = data.recommandList
      this.weekendList = data.weekendList
    }
    console.log(res)
  }
},
mounted () {
  this.getHomeInfo()
}
```

## 3. static目录下创建一个假数据包mock，里面有一个index.json。这个数据可以直接访问。
## 4. .gitignore下添加static/mock，这样git提交仓库时就会忽略这个文件夹。
## 5. 修改axios访问地址
找到cogfig目录下的index.js找到module.export下的dev选项：
给proxyTable添加内容：
```js
proxyTable: {
  '/api': { // 当请求'/api'路径时
    target: 'http://localhost:8080', // 转发到8080端口上
    pathRewrite: { // 重写路径地址（作用是替换地址）
      '^/api': '/static/mock'
    }
  }
}
```
这样，当访问api/时，实际上是访问/static/mock。



# city页面路由配置
## 1. 创建City组件
> src文件夹>pages文件夹>新建city文件夹>新建父组件City.vue+Components(中含有各种子组件)

## 2. 配置路由
找到router目录下的index.js
引用+配置
```js
import City from '@/pages/city/City.vue'
...
{
  path: '/city',
  name: 'City',
  component: City
}
```
这之后，在8080端口后面加/City，就能访问到City组件的内容了。

## 3. router-link标签(vue中的a标签)
**to='跳转地址'** 相当于a链接中的href属性！
```html
<router-link to='/city'>
  <div class="header-right">
    {{this.city}}
    <span class="iconfont arrow-icon">&#xe65a;</span>
  </div>
</router-link>
```
点击之后就可以完成从Home页到City页的跳转！

## 4. router-link的颜色
给它下面的那个div设置class，然后自定义颜色即可。比如说上面的.header-right。

# 城市选择页的列表布局
## 1. 修改1像素边框颜色
```css
.border-topbottom
  &:before
    border-color #ccc
  &:after
    border-color #ccc
```

## 2. 子元素有float时，父元素用overflow:hidden;清除浮动。
## 3. 通过padding来给右侧预留字母条的空间。
## 4. 通过给list区域设置overflow:hidden;和绝对定位来固定显示的页面，达到禁止上下滚动的效果。
```css
.list
  overflow hidden
  position absolute
  top 1.58rem 
  left 0
  bottom 0
  right 0
```
（top 1.58rem 是给上面的标题和搜索框留出位置，
overflow hidden 将溢出的文档部分隐藏。）

# 用better-scroll来实现原生app上下滑动的效果
## 1. 第三方包better-scroll（它是Iscroll的封装，优于Iscroll）
https://github.com/ustbhuangyi/better-scroll
## 2. 安装
> npm run better-scroll --save
## 3. 规定
```js
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
</div>
```
根据官网的规定，它的DOM结构是div下一个ul这样的结构，因此就需要在div下创建一个div，将列表布局的三个区域（当前城市、热门城市、字母区）包裹起来充当ul，下面的三个区域充当li。

具体的使用方式：
```js
The simplest initialization code is as follow:

import BScroll from '@better-scroll/core'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```
上面的意思是：先引包，然后给最外层div设置一个属性名为wrapper，最后new一个BScroll。

## 4. 使用
(1) ref被用来给元素或子组件注册引用信息。

引用信息将会注册在父组件的 $refs 对象上。

**如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；**

如果用在子组件上，引用就指向组件实例
```html
<div class="list" ref="wrapper">
  <div>
    <div class="area">...</div>
    <div class="area">...</div>
    <div class="area">...</div>
  </div> 
</div>
```
(2) script中引包
```js
import Bscroll from 'better-scroll'
```
(3) 在vue的挂载阶段创建Bscroll对象

this.$refs.wrapper指的就是名为wrapper的DOM元素。
```js
mounted () {
  this.scroll = new Bscroll(this.$refs.wrapper, {
    scrollY: true,
    click: true
  })
}
```



# 右侧字母表区域布局
## 1. 思路
(1) 新建一个组件

(2) 如何布局？绝对定位到右侧，absolute+top让出高度+right0+bottom0。这样就固定到了右侧并且撑满。

(3) ul内容垂直居中，用flex布局实现。
```js
.list
  display flex
  flex-direction column
  justify-content center
  position absolute
  top 1.58rem
  right 0
  bottom 0
  width .4rem
```
(4) li内容水平居中用text-align:center;解决。

# 城市选择页面的动态数据渲染
什么意思呢？在City.vue这个父组件上接收服务器数据，然后再把数据分派到其他子组件上去，减少了http请求，提高性能。

用什么办法接收呢？在父组件City.vue上引入axios来实现ajax数据传输。

## 1. axios使用
http://axios-js.com/zh-cn/docs/#%E4%BB%80%E4%B9%88%E6%98%AF-axios%EF%BC%9F

在用某一个插件时，都是要引包的：import axios from 'axios'

那什么时候请求数据呢？在组件被挂载上的阶段(mounted钩子)调用一个方法，这个方法写axios请求数据的具体配置。
```js
mounted () {
  this.getCityinfo()
},
methods: {
  getCityinfo () {
    axios.get('/api/city.json')
      .then(this.handleGetCityInfoSucc)
  },
  handleGetCityInfoSucc (res) {
    // console.log(res)
    res = res.data
    if (res.ret && res.data) {
      const data = res.data
      this.cities = data.cities
      this.hotCities = data.hotCities
    }
  },
}
```

## 2. 数据的动态渲染
在data下定义所有城市、热门城市的数据。（分别是cities、hotCities）

然后就可以把从服务器上传过来的数据赋值给定义的数据。

之后，通过父子组件传值的形式将父组件中的数据传递到子组件。

> 父传子：在父组件中通过冒号的形式动态传递数据，子组件通过props选项来接收数据。

当子组件通过props接收到了数据后，在需要循环的标签上用v-for来渲染数据即可。

## 3. 双重循环数据的key
当出现多重循环，且父级、子级循环中key值相同时是没有关系的，只要保证当前层级的key值不重复就可以。

## 4. 解决Bscroll因为加载慢而无法生效（城市选择页面无法上下滑动）
https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html
```js
updated () {
  this.scroll.refresh() // 解决加载慢而无法上下滑动的问题
}
```
作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。

# 兄弟组件数据传递（从Alphabet到List，同步跳转）
## 1. 实现同步跳转
实现功能：当点击Alphabet区域中对应的字母，list列表会自动跳转到相应的位置上。

这里的兄弟组件传值方法是从一个子组件传递到共同的父组件然后再分配给另一个子组件。（子1 ==> 父 ==> 子2）

> 子传父：子组件点击触发一个事件，这个事件emit一个自定义事件给父组件。父组件来监听这个事件，当监听到时，就会响应定义在父组件中的事件对应的方法。这样就完成了子组件向父组件传值。

## 2. 传值步骤
(1) 在字母组件中定义这样一个方法，将对应li中的 **字母** 传递到父组件City.vue中。（字母是String）
```js
handleLetterClick (e) {
  this.$emit('change', e.target.innerText)
  // console.log(e.target.innerText)
},
```

(2) 在City组件的data下定义letter，作用是准备存储字母组件中传过来的字母数据。当响应了之前的子组件的事件后，执行一个方法handleLetterChange将子组件数据保存在父组件的letter中。
```js
data () {
  return {
    letter: ''
  }
},
methods: {
  handleLetterChange (letter) {
    this.letter = letter
  }
}
```

(3) 再把letter数据传递给另一个子组件，这个子组件中用props下的letter接收，这样就完成兄弟组件之间的传值。


## 3. 数据监听
思路：当点击的字母区域发生变化时，一路传过来的数据理应也会发生变化，这时就要用到watch来监听这种变化了。
```js
watch: {
  letter () {
    ...
  }
}
```

## 4. 位置跳转
拿到实时变化的 letter 后，如何实现list区域的跳转呢？
better-scroll 包提供了一个方法：
> scrollToElement(el, time, offsetX, offsetY, easing)

https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#scrolltoelementel-time-offsetx-offsety-easing

也就是说，只要找到对应字母的DOM元素，就可以跳过去。

```js
watch: {
  letter () {
    if (this.letter) {
      const element = this.$refs[this.letter][0] // this.$refs[this.letter]获取的是一个数组，下面的[0]才是真的dom元素
      this.scroll.scrollToElement(element)
    }
  }
}
```
解析：

(1) this.letter 是 props 下的 letter，它实际上是你在 Alphabet 组件里点击传过来的字母，实时监听它的变化，字母也就会跟着改变。

(2) 如何找到那个DOM元素？vue通过ref指令动态绑定key值，在list区域的第三块内容标签上加上:ref='key'。这里的key就是cities（所有城市）下的ABCD...如此一来，每个li都绑定了一个字母。（按顺序分别是A、B、...、Z）
```js
<div class="area"
  v-for="(item, key) of cities"
  :key="key"
  :ref="key"
>
```

(3) 所以，我们点哪个字母，就传进去哪个字母，之后就能确定DOM元素。然后用better-scroll提供的scrollToElement方法进行跳转。这样城市列表跳转功能就实现了。

比如，我在Alphabet上点 B，那么这里 this.letter 就是 B，this.$refs['B'][0] 就是城市列表里B开头的 li 内容了。
```js
watch: {
  letter () {
    if (this.letter) {
      const element = this.$refs[this.letter][0]
      this.scroll.scrollToElement(element)
    }
  }
}
```

# 同步滑动
当手指上下滑动Alphabet区域时，list区域也会同时发生页面滑动。

## 1. H5触摸事件
如何实现？通过H5触摸事件：touchstart、touchmove、touchend来实现。
https://blog.csdn.net/fuqinyijiu/article/details/41315123

## 2. 思路
依旧是要确定手指滑动停下的字母是什么。解决问题的关键是找到字母表的下标，从而确定具体的字母。

cities中key值就是A~Z，那么只要创建一个letters字母列表，通过for-in循环遍历cities的key值然后推到letters中，就可以保存好A~Z。大概就是这样的数组：['A', 'B', 'C', ..., 'Z']

随后根据手指和首个li之间距离差值除以每个字母的高度，就能得到这是第几个字母，这就是letters的下标。

有了数组和下标，这样就可以确定对应的字母，然后兄弟组件传值重复上面的跳转。

## 3. 步骤
(1) 计算letters列表，因为它是要用一系列循环来创建的，也就是没办法直接创建，那么这里就要用computed来计算它。
```js
computed: {
  letters () {
    const letters = []
    for(let i in this.cities) {
      letters.push(i)
    }
    return letters
  }
}
```

(2) 确定字母位置，例如字母表A的位置是当前首个li和客户端顶部的距离（e.touches[0].clientY）减去城市选择高度和搜索框的高度（36+43），减去A距离list的高度（offsetTop）。其他字母以此类推都可以取得这段距离
> y = e.touches[0].clientY - (36+43) - this.$refs['A'][0].offsetTop

(3) 确定字母下标。然后将上面的数值除以每个li的高度，就可以算出这是第几个li了。
> index = y / 20

(4) 确定实际字母。letters[index] 就是实际意义上手指滑动到的字母。

(5) 当执行touchmove事件时，调用this.$emit('change', this.letters[index])，将字母传递到City.vue，以后重复同步跳转的逻辑：再传给兄弟组件List.vue执行一系列操作。这样，你在Alphabet上滑动到哪个字母，list就会接受到哪个字母，然后随之跳转。
```js
if (index >= 0 && index < this.letters.length) {
  this.$emit('change', this.letters[index])
}
```

## 4. 性能优化
(1) 首字母A距离list的高度this.$refs['A'][0].offsetTop始终是固定的，所以不必每次调用touchMove方法时都要执行它，因此在data下创建一个startY:0保存它。而这些ABCD都是从City组件中进行axios后拿过来的，所以不可能直接放在data里，因此在数据更新时，重新渲染dom，这时更新的数据放在updated钩子里接收即可。
(2) 我们不需要每次滑动都去传数据，这样的传输频率非常高，耗费性能。而是稍微等一等再传数据，所以要设置一个函数节流，延迟8ms后再去传输数据。
```js
handleTouchMove (e) {
  if (this.touchStatus) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      const touchY = e.touches[0].clientY - 79
      const index = Math.floor((touchY - this.startY) / 20)
      if (index >= 0 && index < this.letters.length) {
        this.$emit('change', this.letters[index])
      }
    }, 8)
  }
}
```

# 城市搜索框的搜索内容部分的逻辑
当点击搜索框时，搜索的内容出现在下方。
## 0. 布局
给search-content区域设置一个BScroll实现滚动效果。（引包，设置ref，创建Bscroll实例。）

## 1. 思路
将搜索框的input和data下的keyword双向数据绑定。一旦用户在搜索框下输入文字，keyword就有内容了，这时对keyword进行watch监听，当它发生变化时，做一系列操作。

什么操作？从父组件中传来cities数据，里面是这样的：
```json
"cities": {
  "A": [{"id": 1, "spell": "aba", "name": "阿坝"}, {...}, ...],
  "B": [{"id": 1, "spell": "beijing", "name": "北京"}, {...}, ...],
  ...
  "Z": [{"id": 1, "spell": "zhangzhou", "name": "漳州"}, {...}, ...]
}
```
对他们进行两层循环（第一次forin循环，第二次foreach循环），然后用indexOf()和keyword对照，如果找到了，就将对象结果推进保存查找结果的list中。

之后在模板的li上循环遍历这个list，将item.name展示到页面上。

## 2. 其他
keyword的监听也可以做一个节流的处理。

如果用户没有输入关键词，keyword就是空的，那就不展示搜索内容，用v-show实现页面隐藏。

如果用户输入的关键词，没有找到对应的数据，根据list列表就是[]，通过一个computed来决定显示另一个li，提示用户没找到匹配项。

如果用户找到了匹配项，那么就展示搜索内容，如果用户点击了某个li，那就实现一个跳转。


# vuex的基础使用
当点击了list上的热门城市后，我们希望把城市名传递给主页和当前城市，让它们也显示选择的城市名。

为了共享数据状态，就要用到vuex。（大中型项目使用它）

https://vuex.vuejs.org/zh/

## 1. 安装
> npm install vuex --save
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```
**注意：在用插件时，要用Vue.use(插件名)**

## 2. 创建store
可以直接在main.js中使用，但是实际上vuex写的东西还是比较多的，所以最好新建一个文件夹来存放vuex创建的仓库store。
```js
import Vue from 'vue'
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    // 公用数据
    city: '北京'
  },
  actions: {
    // 异步方法
  },
  mutations: {
    // 同步时对数据的一些改变
  },
  getters: {
    // 类似于组件中的computed，依赖于state算出新数据，避免数据冗余。
  }
  ...
})
```
之后将相关的逻辑写在store的index.js中，然后再在main.js里引入。

怎么引入？它会自己查找store文件夹下的index.js

> import store from './store'
然后把store放到根实例中，于是所有的子组件都可以用这个store了。
```js
new Vue({
  el: '#app',
  router,
  store, // 注入根组件
  components: { App },
  template: '<App/>'
})
```

## 3. 在组件中如何访问Vuex.Store中的数据呢？
当store被注入到根组件时，其他组件只要通过 this.$store.state.city就能随时访问这个公用数据city了。

this.$store实际上就是store文件夹下index.js中的new Vuex.Store()。

在这个项目中，Home下的城市名和City下的当前城市都可以用 this.$store.state.city 来替换。

## 4. Vuex数据变化的逻辑
https://vuex.vuejs.org/zh/

按照官网的图来看，只要通过dispatch()将组件上的数据传递到Actions，然后通过commit()提交给Mutations，然后在Mutations上执行相关代码改变state中的公用数据，之后就会渲染更新的数据。

(1) 组件中触发点击事件传递数据给Actions。
```js
this.$store.dispatch('action方法名', 组件数据)
```
(2) actions上下文ctx调用commit方法将数据提交给mutations。
```js
actions: {
  actions方法名 (ctx, 组件数据) {
    ctx.commit('mutations方法名', 组件数据)
  }
}
```
(3) mutations响应变更，改变state中的数据。
```js
mutations: {
  mutations方法名 (state, 组件数据) {
    state.数据 = 组件数据
    // 例如：state.city = componentCityData
  }
}
```
(4) state变化重新渲染页面

## 5. 补充
Actions一般是放异步操作代码的，所以如果只是进行简单的同步操作，那么对于公用数据的改变，可以直接通过this.$state.commit()来提交数据给mutations，然后Mutations再响应变更，这就没有必要进行dispatch()了。

## 6. 同理，当点击城市列表下的li和search-content下的li，都可以借助vuex的数据共享来改变主页和当前城市的显示。

# 页面跳转的两种方式
https://router.vuejs.org/zh/guide/essentials/navigation.html

## 1. 声明式（标签式）
```html
<router-link to="...">
  ...
</router-link>
```
还可以变成对应的元素例如，
```html
<router-link to="..." tag="li">
  ...
</router-link>
```

## 2. 编程式
```js
this.$router.push(...)
```


# vuex的高级使用
## 1. 本地存储localStorage
H5有一个新的api用来缓存数据，所以可以把数据保存到localStorage上一份，这样每次刷新页面时，城市就不会发生变化，用的是缓存的数据。
```js
state: {
  city: localStorage.city || '上海'
},
mutations: {
  changeCity (state, city) {
    state.city = city
    localStorage.city = city
  }
}
```

## 2. try {...} catch (e) {...}
有些浏览器没有localStorage或者没有用户没有开启这个功能，就会报错，这是用try catch处理问题。
```js
let defaultCity = '上海'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

// new Vuex.Store()下：
  state: {
    city: defaultCity
  },
  
  mutations: {
    changeCity (state, city) {
      state.city = city
      try {
        localStorage.city = city
      } catch (e) {}
    }
  }
```

## 3. 模块分离
在项目开发中，业务逻辑太多的话就要对业务进行分模块存放，例如可以把state和mutations进行模块分离，然后再引入到index.js中。

## 4. 样式上的改进
Home首页Header区域的右边有个div，里面放的是城市名和一个向下的箭头，这里的宽度本来是定死的，所以当选择了一个大于这个宽度的城市名时，就会发生错行的现象。

为了解决这个问题，给它设置一个min-width和padding，作用是保证没有城市名的时候，这个div也有宽度，这个宽度由min-width的大小撑开。padding的作用是避免名字太长贴边。名字的长度太长也没关系，左边的搜索框利用flex: 1来自动撑开剩下的宽度。

# vuex代码优化（辅助函数）
## 1. mapState
在组件中使用store下的数据时，this.$store.state.city写的太长。可以用vuex中的mapState来改进。

> (1) 引入mapState import { mapState } from 'vuex'

> (2) 通过computed来注入 ...mapState(['city'])，也可以写对象...map({currentCity: 'city'})

> (3) 使用公用数据city （直接写 this.city ）即可。

```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: {
    ...mapState(['city'])
    // ...mapState({currentCity: 'city'})
  }
}
```

## 2. mapMutations
点击事件触发的方法中，this.$store.commit('changeCity', city)太长，用mapMutations来改进。
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    // ...
    ...mapMutations(['changeCity']),
    handleCityClick (city) {
      this.changeCity(city)
      // ...
    }
  }
}
```
## 3. mapGetters
https://vuex.vuejs.org/zh/guide/getters.html

getters也是store上的一个参数，它的作用和vue中的computed类似，它依赖state数据计算新数据，避免数据冗余。
```js
getters: {
  doubleCity (state) {
    return state.city + ' ' + state.city
  }
}
```
如何在组件中使用？
```js
import { mapGetters } from 'vuex'
export default {
  //...
  computed: {
    ...mapGetters(['doubleCity'])
  }
}
```
对应位置直接写 {{ this.doubleCity }} 

## 4. modules
https://vuex.vuejs.org/zh/guide/modules.html

当有多个仓库需要维护时就可以用modules。

# keep-alive优化网页性能
打开浏览器的network选择XHR，发现路由切换都会向服务器发送一个ajax请求，这样非常耗费性能。
## 1. 原因
为什么每次都会发送呢？举个例子，每次切换到首页，Home.vue都会被重新渲染，mounted钩子重新执行一个方法，这个方法会发送ajax请求，于是数据就会被重新获取，这就是问题的原因所在。

## 2. 优化
实际上，数据只要获取一次就行了，每次都获取开销大性能低。

vue中有个标签keep-alive，可以对路由组件进行缓存。
https://cn.vuejs.org/v2/api/#keep-alive

当路由数据被加载过一次后，就把路由的内容放在内存里，下一次重新切换路由时不需要重新执行mounted，直接用缓存里的。
```html
<keep-alive>
  <router-view />
</keep-alive>
```

当组件在 ```<keep-alive>``` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

## 3. 切换不同城市发送不同的参数
```js
axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
```
this.city 来自 store。（通过mapState引入）

## 4. activated 钩子函数（用了keep-alive才会有）
当页面被重新加载时，就会触发这个钩子，借助这个特性先判断本次城市和上一次城市是否相同，如果不相同就执行一系列操作：把当前城市赋值给上一次城市，重发ajax请求。

**注意：首次判断必然会触发下面的方法的。所以不用再mounted中再发送一次请求。**
```js
activated () {
  if (this.lastCity !== this.city) {
    this.lastCity = this.city
    this.getHomeInfo()
  }
}
```

# 300ms延迟问题
之前fastClick是用来解决300ms延迟问题的，但是最新的浏览器修复了这个问题。
给reset.css加上：
```css
html {
  touch-action: manipulation;
}
```

# 动态路由
Recommand.vue下：
```html
<router-link
  tag="li"
  class="item border-bottom"
  v-for="item of list"
  :key="item.id"
  :to="'/detail/' + item.id"
>
  ...
</router-link>
```
```js
{
  path: '/detail/:id', // 动态路由
  name: 'Detail',
  component: Detail
}
```
/detail/ 路径后可以跟一个 :id ，它是一个参数，它可以放到 id 这个变量里。

# 渐变效果
从上到下的渐变效果：
```css
background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))
```

# iconfont重新下载
重新下载项目图标，原来的图标代码是不会变的，只要把下载的最新字体文件替换进去就可以了。
> iconfont.eot svg ttf woff woff2
另外，iconfont.css中的base64要替换成新的代码，其他可以不动。

# 公用图片画廊
有一些组件并不局限于一个位置上使用，所以完全可以公用。

这时给这些公用的组件专门创建一个文件夹 common。

项目中当点击 Banner 时，会跳转到一个画廊上。

所以，这个画廊组件最好放在Banner组件里。

## 1. 布局思路
(1) 将画廊组件引入到Banner里，然后给它设置fixed定位（上下左右都是0就可以占满整个屏幕）、z-index大一点，让它显示到前排（覆盖Banner部分）。

(2) 将图片的显示区域设置到正中间，可以用flex布局。

(3) 对于它的左右滑动轮播，可以用第三方的swiper包：vue-awesome-swiper

(4) 设置分页效果，添加配置选项：https://3.swiper.com.cn/api/pagination/2016/0126/299.html
```js
swiperOptions: {
  pagination: '.swiper-pagination',
  paginationType: 'fraction',
  observer: true, // 当Dom发生变化时 自我监听一次
  observeParents: true
}
```

(5) swiper的结构
```html
<swiper :options="swiperOptions">
  <swiper-slide
    v-for="(item, index) in imgs"
    :key="index"
  >
    <img class="gallery-img" :src="item" />
  </swiper-slide>
  <div class="swiper-pagination"  slot="pagination"></div>
</swiper>
```
注释：swiper-slide标签内放图片，swiper-pagination标签是用来设置页码的。

## 2. 画廊的显示
当点击Banner时，画廊出现。利用点击事件和v-show实现这个功能。

# 详情页Header部分的显示与隐藏效果
## 1. 思路
在mounted钩子上绑定滚动事件。当页面滚动到一定高度时，出现Header部分，当小于这个高度时，Header部分消失。
```js
mounted () {
  window.addEventListener('scroll', this.handleScroll)
}
```
**注意：这里不要用activated钩子，原因是详情页不需要缓存因此没有keep-alive，也就没有activated钩子了。**

## 2. 兼容性
获取滚动的卷起高度会出现一些浏览器的兼容问题。
```js
const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
```

## 3. 显示与隐藏
当top在60-140范围时，让Header出现一个渐隐渐现的效果。

并且只要大于60，就显示这个Header，小于60时，Header隐藏。
（显示和隐藏用v-show配合布尔值实现）

## 4. 渐隐渐现效果
绑定一个动态的style
```html
<div class="header-fixed"
  v-show="!showAbs"
  :style="opacityStyle"
>
...
</div>
```
```js
data () {
  return {
    showAbs: true,
    opacityStyle: {
      opacity: 0
    }
  }
},
```
```js
if (top > 60) {
  let opacity = top / 140
  if (top < 140) {
    this.opacityStyle = { opacity: opacity }
  }
  this.showAbs = false
} else {
  this.showAbs = true
}
```
为什么要除以 140 ？当用户往下滚动时，top逐渐变大，到60时即将执行if判断。

此时opacity逐渐发生变化，6/14... 7/14... 8/14... 最后临界点 14/14

而这些值是赋值给opacity的，这样就控制了透明度。实现了渐隐渐现的效果。

## 5. 全局事件的解绑
scroll事件被绑定在了window上，因此即便跳转到了首页，window上依然会存在一个scroll事件，这个事件并没有被销毁。

所以为了解决它对全局的干扰，需要在Header组件下面进行解绑。
```js
destroyed () {
  window.removeEventListener('scroll', this.handleScroll)
}
```

## 6. z-index: 2
最后不要忘记它的z位置要高于详情页，低于画廊。

# 递归组件与列表
```html
<div v-if="item.children" class="item-children">
  <detail-list :list="item.children"></detail-list>
</div>
```
判断ajax传过来的数据是不是层层包含的，如果当前的item还有一个children成员，那么把它这个children的list也当做一个列表传进去。这样就能实现组件的递归。（自己用自己）

# 动态获取详情页数据
## 1. 获取动态路由参数
之前设置过动态路由，例如
```js
path: '/detail/:id', // 动态路由
```
id中动态保存着来自item.id的数据，而现在详情页面请求数据也需要这样一个参数。这是就可以用到这些数据了。
```js
axios.get('/api/detail.json?id=' + this.$route.params.id)
```
或者这样配置：
```js
axios.get('/api/detail.json', {
  params: {
    id: this.$route.params.id
  }
}
```
于是，当访问不同的详情页面时，就会得到不同的id，发送不同id对应页面的数据。

## 2. keep-aliv组件中的exclude属性
当使用keep-alive标签，组件的mounted只会执行一次，如果想要每次进去都执行ajax获取数据，那么有两种方法可以实现。

(1) 对于组件：把方法写在组件的 activated 钩子上。

(2) 对于keep-alive标签，给它加上一个 exclude = "组件的name"，这个组件就不会缓存了。
```html
<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>
```

## 3. 组件的name的用途
(1) 做递归组件时会用到

(2) keep-alive对某个组件取消缓存的时候

(3) dev-tool中的名字展示

## 4. vue-router的滚动行为
https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

有时打开别的页面，它的位置不是在最顶上，想要让它每次都会都顶部，在new Router()下添加一个方法scrollBehavior。
```js
// 规定路由滚动位置 x y坐标
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

# 基础动画和插槽
对于画廊的显示和隐藏可以用到动画。

https://cn.vuejs.org/v2/guide/transitions.html
## 1. 创建动画vue
```js
<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimation'
}
</script>

<style lang="stylus" scoped>
  .v-enter, .v-leave-to
    opacity 0
  .v-enter-active, .v-leave-active
    transition opacity .5s
</style>
```
将来把画廊组件放在slot对应的位置就行。

## 2. 通过插槽来使用
将动画组件引入到Banner中，将common-gallery作为内容放入动画组件的插槽中。
```html
<fade-animation>
  <common-gallery
    :imgs="bannerImgs"
    v-show="showGallery"
    @close="handleGalleryClose"
  ></common-gallery>
</fade-animation>
```