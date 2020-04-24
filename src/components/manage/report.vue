<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>研报中心</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form :inline="true" ref="search" :model="search" label-width="100px">
      <el-form-item label="研报名称">
        <el-input v-model="search.reportName" ></el-input>
      </el-form-item>
      <el-form-item label="研报类型">
        <el-select v-model="search.reportType" placeholder="请选择研报类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="CBDIO" value="CBDIO"></el-option>
          <el-option label="SUFE" value="SUFE"></el-option>
          <el-option label="CNNIC" value="CNNIC"></el-option>
          <el-option label="GSDATA" value="GSDATA"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="search.time"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="page">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="reportName"
        label="研报名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="reportType"
        label="研报类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="reportTypeName"
        label="研报分类"
        width="100">
      </el-table-column>
      <el-table-column
        prop="reportTitle"
        label="研报标题">
      </el-table-column>
      <el-table-column
        prop="reportDesc"
        label="研报描述"
        width="500">
      </el-table-column>
      <el-table-column
        prop="ctime"
        :formatter="dateFormat"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        　　　　<template slot-scope="scope">
        <!--        　　　　　　<el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>-->
                　　　　　　<el-button type="info" @click="view(scope.row)">查看</el-button>
<!--        　　　　　　<el-button type="info">-->
<!--                      <span v-if="scope.row.status == 1">查看</span>-->
<!--                      <span v-else>开启</span>-->
<!--                  </el-button>-->
        　　　　</template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
  </div>

</template>

<script>
    import moment from 'moment'
    export default {
        name: 'comment',
        data() {
            return {
                textarea: '',
                search:{
                    reportName:"",
                    reportType:"",
                    time:""
                },
                commentData:[],
                activeTab:"/report",
                tableData: [],
                currentPage: 1,
                pageSize:10,
                totalNum:0,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        mounted() {
            this.page();
        },
        methods: {
            page() {
                this.$post('/spider/report/page', {
                    "reportName":this.search.reportName,
                    "reportType":this.search.reportType,
                    "startTime":this.search.time[0],
                    "endTime":this.search.time[1],
                    "pageNum":this.currentPage,
                    "numPerPage":this.pageSize
                })
                    .then(res => {
                        if (res.code == 1) {
                            this.tableData = res.data.recordList;
                            this.currentPage = res.data.currentPage;
                            this.pageSize = res.data.numPerPage;
                            this.totalNum = res.data.totalCount;
                            this.$notify({
                                title: '成功',
                                message: '获取列表成功',
                                type: 'success'
                            });
                        } else {
                            console.log("获取列表失败");
                        }
                    }).catch(e => {
                    console.log();
                })
            },
            deleteTask(id){
                this.$post("/spider/comment/delete",{id:id})
                    .then(res => {
                        if (res.code == 1) {
                            this.list();
                        } else {

                            console.log("删除评论失败");
                        }
                    }).catch(e => {
                    console.log();
                })
            },
            insertTask(){
                this.$post("/spider/comment/insert",{comment:this.textarea})
                    .then(res => {
                        if (res.code == 1) {
                            this.list();
                        } else {
                            console.log("插入评论列表失败");
                        }
                    }).catch(e => {
                    console.log();
                })
            },
            getStatus:function(row, column, cellValue, index){
                return cellValue == 1 ? "开启" : "关闭";
            },
            getText(){

            },
            dateFormat:function(row,column) {
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            view(row){
                    window.open(row.reportUrl);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.page();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.page();
            },
        },
        filter: {
        }
    }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .comment-item{
    text-align: left;
  }
</style>

