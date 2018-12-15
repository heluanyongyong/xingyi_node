<template>
	<div>
		<div class="title">用户列表</div>
		<div class="searchs">
			<div>
				<timeSearchComponent @change_time="change_searchTime"></timeSearchComponent>
				<label for="loginType">
					登陆方式：<el-select clearable v-model="loginType" placeholder="请选择登陆方式">
						<el-option
							id="loginType"
							v-for="item in loginTypes"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="userState">
					用户状态：<el-select clearable v-model="userState" placeholder="请选择用户状态">
						<el-option
							id="userState"
							v-for="item in userStates"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<el-button class="mr25" type="primary" icon="el-icon-search" @click="search">查询</el-button>
			</div>
			<div class="mt25">
				<label for="searchType">
					内容查询：<el-select clearable v-model="searchType" placeholder="请选择查询类别">
						<el-option
							id="searchType"
							v-for="item in searchTypes"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="searchContent">
					<el-input clearable id="searchContent" v-model="searchContent" placeholder="请输入要查询的内容"></el-input>
				</label>
				<el-button class="mr25" type="primary" icon="el-icon-search" @click="search">查询</el-button>
			</div>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>用户ID</td>
					<td>帐号</td>
					<td>登陆方式</td>
					<td>真实姓名</td>
					<td>手机号</td>
					<td>性别</td>
					<td>出生年月</td>
					<td>金元宝</td>
					<td>注册时间</td>
					<td>用户状态</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in dataList">
					<td>{{item.userId}}</td>
					<td>{{item.userAccount}}</td>
					<td>{{item.loginType}}</td>
					<td>{{item.userName}}</td>
					<td>{{item.phone}}</td>
					<td>{{item.sex}}</td>
					<td>{{item.brith}}</td>
					<td>{{item.money}}</td>
					<td>{{item.registerTime|filter_time}}</td>
					<td>{{item.userState}}</td>
					<td><el-button size="mini" type="primary" icon="el-icon-search" @click="look_modal(item)">查看</el-button></td>
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
			title="用户详情"
			:visible.sync="dialogShow"
			width="30%"
			center>
			<table>
				<caption>基本信息</caption>
				<tr>
					<td>用户ID</td>
					<td>{{lookPro.userId}}</td>
				</tr>
				<tr>
					<td>账户</td>
					<td>{{lookPro.userAccount}}</td>
				</tr>
				<tr>
					<td>真实姓名</td>
					<td>{{lookPro.userName}}</td>
				</tr>
				<tr>
					<td>第三方帐号</td>
					<td>{{lookPro.loginType}}</td>
				</tr>
				<tr>
					<td>手机号</td>
					<td>{{lookPro.phone}}</td>
				</tr>
				<tr>
					<td>性别</td>
					<td>{{lookPro.sex}}</td>
				</tr>
				<tr>
					<td>星币</td>
					<td>{{lookPro.money}}</td>
				</tr>
				<tr>
					<td>账户状态</td>
					<td>
						<el-select v-model="userStateDefault" disabled placeholder="请选择">
					    	<el-option
					    		v-for="item in userStates"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
			</table>
			<table>
				<caption class="cap2">修改信息</caption>
				<tr>
					<td>账户状态</td>
					<td>
						<el-select clearable v-model="userStateChange" placeholder="请选择账户状态">
					    	<el-option
					    		v-for="item in userStates"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td colspan="2"><el-button type="primary" @click="submit">提交</el-button></td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogShow = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style scoped lang="styl">
</style>
<script>
import pagesComponent from '@/public/pages.vue';
import timeSearchComponent from '@/public/timeSearch.vue';
import {public_data} from '@/public/mixins.js'
export default{
	components:{
		pagesComponent:pagesComponent,//分页组件
		timeSearchComponent:timeSearchComponent,//时间查询组件
	},
	mixins:[public_data],
	data(){
		return{
			lookPro:[],//查看所记录的相应数据
			searchType:'',//所选查询类别
			searchTypes:['账号','真实姓名','手机号'],//所有查询类别
			searchContent:'',//搜索内容
			time:'',//搜索时间
			loginType:'',//搜索当前登陆方式
			loginTypes:['星移账号','QQ','微信','微博','新浪','支付宝'],//所有登陆方式
			userState:'',//当前用户状态--搜索
			userStates:['正常','禁用'],//所有用户状态
			userStateChange:'',//当前用户状态--可更改
			userStateDefault:'',// 当前用户的状态--不可更改
		}
	},
	methods:{
		getData(){
			// 请求后台数据
			this.$axios.get(`/infos/user_list_get
				?page=${this.page}
				&loginType=${this.loginType}
				&userState=${this.userState}
				&time=${this.time}
				&searchType=${this.searchType}
				&searchContent=${this.searchContent}
				`).then((res)=>{
				this.dataList=res.data.rows;
				this.pages=res.data.pages;
			}).catch((err)=>{
				console.log(err);
			});
			// this.$axios.post(`http://192.168.108.24:8089/userManage/findUserListByFactor`).then((res)=>{
			// 	console.log(res.data);
			// }).catch((err)=>{
			// 	console.log(err);
			// });
		},
		// 点击查询
		search(){
			// 前端类型验证
			if(this.searchType==''&&this.searchContent!=''){
				this.$message({
		          	message: `您还未选择查询类别`,
		          	type: 'warning'
		        });
			}else{
				this.getData();
			}
		},
		// 点击查看
		look_modal(item){
			// 点击查看时，保存相关记录
			this.lookPro=item;
			// 查看表单时的默认状态、提前保存
			this.userStateDefault=item.userState;
			// 清除表单内容
			this.userStateChange='';
			this.dialogShow=true;
		},
		// 点击提交
		submit(){
			// 前端验证、不为空则发送请求给后台
			if(this.userStateChange==''){
				this.$message({
		          	message: `您还未选择用户状态`,
		          	type: 'warning'
		        });
			}else{
				// 发送修改状态请求
				this.$axios.post('/infos/user_list_post',this.$qs.stringify({
					userId:this.lookPro.userId,
					state:this.userStateChange
				})).then((res)=>{
					// 请求失败
					if(res.data.code!=0){
						this.$message({
				          	message: `${res.data.type}`,
				          	type: 'error'
				        });
					}else{
					// 请求成功
						this.dialogShow=false;
						this.$message({
				          	message: `${res.data.type}`,
				          	type: 'success'
				        });
				        // 刷新数据
				        this.getData();
					}
				}).catch((err)=>{
					console.log(err);
				});
			}
		}
	}
}
</script>