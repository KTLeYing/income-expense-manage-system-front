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
            <el-button class="btExport" type="info">导出</el-button>
            <el-button class="btAddTable" type="success">添加</el-button>
            <el-button class="btDelTable" type="warning">删除选中</el-button>
          </div>
          <div class="tableCondition">
            <el-row>
              <el-form  :inline="true"  class="demo-form-inline tableCondition1">
                <el-form-item label="备注">
                  <el-input  placeholder="输入备注" style="width: 130px"></el-input>
                </el-form-item>
                <el-form-item label="父类型">
                  <el-input  placeholder="输入父收支类型" style="width: 130px"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="选择年月日"
                    :picker-options="pickerOptions" style="width: 130px">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="年月">
                  <el-date-picker
                    v-model="value2"
                    type="month"
                    placeholder="选择年月" style="width: 130px">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-form>
            </el-row>
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
              prop="note"
              label="备注"
              sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="num"
              label="金额"
              sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="parentCategory"
              label="父类型"
              sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="sonCategory"
              label="子类型"
              sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="时间"
              sortable
              width="140">
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
        queryParam: {
          note: "",
          parentCategory: "",
          sonCategory: "",
          realCreateTime: "",
          realCreateTimeTwo: "",
          currentPage: 1,
          pageSize: 10
        },
        sZRecordlist: [],
        total: 0,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
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
      // get 方法还是post？
      // 你后台不支持get？
      async getSZRecordlist() {
        this.$axios.get('/iERecord/selectPageRecord',{params: this.queryParam}
        ).then((res) => {
          console.log(res);
          if (res.data.code !== 200) {
            return false;
          }
          this.sZRecordlist = res.data.data.records;
          this.total = res.data.data.total;
        }).catch(err => {
          //请求出现异常
          console(err);
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
        })
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
    width: 58%;
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
  .btExport{
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
  .tableCondition{
    padding-top: 10px;
    width: 100%;
    height: 50px;
  }
  .tableCondition1{
    float: left;
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
