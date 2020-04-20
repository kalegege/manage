<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="任务名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="任务描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        :formatter="getStatus"
        label="任务状态">
      </el-table-column>
      <el-table-column
        prop="ctime"
        :formatter="dateFormat"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        　　　　<template slot-scope="scope">
        <!--        　　　　　　<el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>-->
        <!--        　　　　　　<el-button type="info" @click="modifyUser(scope.row.phone)">修改</el-button>-->
        　　　　　　<el-button type="info">
                      <span v-if="scope.row.status == 1">关闭</span>
                      <span v-else>开启</span>
                  </el-button>
        　　　　</template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
    import moment from 'moment'
    export default {
        name: 'comment',
        data() {
            return {
                textarea: '',
                commentData:[],
                activeTab:"/task",
                tableData: []
            }
        },
        mounted() {
            this.list();
        },
        methods: {
            list() {
                this.$post('/spider/task/list', {})
                    .then(res => {
                        if (res.code == 1) {
                            this.tableData = res.data;
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
            }
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

