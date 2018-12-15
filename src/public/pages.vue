<template>
	<div>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="pages*10"
			@current-change="change_page">
		</el-pagination>
	</div>
</template>
<script>
export default{
	props:['pages'],
	methods:{
		change_page(page){
			this.$emit('change_page',page);
		}
	}
}
</script>
<style scoped lang="styl">
</style>