<template>
	<div class="login_bg">
		<p>星移网络科技有限公司</p>
		<div class="login_content">
			<el-input class="login_input" v-model="name" placeholder="请输入用户名："></el-input>
			<el-input class="login_input" v-model="password" placeholder="请输入密码："></el-input>
			<el-checkbox v-model="auto_login">自动登陆</el-checkbox>
			<el-button class="button" type="danger" round @click="login_begin">登陆</el-button>
		</div>
	</div>
</template>
<style scoped lang="styl">
.login_bg
	position fixed
	width 100%
	height 100%
	background-image url('/static/login_bg.jpg')
	background-size 100% 100%
	overflow auto
	p
		text-align center
		color white
		font-size 35px
		font-family "华文新魏" !important
		margin-top 200px
	.login_content
		width 300px
		background #fff
		margin 20px auto
		border-radius 10px
		padding 45px 40px
		.login_input
			margin-bottom 15px
		.button
			width 100%
			margin-top 15px
			background #ff0000
</style>
<script>
export default{
	data(){
		return{
			name:'',
			password:'',
			auto_login:false
		}
	},
	methods:{
		login_begin(){
			// this.$axios.post('http://192.168.108.24:8089/manager/managerLogin',{
			// accountNumber:123,
			// password:456
			// });
			this.$router.push('/system');
		}
	}
}
</script>