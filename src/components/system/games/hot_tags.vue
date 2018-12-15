<template>
	<div>
		<div class="title">热门标签列表</div>
		<div class="searchs">
			<label for="search_content">
				标签查询：<el-input clearable id="search_content" v-model="search_content" placeholder="请输入要查询的标签内容"></el-input>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search" @click="getData">查询</el-button>
			<label for="is_show">
				是否显示：<el-select clearable v-model="is_show" placeholder="是否显示">
					<el-option
						id="is_show"
						v-for="item in is_shows"
						:key="item"
						:value="item">
					</el-option>
				</el-select>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search" @click="getData">查询</el-button>
			<el-button type="success" class="add_btn" @click="add">新增</el-button>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>ID</td>
					<td>标签内容</td>
					<td>是否显示</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in dataList">
					<td>{{item.labelId}}</td>
					<td>{{item.labelName}}</td>
					<td>{{item.state==0?'否':'是'}}</td>
					<td><el-button size="mini" type="warning" icon="el-icon-edit" @click="modify(item)">修改</el-button></td>
				</tr>
			</tbody>
		</table>
		<el-dialog
			title="热门标签"
			:visible.sync="dialog_show"
			width="30%"
			center>
			<table class="mini">
				<caption>{{dialog_type}}</caption>
				<tr>
					<td>标签ID</td>
					<td><el-input :disabled="dialog_type=='修改标签'" type="number" v-model="tags_id" placeholder="请输入标签id"></el-input></td>
				</tr>
				<tr>
					<td>标签内容</td>
					<td><el-input v-model="tags_content" placeholder="请输入标签内容"></el-input></td>
				</tr>
				<tr>
					<td>是否显示</td>
					<td>
						<el-select v-model="is_show_dialog" placeholder="是否显示">
							<el-option
								id="is_show"
								v-for="item in is_shows"
								:key="item"
								:value="item">
							</el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit">提交</el-button>
				<el-button @click="dialog_show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {public_data} from '@/public/mixins.js';
export default{
	mixins:[public_data],
	data(){
		return{
			search_content:'',//查询的内容
			is_show:'',//搜索当前是否显示
			is_show_dialog:'',//模态框当前是否显示
			is_shows:['是','否'],//全部是否显示
			dialog_show:false,//模态框是否显示
			dialog_type:'',//当前模态框标题
			tags_id:'',//标签ID
			tags_content:'',//标签内容
			modify_proxy:'',//修改内容存储
		}
	},
	methods:{
		getData(){
			this.$axios.post('http://192.168.108.24:8089/gameLabelManage/showAllLabelList').then((res)=>{
				this.dataList=res.data.data;
			}).catch((err)=>{

			});
		},
		// 新增
		add(){
			this.modal_init();
			this.dialog_show=true;
			this.dialog_type='新增标签';
		},
		// 修改
		modify(data){
			this.modal_init();
			this.modify_proxy=data;
			this.tags_id=data.labelId;
			this.is_show_dialog=data.state==0?'否':'是';
			this.tags_content=data.labelName;
			this.dialog_show=true;
			this.dialog_type='修改标签';
		},
		// 表单信息初始化
		modal_init(){
			this.is_show_dialog="";
			this.tags_content="";
			this.tags_id="";
		},
		submit(){
			// 前端验证
			if(this.tags_id==''||this.tags_content==''||this.is_show_dialog==''){
				this.$message({
		          	message: `操作失败！标签ID、标签内容和是否显示都不可以为空`,
		          	type: 'warning'
		        });
				return;
			}
			if(this.dialog_type=='新增标签'){
				var url='http://192.168.108.24:8089/gameLabelManage/addGameLabel';
				var data={
					labelId:this.tags_id,
				    labelName:this.tags_content,
				    state:this.is_show_dialog=='否'?0:1
				}
			}else{
				var url='http://192.168.108.24:8089/gameLabelManage/updateLabelById';
				var data={
					labelId:this.tags_id,
				    labelName:this.tags_content,
				    state:this.is_show_dialog=='否'?0:1
				}
			}
			this.$axios.post(url,this.$qs.stringify(data)).then((res)=>{
				if(res.data.code!=200){
					this.$message({
			          	message: `${res.data.msg}`,
			          	type: 'error'
			        });
				}else{
					this.dialog_show=false;
					var str=this.dialog_type.substring(0,2);
					this.$message({
			          	message: `${str}成功！`,
			          	type: 'success'
			        });
			        this.getData();
				}
			}).catch((err)=>{
				console.log(err);
			});
		}
	}
}
</script>
<style scoped lang="styl">

</style>