# travel

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

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



