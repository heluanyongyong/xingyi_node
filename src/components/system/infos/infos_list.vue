<template>
	<div>
		<div class="title">消息列表</div>
		<div class="searchs">
			<label for="search_content">
				内容查询：<el-input id="search_content" v-model="search_content" placeholder="请输入要查询的内容"></el-input>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
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
			<el-button type="success" class="add_btn" @click="dialog_show=true;dialog_type='添加消息'">添加</el-button>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>消息ID</td>
					<td>消息类型</td>
					<td>用户ID</td>
					<td>消息内容</td>
					<td>发送时间</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in 10">
					<td>1000001</td>
					<td>全体消息</td>
					<td>1000001</td>
					<td>hello world</td>
					<td>2018-11-14 16:29:30</td>
					<td><el-button size="mini" type="warning" icon="el-icon-edit" @click="dialog_show=true;dialog_type='查看详情'">查看详情</el-button></td>
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
			title="消息列表"
			:visible.sync="dialog_show"
			width="30%"
			center>
			<table class="mini">
				<caption>{{dialog_type}}</caption>
				<tr v-if="dialog_type=='查看详情'">
					<td>消息ID</td>
					<td><el-input :disabled="dialog_type=='查看详情'" v-model="message_id" placeholder="消息ID"></el-input></td>
				</tr>
				<tr>
					<td>消息类型</td>
					<td>
						<el-select :disabled="dialog_type=='查看详情'" v-model="message_type" placeholder="消息类型">
							<el-option
								v-for="item in message_types"
								:key="item"
								:value="item">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>用户ID</td>
					<td><el-input :disabled="dialog_type=='查看详情'" v-model="user_id" placeholder="用户ID"></el-input></td>
				</tr>
				<tr>
					<td>消息内容</td>
					<td>
						<el-input
							class="textarea"
							:disabled="dialog_type=='查看详情'"
							type="textarea"
							:rows="2"
							placeholder="消息内容"
							v-model="message_content">
						</el-input>
					</td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button v-if="dialog_type=='添加消息'" type="primary" @click="submit">提交</el-button>
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
			time:'',//时间
			dialog_show:false,//模态框是否显示
			dialog_type:'',//模态框标题
			message_id:'',//消息ID
			message_type:'',//当前所选消息类型
			message_types:['系统消息','指定消息'],//全部消息类型
			user_id:'',//用户ID
			message_content:'',//消息内容
		}
	},
	methods:{
		submit(){
			this.dialog_show=false;
			var str=this.dialog_type.substring(0,2);
			this.$message({
	          	message: `${str}成功！`,
	          	type: 'success'
	        });
		}
	}
}
</script>
<style scoped lang="styl">

</style>