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
1. 在main.js中引基础样式和解决1像素问题的样式（reset.css border.css）
```
import './assets/styles/reset.css'
import './assets/styles/border.css'
```

2. 解决移动端300ms点击事件延迟问题（npm install fastclick --save）
```
import fastClick from 'fastclick'
fastClick.attach(document.body)
```

3. 在iconfont网上新建项目文件夹 ==>
https://www.iconfont.cn/
