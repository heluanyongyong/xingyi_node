<template>
	<div>
		<div class="title">游戏列表</div>
		<div class="searchs">
			<label for="search_content">
				内容查询：<el-input clearable id="search_content" v-model="search_content" placeholder="请输入要查询的内容"></el-input>
			</label>
			<label for="loginTime">
				时间查询：<el-date-picker
					id="loginTime"
					class="bothdate"
			    	v-model="loginTime"
			    	type="datetimerange"
			    	range-separator="至"
			    	start-placeholder="开始日期"
			    	end-placeholder="结束日期">
			    </el-date-picker>
			</label>
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
			<el-button type="success" class="add_btn" @click="dialog_show=true;dialog_type='新增游戏'">新增</el-button>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>游戏ID</td>
					<td>游戏名称</td>
					<td>游戏类型</td>
					<td>热门游戏</td>
					<td>游戏种类</td>
					<td>热门标签</td>
					<td>运营代理商</td>
					<td>时间</td>
					<td>是否显示</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in 10">
					<td>1000001</td>
					<td>欢乐斗地主</td>
					<td>角色</td>
					<td>是</td>
					<td>手机游戏</td>
					<td>棋牌</td>
					<td>腾讯</td>
					<td>2018-11-13 10:13:15</td>
					<td>是</td>
					<td><el-button size="mini" type="warning" icon="el-icon-edit" @click="dialog_show=true;dialog_type='修改游戏'">修改</el-button></td>
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
		<!-- 新增游戏 -->
		<el-dialog
			title="游戏列表"
			:visible.sync="dialog_show"
			width="60%"
			center>
			<table class="mini">
				<caption>{{dialog_type}}</caption>
				<tr>
					<td>游戏名称</td>
					<td><el-input clearable v-model="game_name" placeholder="请输入游戏名称"></el-input></td>
				</tr>
				<tr>
					<td>游戏图标</td>
					<td>
						<input id="game_icon" type="file" @change="change_file_img('game_icon','select_img1')">
						<img v-if="dialog_type=='新增游戏'" class="select_img1" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_icon')">
						<img v-if="dialog_type=='修改游戏'" class="select_img1" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_icon')">
					</td>
				</tr>
				<tr>
					<td>游戏类型</td>
					<td>
						<el-select multiple clearable v-model="game_type" placeholder="请选择游戏类型">
					    	<el-option
					    		v-for="item in game_types"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>热门游戏</td>
					<td>
						<el-select clearable v-model="is_hotGame" placeholder="是否为热门游戏">
					    	<el-option
					    		v-for="item in is_hotGames"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>游戏种类</td>
					<td>
						<el-select clearable v-model="game_class" placeholder="请选择游戏种类">
					    	<el-option
					    		v-for="item in game_classes"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr v-if="game_class=='网页游戏'">
					<td>游戏链接</td>
					<td>
						<el-input clearable v-model="game_link" placeholder="请输入游戏链接"></el-input>
					</td>
				</tr>
				<tr v-if="game_class=='手机游戏'">
					<td>游戏二维码</td>
					<td>
						<input id="game_ewm" type="file" @change="change_file_img('game_ewm','select_img2')">
						<img v-if="dialog_type=='新增游戏'" class="select_img2" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_ewm')">
						<img v-if="dialog_type=='修改游戏'" class="select_img2" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_ewm')">
					</td>
				</tr>
				<tr>
					<td>热门标签</td>
					<td>
						<el-select multiple clearable v-model="hot_tag" placeholder="请选择热门标签">
					    	<el-option
					    		v-for="item in hot_tags"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>运营代理商</td>
					<td>
						<el-input clearable v-model="sale_department" placeholder="请输入运营代理商"></el-input>
					</td>
				</tr>
				<tr>
					<td>上线时间</td>
					<td>
						<label clearable for="show_time">
							上线时间：<el-date-picker
								id="show_time"
								v-model="show_time"
								type="datetime"
								placeholder="选择上线时间">
							</el-date-picker>
						</label>
					</td>
				</tr>
				<tr>
					<td>在线人数</td>
					<td>
						<el-input clearable disabled v-model="online_peoples" placeholder="请输入在线人数"></el-input>
					</td>
				</tr>
				<tr>
					<td>是否显示</td>
					<td>
						<el-select clearable v-model="is_show" placeholder="请选择是否显示">
					    	<el-option
					    		v-for="item in is_shows"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>缩略展示图</td>
					<td>
						<input id="game_mini" type="file" @change="change_file_img('game_mini','select_img3')">
						<img v-if="dialog_type=='新增游戏'" class="select_img3" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_mini')">
						<img v-if="dialog_type=='修改游戏'" class="select_img3" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_mini')">
					</td>
				</tr>
				<tr>
					<td>游戏介绍</td>
					<td>
						<el-input
							class="textarea"
							type="textarea"
							:rows="2"
							placeholder="请输入游戏介绍"
							v-model="game_introduce">
						</el-input>
					</td>
				</tr>
				<tr>
					<td>技术亮点</td>
					<td>
						<el-input
							class="textarea"
							type="textarea"
							:rows="2"
							placeholder="请输入技术亮点"
							v-model="skill_lighter">
						</el-input>
					</td>
				</tr>
				<tr>
					<td>游戏背景图片</td>
					<td>
						<input id="game_banner" type="file" @change="change_file_img('game_banner','select_img4')">
						<img v-if="dialog_type=='新增游戏'" class="select_img4" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_banner')">
						<img v-if="dialog_type=='修改游戏'" class="select_img4" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_banner')">
					</td>
				</tr>
			</table>
			<table class="mini">
				<tbody>
					<!-- 特色玩法 -->
					<tr>
						<td>特色玩法标题</td>
						<td colspan="2">跳转链接</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in feature_gameplay">
						<td>
							<el-input clearable v-model="feature_gameplay[index].title" placeholder="请输入特色玩法标题"></el-input>
						</td>
						<td colspan="2">
							<el-input clearable v-model="feature_gameplay[index].link" placeholder="请输入特色玩法跳转链接"></el-input>
						</td>
						<td>
							<el-button type="success" @click="public_add('feature_gameplay',index)">新增</el-button>
							<el-button type="danger" @click="public_del('feature_gameplay',index)">删除</el-button>
						</td>
					</tr>
					<!-- 角色信息 -->
					<tr>
						<td>角色图像</td>
						<td>角色名称</td>
						<td>角色描述</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in role_infos" class="role_infos">
						<td>
							<input :id="`game_infoImg${index}`" type="file" @change="change_file_img(`game_infoImg${index}`,`select_imga_${index}`)">
							<img v-if="dialog_type=='新增游戏'" :class="`select_imga_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_infoImg${index}`)">
							<img v-if="dialog_type=='修改游戏'" :class="`select_imga_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_infoImg${index}`)">
							<!-- <input type="file" style="display:block"> -->
						</td>
						<td>
							<el-input clearable v-model="role_infos[index].name" placeholder="请输入角色名称"></el-input>
						</td>
						<td>
							<el-input
								class="input-mini"
								type="textarea"
								:rows="2"
								placeholder="请输入角色描述"
								v-model="role_infos[index].description">
							</el-input>
						</td>
						<td>
							<el-button type="success" @click="public_add('role_infos',index)">新增</el-button>
							<el-button type="danger" @click="public_del('role_infos',index)">重置</el-button>
						</td>
					</tr>
					<!-- 游戏壁纸 -->
					<tr>
						<td>游戏壁纸</td>
						<td colspan="2">游戏壁纸大图</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in game_wallpaper" class="game_wallpaper">
						<td>
							<input :id="`game_pic_${index}`" type="file" @change="change_file_img(`game_pic_${index}`,`select_imgb_${index}`)">
							<img v-if="dialog_type=='新增游戏'" :class="`select_imgb_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_pic_${index}`)">
							<img v-if="dialog_type=='修改游戏'" :class="`select_imgb_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_pic_${index}`)">
						</td>
						<td colspan="2">
							<input :id="`game_pic_l_${index}`" type="file" @change="change_file_img(`game_pic_l_${index}`,`select_imgb_l_${index}`)">
							<img v-if="dialog_type=='新增游戏'" :class="`select_imgb_l_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_pic_l_${index}`)">
							<img v-if="dialog_type=='修改游戏'" :class="`select_imgb_l_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_pic_l_${index}`)">
						</td>
						<td>
							<el-button type="success" @click="public_add('game_wallpaper',index)">新增</el-button>
							<el-button type="danger" @click="public_del('game_wallpaper',index)">重置</el-button>
						</td>
					</tr>
					<!-- 游戏截图 -->
					<tr>
						<td>游戏截图</td>
						<td colspan="2">游戏截图大图</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in game_screenshot" class="game_screenshot">
						<td>
							<input :id="`game_screenshot${index}`" type="file" @change="change_file_img(`game_screenshot${index}`,`select_imgc_${index}`)">
							<img v-if="dialog_type=='新增游戏'" :class="`select_imgc_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_screenshot${index}`)">
							<img v-if="dialog_type=='修改游戏'" :class="`select_imgc_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_screenshot${index}`)">
						</td>
						<td colspan="2">
							<input :id="`game_screenshot_l_${index}`" type="file" @change="change_file_img(`game_screenshot_l_${index}`,`select_imgc_l_${index}`)">
							<img v-if="dialog_type=='新增游戏'" :class="`select_imgc_l_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_screenshot_l_${index}`)">
							<img v-if="dialog_type=='修改游戏'" :class="`select_imgc_l_${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`game_screenshot_l_${index}`)">
						</td>
						<td>
							<el-button type="success" @click="public_add('game_screenshot',index)">新增</el-button>
							<el-button type="danger" @click="public_del('game_screenshot',index)">重置</el-button>
						</td>
					</tr>
				</tbody>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit">提交</el-button>
				<el-button @click="dialog_show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style scoped lang="styl">

