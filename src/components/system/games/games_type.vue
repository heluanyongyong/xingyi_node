<template>
	<div>
		<div class="title">游戏类型</div>
		<div class="searchs">
			<label for="search_content">
				游戏类型：<el-input clearable id="search_content" v-model="search_content" placeholder="请输入要查询的游戏类型"></el-input>
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
					<td>游戏类型</td>
					<td>是否显示</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in dataList">
					<td>{{item.gameTypeId}}</td>
					<td>{{item.type}}</td>
					<td>{{item.isShow}}</td>
					<td><el-button size="mini" type="warning" icon="el-icon-edit" @click="modify(item)">修改</el-button></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="11">
						<!-- 分页组件 -->
						<pagesComponent :pages="pages" @change_page="change_page"></pagesComponent>
					</td>
				</tr>
			</tfoot>
		</table>
		<el-dialog
			title="游戏类型"
			:visible.sync="dialogShow"
			width="30%"
			center>
			<table class="mini">
				<caption>{{dialogType}}</caption>
				<tr>
					<td>游戏类型</td>
					<td><el-input v-model="games_type" placeholder="请输入游戏类型"></el-input></td>
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
				<el-button @click="dialogShow = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import pagesComponent from '@/public/pages.vue';
import {public_data} from '@/public/mixins.js';

export default{
	components:{
		pagesComponent:pagesComponent
	},
	mixins:[public_data],
	data(){
		return{
			search_content:'',//查询的内容
			is_show:'',//搜索当前是否显示
			is_show_dialog:'',//模态框当前是否显示
			is_shows:['是','否'],//全部是否显示
			games_type:'',//游戏类型
			modify_proxy:[],//点击修改模态框、保存相应数据
		}
	},
	methods:{
		getData(){
			this.$axios.get(`/infos/game_type_get
				?page=${this.page}
				&type=${this.search_content}
				&isShow=${this.is_show}`).then((res)=>{
				this.dataList=res.data.rows;
				this.pages=res.data.pages;
			}).catch((err)=>{
				console.log(err);
			});
		},
		add(){
			this.modal_init();
			this.dialogShow=true;
			this.dialogType='新增类型';
		},
		modify(data){
			this.modal_init();
			this.modify_proxy=data;
			this.is_show_dialog=data.isShow;
			this.games_type=data.type;
			this.dialogShow=true;
			this.dialogType='修改类型';
		},
		modal_init(){
			this.is_show_dialog='';
			this.games_type='';
		},
		submit(){
			// 前端验证
			if(this.games_type==''||this.is_show_dialog==''){
				this.$message({
		          	message: `操作失败！游戏类型和是否显示都不可以为空`,
		          	type: 'warning'
		        });
				return;
			}
			if(this.dialogType=='新增类型'){
				var url='/infos/game_type_add';
				var data={
					type:this.games_type,
					isShow:this.is_show_dialog
				}
			}else{
				var url='/infos/game_type_modify';
				var data={
					gameTypeId:this.modify_proxy.gameTypeId,
					type:this.games_type,
					isShow:this.is_show_dialog
				}
			}
			this.$axios.post(url,this.$qs.stringify(data)).then((res)=>{
				this.dialogShow=false;
				var str=this.dialogType.substring(0,2);
				this.$message({
		          	message: `${str}成功！`,
		          	type: 'success'
		        });
		        this.getData();
			}).catch((err)=>{
				console.log(err);
			});
		}
	}
}
</script>
<style scoped lang="styl">

</style>