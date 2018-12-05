<template>
	<div>
		<div class="title">充值记录——充值到金元宝</div>
		<div class="searchs">
			<label for="search_content">
				内容查询：<el-input id="search_content" v-model="search_content" placeholder="请输入要查询的内容"></el-input>
			</label>
			<label for="is_show">
				充值金额：<el-input id="is_show" v-model="topUp_money" placeholder="请输入充值金额"></el-input>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
			<div style="margin-top:25px;">
				<label for="topUp_time">
					时间查询：<el-date-picker
						id="topUp_time"
						class="bothdate"
				    	v-model="topUp_time"
				    	type="datetimerange"
				    	range-separator="至"
				    	start-placeholder="开始日期"
				    	end-placeholder="结束日期">
				    </el-date-picker>
				</label>
			</div>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>ID</td>
					<td>充值帐号</td>
					<td>被充值帐号</td>
					<td>充值金额</td>
					<td>赠送金额</td>
					<td>充值到金元宝</td>
					<td>充值时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in 10">
					<td>1000001</td>
					<td>xiaobai</td>
					<td>xiaobai</td>
					<td>100</td>
					<td>10</td>
					<td>100</td>
					<td>2018-11-13 10:13:15</td>
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
	</div>
</template>
<script>
export default{
	data(){
		return{
			search_content:'',//查询的内容
			topUp_money:'',//搜索充值金额
			topUp_time:'',//搜索充值时间
		}
	},
	methods:{
	}
}
</script>
<style scoped lang="styl">

</style>