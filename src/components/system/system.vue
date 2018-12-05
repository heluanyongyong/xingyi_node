<template>
	<div>
		<div class="topbar">
			<div class="left">星移官网后台</div>
			<div class="right">
				<span>admin@qq.com</span>
				<router-link to="/">注销</router-link>
			</div>
		</div>
		<el-menu
			default-active="2"
			class="el-menu-vertical-demo leftbar"
			@open="handleOpen"
			@close="handleClose"
			background-color="#444"
			text-color="#fff"
			:router="true"
			active-text-color="#ffd04b">
			<div class="high"></div>
			<el-menu-item index="/system">
		    	<i class="el-icon-setting"></i>
		    	<span slot="title">首页</span>
		  	</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>用户管理</span>
				</template>
          		<el-menu-item index="/system/users/users_list">用户列表</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>游戏管理</span>
				</template>
          		<el-menu-item index="/system/games/games_list">游戏列表</el-menu-item>
          		<el-menu-item index="/system/games/hot_tags">热门标签</el-menu-item>
          		<el-menu-item index="/system/games/games_type">游戏类型</el-menu-item>
          		<el-menu-item index="/system/games/games_init">开服表</el-menu-item>
          		<el-menu-item index="/system/games/banner">banner图</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>充值</span>
				</template>
          		<el-menu-item index="/system/money/money_init">充值金额配置</el-menu-item>
          		<el-submenu index="4-2">
		        	<template slot="title">充值记录</template>
		        	<el-menu-item index="/system/money/money_histroy_toGame">充值到游戏</el-menu-item>
		        	<el-menu-item index="/system/money/money_histroy_toJing">充值到金元宝</el-menu-item>
		        	<el-menu-item index="/system/money/money_histroy_jingToGame">金元宝充值到游戏</el-menu-item>
		        </el-submenu>
          		<el-menu-item index="/system/money/money_toGames">充值到游戏</el-menu-item>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>信息管理</span>
				</template>
          		<el-menu-item index="/system/infos/bussiness_together">商务合作</el-menu-item>
          		<el-menu-item index="/system/infos/infos_list">消息列表</el-menu-item>
			</el-submenu>
		</el-menu>
		<div class="clearLeft"></div>
		<router-view class="zdy"></router-view>
	</div>
</template>
<style scoped lang='styl'>
auto_height=50px
auto_width=250px
.topbar
	position fixed
	width 100%
	height auto_height
	line-height auto_height
	background #333
	color #fff
	top 0
	z-index 555
	.left
		float left
		margin-left 75px
	.right
		float right
		margin-right 50px
		span
			margin-right 25px
.high
	height auto_height
.leftbar
	width auto_width
	overflow auto
	position fixed
	height 100%
	bottom 0
	background #444
	z-index 550
.zdy
	margin-top auto_height
	margin-left auto_width
	padding 30px
</style>
<script>
export default{
	methods:{
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		hello(){
			console.log('hello world');
		}
	}
}
</script>