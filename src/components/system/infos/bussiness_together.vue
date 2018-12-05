<template>
	<div>
		<div class="title">商务合作</div>
		<div class="searchs">
			<label for="search_content">
				内容查询：<el-input id="search_content" v-model="search_content" placeholder="请输入要查询的内容"></el-input>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
			<label for="all_state">
				状态：<el-select v-model="all_state" placeholder="是否显示 ">
					<el-option
						id="all_state"
						v-for="item in all_states"
						:key="item"
						:value="item">
					</el-option>
				</el-select>
			</label>
			<label for="time">
				时间查询：<el-date-picker
					id="time"
					class="bothdate"
			    	v-model="time"
			    	type="datetimerange"
			    	range-separator="至"
			    	start-placeholder="开始日期"
			    	end-placeholder="结束日期">
			    </el-date-picker>
			</label>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>ID</td>
					<td>游戏名称</td>
					<td>新服名称</td>
					<td>开服时间</td>
					<td>是否显示</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in 10">
					<td>1000001</td>
					<td>王者归来</td>
					<td>一区</td>
					<td>2018-11-16 17:51:20</td>
					<td>否</td>
					<td><el-button size="mini" type="primary" icon="el-icon-search" @click="dialog_show=true">查看详情</el-button></td>
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
			title="商务合作"
			:visible.sync="dialog_show"
			width="30%"
			center>
			<table class="mini">
				<caption>查看详情</caption>
				<tr>
					<td>公司名称</td>
					<td><el-input disabled v-model="company_name" placeholder="请输入公司名称"></el-input></td>
				</tr>
				<tr>
					<td>姓名</td>
					<td><el-input disabled v-model="username" placeholder="请输入姓名"></el-input></td>
				</tr>
				<tr>
					<td>电话</td>
					<td>
						<el-input disabled v-model="telphone" placeholder="请输入电话"></el-input>
					</td>
				</tr>
				<tr>
					<td>留言内容</td>
					<td>
						<el-input
							class="textarea"
							disabled
							type="textarea"
							:rows="2"
							placeholder="留言内容"
							v-model="comment">
						</el-input>
					</td>
				</tr>
				<tr>
					<td>是否已读</td>
					<td>
						<el-radio v-model="is_read" label="1">是</el-radio>
  						<el-radio v-model="is_read" label="2">否</el-radio>
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
export default{
	data(){
		return{
			search_content:'',//查询的内容
			all_state:'',//搜索当前状态
			all_states:['未读','已读'],//全部搜索状态
			time:'',//搜索日期
			dialog_show:false,//模态框是否显示
			company_name:'',// 公司名称
			username:'',//姓名
			telphone:'',//电话号码
			comment:'',//留言
			is_read:''//是否已读
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
<style scoped lang="styl">

</style>