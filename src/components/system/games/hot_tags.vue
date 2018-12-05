<template>
	<div>
		<div class="title">热门标签列表</div>
		<div class="searchs">
			<label for="search_content">
				内容查询：<el-input id="search_content" v-model="search_content" placeholder="请输入要查询的内容"></el-input>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
			<label for="is_show">
				是否显示：<el-select v-model="is_show" placeholder="是否显示">
					<el-option
						id="is_show"
						v-for="item in is_shows"
						:key="item"
						:value="item">
					</el-option>
				</el-select>
			</label>
			<el-button type="success" class="add_btn" @click="dialog_show=true;dialog_type='新增标签'">新增</el-button>
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
				<tr v-for="item in 10">
					<td>1000001</td>
					<td>10</td>
					<td>是</td>
					<td><el-button size="mini" type="warning" icon="el-icon-edit" @click="dialog_show=true;dialog_type='修改标签'">修改</el-button></td>
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
			title="热门标签"
			:visible.sync="dialog_show"
			width="30%"
			center>
			<table class="mini">
				<caption>{{dialog_type}}</caption>
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
export default{
	data(){
		return{
			search_content:'',//查询的内容
			is_show:'',//搜索当前是否显示
			is_show_dialog:'',//模态框当前是否显示
			is_shows:['是','否'],//全部是否显示
			dialog_show:false,//模态框是否显示
			dialog_type:'',//当前模态框标题
			tags_content:'',//标签内容
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