</style>
<script>
export default{
	data(){
		return{
			loginTime:'',//查询的时间
			search_content:'',//查询的内容
			dialog_type:'',//模态框类型
			dialog_show:false,// 新增模态框
			game_name:'',//游戏名称
			game_type:[],//所选游戏类型
			game_types:['动作','射击','格斗','冒险','模拟','角色扮演','策略','音乐','休闲','体育','竞速'],//全部游戏类型
			is_hotGame:'',//所选热门游戏情况
			is_hotGames:['是','否'],//全部热门游戏情况
			game_class:'',//所选游戏种类
			game_classes:['网页游戏','手机游戏'],//全部游戏种类
			game_link:'',//游戏链接
			hot_tag:[],//所选热门标签
			hot_tags:['棋牌','篮球'],//全部热门标签
			sale_department:'',//运营代理商
			show_time:'',//上线时间
			online_peoples:'',//在线人数
			is_show:'',//所选是否显示
			is_shows:['是','否'],//全部是否显示情况,
			game_introduce:'',//游戏介绍
			skill_lighter:'',//技术亮点
			feature_gameplay:[
				{
					title:'',//特色玩法标题
					link:''//特色玩法链接
				}
			],//特色玩法
			role_infos:[
				{
					name:'',//角色名称
					description:''//角色描述
				}
			],//角色信息
			game_wallpaper:[0],//游戏壁纸数量
			game_screenshot:[0],//游戏截图数量
			textarea:''
		}
	},
	methods:{
		public_add(source,index){
			switch(source){
				case 'feature_gameplay':var obj={title:'',link:''};break;
				case 'role_infos':var obj={name:'',description:''};break;
				case 'game_wallpaper':var obj={};break;
			}
			this[source].splice(index+1,0,obj);
		},
		public_del(source,index){
			// 
			if(source=='game_wallpaper'){
				$(`#game_pic_${index}`).val('');
				$(`#game_pic_l_${index}`).val('');
				$(`.select_imgb_${index}`).attr('src','static/games_list/add.png');
				$(`.select_imgb_l_${index}`).attr('src','static/games_list/add.png');
			}else if(source=='game_screenshot'){
				$(`#game_screenshot_${index}`).val('');
				$(`#game_screenshot_l_${index}`).val('');
				$(`.select_imgc_${index}`).attr('src','static/games_list/add.png');
				$(`.select_imgc_l_${index}`).attr('src','static/games_list/add.png');
			}else if(source=='role_infos'){
				$(`#game_infoImg${index}`).val('');
				$(`.select_imga_${index}`).attr('src','static/games_list/add.png');
				this.role_infos[index].name='';
				this.role_infos[index].description='';
			}else{
				if(this[source].length>1){
					this[source].splice(index,1);
				}else{
					this.$message({
			        	message: '至少得有一条数据,删除失败',
			        	type: 'warning'
			        });
				}
			}
		},
		submit(){
			this.dialog_show=false;
			// // 上传图片--游戏图标
			// this.on_click_upload_file('game_icon','icon');
			// if(this.game_class=='手机游戏'){
			// 	// 上传图片--游戏二维码
			// 	this.on_click_upload_file('game_ewm','ewm');
			// }
			// //上传图片--缩略展示图
			// this.on_click_upload_file('game_mini','mini');
			// // 上传图片--游戏背景图
			// this.on_click_upload_file('game_banner','background');
			// 上传图片--角色图像
			var length=$('.role_infos').length;
			for(var i=0;i<length;i++){
				this.on_click_upload_file(`game_infoImg${i}`,'role');
			}
			// 上传图片--游戏壁纸和游戏壁纸大图
			var length=$('.game_wallpaper').length;
			for(var i=0;i<length;i++){
				this.on_click_upload_file(`game_pic_${i}`,'wallpaper');
				this.on_click_upload_file(`game_pic_l_${i}`,'wallpaper_large');
			}
			// 上传图片--游戏截图和游戏截图大图
			var length=$('.game_screenshot').length;
			for(var i=0;i<length;i++){
				this.on_click_upload_file(`game_screenshot${i}`,'screenshot');
				this.on_click_upload_file(`game_screenshot_l_${i}`,'screenshot_large');
			}
			var str=this.dialog_type.substring(0,2);
			this.$message({
	          	message: `${str}成功！`,
	          	type: 'success'
	        });
		},
		pic_click(id){
			$(`#${id}`).click();
		},
		change_file_img(_id,type){
			var preview=document.querySelectorAll(`.${type}`)[0];
			var file=document.getElementById(_id).files[0];
			var reader=new FileReader();
			reader.onloadend=()=>{
                preview.src=reader.result;
            }
            if(file){
                reader.readAsDataURL(file);
            }
		},
		on_click_upload_file(file_id,file_path){
			// 上传图片
			var client = new OSS.Wrapper({
		        region: 'oss-cn-shenzhen',
		        accessKeyId: 'LTAIaGX9gQ9iRNyJ',
		        accessKeySecret: '4NoCWvII2zAdM3xFNCFjNxxjzeILbb',
		        bucket:'brand-new-days'
		    });
			var f = document.getElementById(file_id).files[0];
	    	var val= document.getElementById(file_id).value;
	  		// 如果值为空、则不上传
	    	if(val==''){
				return;
			}
	    	var obj=`${file_path}/${f.name}`;  // 这里是生成文件名
	    	var storeAs = obj;  //命名空间加上文件名,中间加上/ 会在后台生成文件夹(如果有crate权限)
	    	console.log(' => ' + storeAs);
	    	client.multipartUpload(storeAs, f).then(function (result) {
	    		console.log(result);
	    		console.log(result.url);
	    	}).catch(function (err) {
	    	    console.log(err);
	    	});
		}
	}
}
</script>