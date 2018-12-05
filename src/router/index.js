import Vue from 'vue'
import Router from 'vue-router'
// 登陆页面
import login from '@/components/login'
// 公共模板
import system from '@/components/system/system'
// 首页
import index from '@/components/system/index'
// 用户管理
import users_list from '@/components/system/users/users_list'
// 游戏管理
import banner from '@/components/system/games/banner'
import games_init from '@/components/system/games/games_init'
import games_list from '@/components/system/games/games_list'
import games_type from '@/components/system/games/games_type'
import hot_tags from '@/components/system/games/hot_tags'
// 充值管理
import money_histroy_jingToGame from '@/components/system/money/money_histroy_jingToGame'
import money_histroy_toGame from '@/components/system/money/money_histroy_toGame'
import money_histroy_toJing from '@/components/system/money/money_histroy_toJing'
import money_init from '@/components/system/money/money_init'
import money_toGames from '@/components/system/money/money_toGames'
// 信息管理
import bussiness_together from '@/components/system/infos/bussiness_together'
import infos_list from '@/components/system/infos/infos_list'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: login
		},
		{
			path:'/system',
			component: system,
			redirect:'/system/index',
			children:[
				// 首页
				{
					path:'/system/index',
					component:index
				},
				// 用户管理
				{
					path:'/system/users/users_list',
					component:users_list
				},
				// 游戏管理
				{
					path:'/system/games/banner',
					component:banner
				},
				{
					path:'/system/games/games_init',
					component:games_init
				},
				{
					path:'/system/games/games_list',
					component:games_list
				},
				{
					path:'/system/games/games_type',
					component:games_type
				},
				{
					path:'/system/games/hot_tags',
					component:hot_tags
				},
				// 充值管理
				{
					path:'/system/money/money_histroy_jingToGame',
					component:money_histroy_jingToGame
				},
				{
					path:'/system/money/money_histroy_toGame',
					component:money_histroy_toGame
				},
				{
					path:'/system/money/money_histroy_toJing',
					component:money_histroy_toJing
				},
				{
					path:'/system/money/money_init',
					component:money_init
				},
				{
					path:'/system/money/money_toGames',
					component:money_toGames
				},
				// 信息管理
				{
					path:'/system/infos/bussiness_together',
					component:bussiness_together
				},
				{
					path:'/system/infos/infos_list',
					component:infos_list
				}
			]
		}
	]
})
