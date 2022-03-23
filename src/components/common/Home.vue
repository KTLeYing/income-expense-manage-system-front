<template>
    <div class="main">
      <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect">
          <div class="title">
            <span class="sysName">智能收支管理平台</span>
          </div>
          <el-menu-item class="menu-item" index="1">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="2">消息中心</el-menu-item>
          <el-menu-item class="menu-item" index="3"><!--<a href="https://www.ele.me" target="_blank">-->订单管理<!--</a>--></el-menu-item>
          <el-menu-item class="menu-item" index="4">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="5">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="6">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="7">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="8">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="9">处理中心</el-menu-item>
          <el-menu-item class="menu-item" index="10">处理中心</el-menu-item>
          <el-submenu class="menu-item" index="11">
            <template class="menu-item" slot="title">个人中心</template>
            <el-menu-item index="11-1">个人中心</el-menu-item>
            <el-menu-item index="11-2">修改密码</el-menu-item>
            <el-menu-item index="11-3">
              <router-link :to="{path: '/'}">
                <a class="logout" href="" target="_blank" align="right">退出登录</a>
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="body">
        <div class="table">

        </div>
        <div class="newsList">

        </div>
      </div>
      <div class="foot">
        <span class="footName">CopyRight Powered By MZL.2022</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Home",
    components: {},
    props: [],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },

  }
</script>

<style scoped>
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    /*垂直居中*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    background-color: #FAFAFA;
  }
  .header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }
  .title{
    padding-left: 3%;
    padding-top: 0.5%;
    font-size: 27px;
    padding-right: 5%;
    float: left;
    font-weight: bold;
    background: linear-gradient(to right, red, blue);
    -webkit-background-clip: text;
    color: transparent;

  }
  .menu{
    background-color: #ECEFF1;
    color: black;
  }
  a{
    text-decoration: none;
  }
  .logout{
    color: gray;
  }
  .foot{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ECEFF1;
  }
  .footName{
    color: gray;
    font-weight: bold;
    font-size: 14px;
  }
  .body{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .table{
    background: #42b983;
    width: 60%;
    height: 150%;
  }
  .newsList{
    background: #4DD0E1;
    width: 30%;
    height: 150%;
  }
  .menu-item{
    font-size: 15px;
    font-weight: bold;
  }
</style>
