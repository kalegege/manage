<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-upload
        class="uploadFile"
        ref="upload"
        action="/api/spider/uploadFile?fileType=1"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
<!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
<!--      <el-button type="primary" @click="">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
          width="500">
        </el-table-column>
        <el-table-column
          prop="ctime"
          :formatter="dateFormat"
          label="上传时间">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
        　　　　<template slot-scope="scope">
<!--        　　　　　　<el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>-->
<!--        　　　　　　<el-button type="info" @click="modifyUser(scope.row.phone)">修改</el-button>-->
        　　　　　　<el-button type="info" @click="downloadFile(scope.row.id,scope.row.fileName)">下载</el-button>
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
  </div>

</template>

<script>
    import moment from 'moment'
    export default {
        name: 'file',
        data() {
            return {
                tableData: [],
                currentPage:1,
                pageSize:10,
                totalNum:0,
                fileList:[]
            }
        },
        mounted(){
            // this.list();
            // this.page();
        },
        created(){
            this.page();
        },
        methods:{
            list(){
                this.$post('/spider/listFile',{})
                    .then(res=>{
                        if(res.code == 1){
                            this.tableData = res.data;
                        }else{
                            console.log("获取列表失败");
                        }
                    }).catch(e=>{
                    console.log();
                })
            },
            page(){
                this.$post('/spider/pageFile',{pageNum:this.currentPage,numPerPage:this.pageSize})
                    .then(res=>{
                        if(res.code == 1){
                            this.tableData = res.data.recordList;
                            this.currentPage = res.data.currentPage;
                            this.pageSize = res.data.numPerPage;
                            this.totalNum = res.data.totalCount;
                        }else{
                            console.log("获取列表失败");
                        }
                    }).catch(e=>{
                    console.log();
                })
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
            downloadFile(id,name){
                let link = document.createElement('a');
                link.setAttribute("download", "");
                link.href = '/spider/downloadFile?id=' + id;
                link.download = name;
                link.click();
            },
            uploadFile(){
                let formData = new FormData();
                formData.append("file", $("#file")[0].files[0]);
                this.$postform('/spider/uploadFile?fileType=1',formData)
                    .then(res=>{
                        if(res.code == 1){
                            this.list();
                        }else{
                            console.log("获取列表失败");
                        }
                    }).catch(e=>{
                    console.log();e
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
            },
            dateFormat:function(row,column) {
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        filter:{
            dateFormat(){

            }
        }
    }
</script>

<style>
  .uploadFile{
    margin-top:20px;
    float: left;
  }
</style>

