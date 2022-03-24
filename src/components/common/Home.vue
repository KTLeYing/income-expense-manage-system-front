<template>
    <div class="main">
      <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect">
          <div class="title">
            <span class="sysName">智能收支管理平台</span>
          </div>
          <el-menu-item class="menu-item" index="1">收支记录</el-menu-item>
          <el-menu-item class="menu-item" index="2">收支统计</el-menu-item>
          <el-menu-item class="menu-item" index="3"><!--<a href="https://www.ele.me" target="_blank">-->收支分析<!--</a>--></el-menu-item>
          <el-menu-item class="menu-item" index="4">收支预算</el-menu-item>
          <el-menu-item class="menu-item" index="5">收支类型</el-menu-item>
          <el-menu-item class="menu-item" index="6">心愿单</el-menu-item>
          <el-menu-item class="menu-item" index="7">备忘录</el-menu-item>
          <el-menu-item class="menu-item" index="8">新闻中心</el-menu-item>
          <el-menu-item class="menu-item" index="9">公告中心</el-menu-item>
          <el-menu-item class="menu-item" index="10">用户反馈</el-menu-item>
          <el-submenu class="menu-item" index="11">
            <template class="menu-item" slot="title">个人中心</template>
            <el-menu-item index="11-1">我的信息</el-menu-item>
            <el-menu-item index="11-2">修改密码</el-menu-item>
            <el-menu-item index="11-3">
              <router-link :to="{path: '/'}">
                <a class="logout" href="" target="_blank" align="right">退出登录</a>
              </router-link>
            </el-menu-item>
          </el-submenu>
          <div class="currentUser">
            <a class="userName">当前用户: <span class="userValue" :data="currentUserName"></span></a>
          </div>
        </el-menu>
      </div>
      <div class="body">
        <div class="table">
          <div class="tableHead">
            <span class="tableTitle">收支记录表</span>
            <el-button class="btTable" type="primary">导出</el-button>
            <el-button class="btAddTable" type="primary">添加</el-button>
            <el-button class="btDelTable" type="primary">删除选中</el-button>
          </div>
          <el-table
            :data="sZRecordlist"
            stripe
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
        <div class="newsList">
<!--          <div class="newsHead">-->
<!--            <span class="newsTitle">热点新闻</span>-->
<!--          </div>-->
<!--          <div>-->
<!--            -->
<!--          </div>-->
          <el-card class="box-card">
            <div slot="header" class="newsHead clearfix">
              <span>热点新闻</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item cardItem">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
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
        currentUserName: this.$currentUser,
        activeIndex: '1',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        queryInfo: {
          query: "",
          pagenum: 1,
          pagesize: 10
        },
        goodslist: [],
        total: 0
      }
    },
    computed: {},
    watch: {},
    created() {
      this.getSZRecordlist();
    },
    mounted() {
    },
    methods: {
      async getSZRecordlist() {
        this.$axios.get('/incomeExpense/iERecord/selectPageRecord',{params: {
              "username": this.formData.username,
              "password": this.formData.password,
              "verifyCode": this.formData.verifyCode
            }
          }
        ).then((res) => {
          console.log(res);
          console.log(res.response);
          if (res.data.code != 203){
            //返回码不为203则登录失败
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            });
            return false;
          }
          //登录成功后的其他处理
          //登录成功后的其他处理
          //设置存储token处理
          this.userToken = res.headers['authorization'];  //从请求头获取token
          // sessionStorage.setItem('Authorization', this.userToken);
          // this.changeLogin({Authorization: this.userToken});
          localStorage.setItem('Authorization', this.userToken)
          // 将登录名使用vuex传递到Home页面
          //提示登录成功
          this.$message({
            showClose: true,
            message: '登录成功！',
            type: 'success'
          });
          //登录成功处理后跳转到首页
          this.$router.push('/home'); //通过请求路径路由跳转
        }).catch(err => {
          //请求出现异常则登录失败
          console(err);
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
        })

        if (data.meta.status !== 200) {
          return this.$message.error(data.meta.msg);
        }
        this.goodslist = data.data.goods;
        this.total = data.data.total;
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      formatter(row, column) {
        return row.address;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FAFAFA;
  }
  .title{
    padding-left: 3%;
    font-size: 27px;
    padding-right: 2%;
    float: left;
    font-weight: bold;
    background: linear-gradient(to right, red, blue);
    -webkit-background-clip: text;
    color: transparent;

  }
  .userName{
    font-size: 15px;
    background: linear-gradient(to right, #3D5AFE, #F4511E);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: bold;
    padding-right: 10px;
  }
  .userValue{
    font-size: 15px;
    font-weight: normal;
    padding-right: 10px;
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
  .footName{
    color: gray;
    font-weight: bold;
    font-size: 14px;
  }
  .header{
    width:100%;
    height:4rem;
    line-height:4rem;
    position:absolute;
    z-index:5;
    top:0;
    text-align:center;
    opacity: 0.7;
  }
  .body{
    background:pink;
    width:100%;
    overflow:auto;
    top:4rem;
    position:absolute;
    z-index:10;
    bottom:2rem;
    display: flex;
    justify-content:space-between;       /*2*/
    align-items: center;                 /*3*/
  }
  .foot{
    height:2rem;
    line-height:2rem;
    background: #ECEFF1;
    width:100%;
    position:absolute;
    z-index:200;
    bottom:0;
    text-align:center;
  }
  .table{
    background: #42b983;
    margin-left: 4%;
    margin-top: 40%;
    width: 56%;
    height: 180%;
  }
  .newsList{
    background: #4DD0E1;
    margin-right: 3%;
    margin-top: 40%;
    width: 30%;
    height: 180%;
  }
  .menu-item{
    font-size: 15px;
  }
  .block{
    float: left;
  }
  .btTable{
    float: right;
  }
  .btAddTable{
    float: right;
    margin-right: 10px;
  }
  .btDelTable{
    float: right;
  }
  .tableTitle{
    float: left;
    font-weight: bold;
    font-size: 25px;
  }
  .tableHead{
    width: 100%;
    height: 50px;
  }
  .newsHead{
    font-size: 30px;
    text-align: left;
    width: 100%;
    height: 50px;
    font-weight: bold;
    /*background: #303F9F;*/
  }
  .cardItem{
    height: 20px;
    text-align: left;
    padding-top: 30px;
  }
</style>
