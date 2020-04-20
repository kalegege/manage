<template>
  <!--    <img src="./assets/logo.png">-->
  <el-container id="app">
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </el-header>
    <el-container class="container-button">
      <el-aside width="201px">
        <el-menu router default-active="/file" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">业务中心</span>
            </template>
            <el-menu-item-group>
              <span slot="title">管理中心</span>
              <el-menu-item index="/file">文件管理</el-menu-item>
              <el-menu-item index="/comment">评论管理</el-menu-item>
              <el-menu-item index="/config">配置管理</el-menu-item>
              <el-menu-item index="/task">任务管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2" disabled>
            <i class="el-icon-menu"></i>
            <span slot="title">菜单中心</span>
          </el-menu-item>
          <el-menu-item index="5" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">其他管理</span>
          </el-menu-item>
          <el-menu-item index="4"  disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">配置中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main height="800px">
        <router-view/>
      </el-main>
    </el-container>
    <el-footer>版权所有，翻录必究</el-footer>
  </el-container>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                isCollapse: false,
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-footer{
    position:fixed;
    bottom:0px;
    z-index:-1;
  }

  .el-main{
    padding-bottom:60px;
  }

</style>
