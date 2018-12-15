<template>
	<div class="main">
		<div class="title">后台管理首页</div>
		<div class="ps">
			<p class="p_title">深圳市星移网络科技有限公司后台管理</p>
			<p class="p_content">你好，管理员！</p>
			<p class="p_time">当前时间：{{date}}</p>
		</div>
		<ul class="section1">
			<li>
				<div @click="router_change('users/users_list')" class="content">
					<div>用户列表</div>
				</div>
			</li>
			<li>
				<div @click="router_change('games/games_list')" class="content">
					<div>游戏列表</div>
				</div>
			</li>
			<li>
				<div @click="router_change('games/hot_tags')" class="content">
					<div>热门标签</div>
				</div>
			</li>
			<li>
				<div @click="router_change('games/games_type')" class="content">
					<div>游戏类型</div>
				</div>
			</li>
			<li>
				<div @click="router_change('games/games_init')" class="content">
					<div>开服表</div>
				</div>
			</li>
			<li>
				<div @click="router_change('games/banner')" class="content">
					<div>banner图</div>
				</div>
			</li>
			<li>
				<div @click="router_change('money/money_init')" class="content">
					<div>充值金额配置</div>
				</div>
			</li>
			<li>
				<div @click="router_change('money/money_histroy_toGame')" class="content">
					<div>充值记录</div>
				</div>
			</li>
			<li>
				<div @click="router_change('money/money_toGames')" class="content">
					<div>充值到游戏</div>
				</div>
			</li>
			<li>
				<div @click="router_change('infos/bussiness_together')" class="content">
					<div>商务合作</div>
				</div>
			</li>
			<li>
				<div @click="router_change('infos/infos_list')" class="content">
					<div>消息列表</div>
				</div>
			</li>
			<li>
				<div class="content">
					<a href="http://p9yi.xyz/download_center/" target="_blank">前端页面</a>
				</div>
			</li>
		</ul>
	</div>
</template>
<style lang="stylus" scoped>
.ps
	text-align center
	width 100%
	background lightgray
	.p_title
		font-size 28px
		margin-top 30px
		padding-top 40px
	.p_content
		font-size 20px
		font-weight bold
		margin-top 20px
	.p_time
		margin-top 18px
		padding-bottom 40px
.section1
	width 100%
	height 400px
	li
		float left
		width 25%
		height 175px
		&:nth-of-type(1)
			.content
				background #c55c57
		&:nth-of-type(2)
			.content
				background #fd9521
		&:nth-of-type(3)
			.content
				background #b352a3
		&:nth-of-type(4)
			.content
				background #6b6fd2
		&:nth-of-type(5)
			.content
				background #7f638c
		&:nth-of-type(6)
			.content
				background #55abdc
		&:nth-of-type(7)
			.content
				background #587d14
		&:nth-of-type(8)
			.content
				background #2c9489
		&:nth-of-type(9)
			.content
				background #e54662
		&:nth-of-type(10)
			.content
				background #c0658e
		&:nth-of-type(11)
			.content
				background #ff7640
		&:nth-of-type(12)
			.content
				background #cb7d57
		.content
			cursor pointer
			text-align center
			line-height 120px
			font-size 24px
			width 65%
			height 120px
			margin 60px auto 0 auto
			color #eaeee7
			font-family '微软雅黑'
			overflow hidden
			white-space nowrap
			text-overflow ellipsis
		a
			width 100%
			height 120px
			display block
			color #eaeee7
</style>
<script>
export default{
	computed:{
		
	},
	data(){
		function reset(value){
			return value>=10?value:'0'+value
		};
		return{
			date:new Date().getFullYear()+'-'+reset(new Date().getMonth()+1)+'-'+reset(new Date().getDate())+' '+reset(new Date().getHours())+':'+reset(new Date().getMinutes())+':'+reset(new Date().getSeconds())
		}
	},
	mounted(){
		this.timer=setInterval(()=>{
			function reset(value){
				return value>=10?value:'0'+value
			}
			this.date=new Date().getFullYear()+'-'+reset(new Date().getMonth()+1)+'-'+reset(new Date().getDate())+' '+reset(new Date().getHours())+':'+reset(new Date().getMinutes())+':'+reset(new Date().getSeconds());
		},1000);
	},
	beforeDestroy(){
		if(this.timer){
			clearInterval(this.timer);
		}
	},
	methods:{
		router_change(value){
			this.setPlaying=true
			this.$router.push(`/system/${value}`);
		}
	}
}
</script>