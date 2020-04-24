<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>配置管理</el-breadcrumb-item>
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
        prop="dataType"
        label="数据类别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dataCode"
        label="数据编码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dataValue"
        label="数据值">
      </el-table-column>
      <el-table-column
        prop="dataDesc"
        label="数据描述">
      </el-table-column>
      <el-table-column
        prop="ctime"
        :formatter="dateFormat"
        label="创建时间">
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
                tableData:[],
                activeTab:"/config"
            }
        },
        mounted() {
            this.list();
        },
        methods: {
            list() {
                this.$post('/spider/config/list', {})
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
            deleteConfig(id){
                this.$post("/spider/config/delete",{id:id})
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
            insertConfig(){
                this.$post("/spider/config/insert",{comment:this.textarea})
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
            dateFormat:function(row,column) {
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        filter: {
            dateFormat() {

            }
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

