<template>
	<div>
		<div class="title">用户列表</div>
		<div class="searchs">
			<label for="search_content">
				内容查询：<el-input clearable id="search_content" v-model="search_content" placeholder="请输入要查询的内容"></el-input>
			</label>
			<label for="loginTime">
				时间查询：<el-date-picker
					id="loginTime"
					class="bothdate"
			    	v-model="loginTime"
			    	type="datetimerange"
			    	range-separator="至"
			    	start-placeholder="开始日期"
			    	end-placeholder="结束日期">
			    </el-date-picker>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
			<div class="mt25">
				<label for="other_login">
					第三方登陆：<el-select clearable v-model="other_login" placeholder="请选择第三方登陆方式">
						<el-option
							id="other_login"
							v-for="item in other_logins"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="user_state">
					用户状态：<el-select clearable v-model="user_state" placeholder="请选择用户状态">
						<el-option
							id="user_state"
							v-for="item in user_states"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
			</div>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>用户ID</td>
					<td>帐号</td>
					<td>第三方登陆</td>
					<td>真实姓名</td>
					<td>手机号</td>
					<td>性别</td>
					<td>出生年月</td>
					<td>金元宝</td>
					<td>注册页面</td>
					<td>用户状态</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in 10">
					<td>1000001</td>
					<td>xiaobai</td>
					<td>微信</td>
					<td>小白</td>
					<td>12344455568</td>
					<td>女</td>
					<td>2018-11-12</td>
					<td>100</td>
					<td>2018-11-13 10:13:15</td>
					<td>正常</td>
					<td><el-button size="mini" type="primary" icon="el-icon-search" @click="dialog_show = true">查看</el-button></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="11">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="1000">
						</el-pagination>
					</td>
				</tr>
			</tfoot>
		</table>
		<el-dialog
			title="用户详情"
			:visible.sync="dialog_show"
			width="30%"
			center>
			<table>
				<caption>基本信息</caption>
				<tr>
					<td>用户ID</td>
					<td>1000001</td>
				</tr>
				<tr>
					<td>账户</td>
					<td>xiaobai</td>
				</tr>
				<tr>
					<td>真实姓名</td>
					<td>小白</td>
				</tr>
				<tr>
					<td>第三方帐号</td>
					<td>微信</td>
				</tr>
				<tr>
					<td>手机号</td>
					<td>12344455568</td>
				</tr>
				<tr>
					<td>性别</td>
					<td>女</td>
				</tr>
				<tr>
					<td>星币</td>
					<td>100</td>
				</tr>
				<tr>
					<td>账户状态</td>
					<td>
						<el-select v-model="account_state_dafault" disabled placeholder="请选择">
					    	<el-option
					    		v-for="item in account_states"
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
						<el-select v-model="account_state" placeholder="请选择账户状态">
					    	<el-option
					    		v-for="item in account_states"
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
				<el-button @click="dialog_show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style scoped lang="styl">
</style>
<script>
export default{
	data(){
		return{
			//搜索内容
			search_content:'',
			//搜索时间
			loginTime:'',
			other_login:'',//搜索当前第三方登陆方式
			other_logins:['QQ','微信','微博','新浪'],//所有第三方登陆方式
			user_state:'',//当前用户状态
			user_states:['正常','禁用'],//所有用户状态
			// 查看模态框是否显示/隐藏
			dialog_show:false,
			// 当前用户的状态--不可更改
			account_state_dafault:'正常',
			// 当前用户状态--可更改
			account_state:'',
			// 所有用户状态
			account_states:['正常','暂停']
		}
	},
	methods:{
		submit(){
			this.dialog_show=false;
			this.$message({
	          	message: `提交成功！`,
	          	type: 'success'
	        });
		}
	}
}
</script>