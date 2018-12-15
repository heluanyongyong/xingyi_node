<template>
	<div>
		<label for="time">
			时间查询：<el-date-picker
				id="time"
				class="bothdate"
		    	v-model="time"
		    	type="datetimerange"
		    	range-separator="至"
		    	start-placeholder="开始日期"
		    	end-placeholder="结束日期"
		    	value-format="yyyy-MM-dd HH:mm:ss"
		    	@change="change_time">
		    </el-date-picker>
		</label>
	</div>
</template>
<script>
export default{
	data(){
		return{
			time:''
		}
	},
	methods:{
		change_time(){
			this.$emit('change_time',this.time)
		}
	}
}
</script>
<style scoped lang="styl">
div
	display inline-block
</style>