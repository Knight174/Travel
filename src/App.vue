<template>
  <div id="app">
    <!-- keep-alive的作用是缓存当前路由页面的内容，每次重新访问时读取缓存，不用再次请求数据 -->
    <keep-alive exclude="Detail">
      <!-- 显示的是 当前路由地址 所对应的内容 -->
      <router-view/>
    </keep-alive>
  </div>
</template>
