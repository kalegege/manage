<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input
          type="textarea"
          size="medium"
          :autosize="{ minRows: 2, maxRows: 20}"
          placeholder="请输入内容"
          v-model="textarea"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <el-button slot="trigger" size="small" type="primary" @click="insertComment">提交</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="15" v-for='(item,index) in commentData' class="comment-item">
        <div>
          <el-button slot="trigger" size="small" type="danger" @click="deleteComment(item.id)">删除</el-button>
        </div>
        <span >{{item.comment}}</span>
        <el-divider></el-divider>
      </el-col>

    </el-row>

  </div>

</template>

<script>
    export default {
        name: 'comment',
        data() {
            return {
                textarea: '',
                commentData:[],
                activeTab:"/comment"
            }
        },
        mounted() {
            this.list();
        },
        methods: {
            list() {
                this.$post('/spider/comment/list', {})
                    .then(res => {
                        if (res.code == 1) {
                            this.commentData = res.data;
                            this.textarea = '';
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
                    e
                })
            },
            deleteComment(id){
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
            insertComment(){
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
            downloadFile(id, name) {
                let link = document.createElement('a');
                link.setAttribute("download", "");
                link.href = '/api/spider/downloadFile?id=' + id;
                link.download = name;
                link.click();
            },
            uploadFile() {
                let formData = new FormData();
                formData.append("file", $("#file")[0].files[0]);
                this.$postform('/api/spider/uploadFile?fileType=1', formData)
                    .then(res => {
                        if (res.code == 1) {
                            this.list();
                        } else {
                            console.log("获取列表失败");
                        }
                    }).catch(e => {
                    console.log();
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submitUpload() {
                this.$refs.upload.submit();
                this.list();
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

