<template>
	<div>
		<div class="title">游戏列表</div>
		<div class="searchs">
			<div>
				<label for="gameType">
					游戏类型：<el-select clearable v-model="gameTypeSearch" placeholder="请选择游戏类型">
						<el-option
							id="gameType"
							v-for="item in gameTypes"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="isHotGame">
					热门游戏：<el-select clearable v-model="isHotGameSearch" placeholder="是否为热门游戏">
						<el-option
							id="isHotGame"
							v-for="item in isHotGames"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="gameClass">
					游戏种类：<el-select clearable v-model="gameClassSearch" placeholder="请选择游戏种类">
						<el-option
							id="gameClass"
							v-for="item in gameClasses"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="hotTag">
					热门标签：<el-select clearable v-model="hotTagsSearch" placeholder="请选择热门标签">
						<el-option
							id="hotTag"
							v-for="item in hotTags"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="isShow">
					是否显示：<el-select clearable v-model="isShowSearch" placeholder="请选择是否显示">
						<el-option
							id="isShow"
							v-for="item in isShows"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
			</div>
			<div class="mt25">
				<timeSearchComponent @change_time="change_searchTime"></timeSearchComponent>
				<el-button class="mr25" type="primary" icon="el-icon-search" @click="search">查询</el-button>
			</div>
			<div class="mt25">
				<label for="searchType">
					内容查询：<el-select clearable v-model="searchType" placeholder="请选择查询类别">
						<el-option
							id="searchType"
							v-for="item in searchTypes"
							:key="item"
							:value="item">
						</el-option>
					</el-select>
				</label>
				<label for="searchContent">
					<el-input clearable id="searchContent" v-model="searchContent" placeholder="请输入要查询的内容"></el-input>
				</label>
				<el-button class="mr25" type="primary" icon="el-icon-search" @click="search">查询</el-button>
				<el-button type="success" class="add_btn" @click="add">新增</el-button>
			</div>
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
				<tr v-for="(item,index) in dataList">
					<td>{{item.gameId}}</td>
					<td>{{item.gameName}}</td>
					<td>{{item.gameType}}</td>
					<td>{{item.isHot}}</td>
					<td>{{item.gameClass}}</td>
					<td>{{item.hotTag}}</td>
					<td>{{item.operateName}}</td>
					<td>{{item.onlineTime|filter_time}}</td>
					<td>{{item.isShow}}</td>
					<td><el-button size="mini" type="warning" icon="el-icon-edit" @click="modify">修改</el-button></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="11">
						<!-- 分页组件 -->
						<pagesComponent :pages="pages" @change_page="change_page"></pagesComponent>
					</td>
				</tr>
			</tfoot>
		</table>
		<!-- 新增游戏 -->
		<el-dialog
			title="游戏列表"
			:visible.sync="dialogShow"
			width="60%"
			center>
			<table class="mini">
				<caption>{{dialogType}}</caption>
				<tr>
					<td>游戏名称</td>
					<td><el-input clearable v-model="gameName" placeholder="请输入游戏名称"></el-input></td>
				</tr>
				<tr>
					<td>游戏图标</td>
					<td>
						<input id="gameIcon" type="file" @change="change_file_img('gameIcon','selectImg1')">
						<img v-if="dialogType=='新增游戏'" class="selectImg1" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameIcon')">
						<img v-if="dialogType=='修改游戏'" class="selectImg1" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameIcon')">
					</td>
				</tr>
				<tr>
					<td>游戏类型</td>
					<td>
						<el-select multiple clearable v-model="gameType" placeholder="请选择游戏类型">
					    	<el-option
					    		v-for="item in gameTypes"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>热门游戏</td>
					<td>
						<el-select clearable v-model="isHotGame" placeholder="是否为热门游戏">
					    	<el-option
					    		v-for="item in isHotGames"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>游戏种类</td>
					<td>
						<el-select clearable v-model="gameClass" placeholder="请选择游戏种类">
					    	<el-option
					    		v-for="item in gameClasses"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr v-if="gameClass=='网页游戏'">
					<td>游戏链接</td>
					<td>
						<el-input clearable v-model="gameLink" placeholder="请输入游戏链接"></el-input>
					</td>
				</tr>
				<tr v-if="gameClass=='手机游戏'">
					<td>游戏二维码</td>
					<td>
						<input id="gameEwm" type="file" @change="change_file_img('gameEwm','selectImg2')">
						<img v-if="dialogType=='新增游戏'" class="selectImg2" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameEwm')">
						<img v-if="dialogType=='修改游戏'" class="selectImg2" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameEwm')">
					</td>
				</tr>
				<tr>
					<td>热门标签</td>
					<td>
						<el-select multiple clearable v-model="hotTag" placeholder="请选择热门标签">
					    	<el-option
					    		v-for="item in hotTags"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>运营代理商</td>
					<td>
						<el-input clearable v-model="saleDepartment" placeholder="请输入运营代理商"></el-input>
					</td>
				</tr>
				<tr>
					<td>上线时间</td>
					<td>
						<label clearable for="showTime">
							上线时间：<el-date-picker
								id="showTime"
								v-model="showTime"
								type="datetime"
								placeholder="选择上线时间">
							</el-date-picker>
						</label>
					</td>
				</tr>
				<tr>
					<td>在线人数</td>
					<td>
						<el-input clearable disabled v-model="onlinePeoples" placeholder="请输入在线人数"></el-input>
					</td>
				</tr>
				<tr>
					<td>是否显示</td>
					<td>
						<el-select clearable v-model="isShow" placeholder="请选择是否显示">
					    	<el-option
					    		v-for="item in isShows"
					    		:key="item"
					    		:value="item">
					    	</el-option>
					  	</el-select>
					</td>
				</tr>
				<tr>
					<td>缩略展示图</td>
					<td>
						<input id="gameMini" type="file" @change="change_file_img('gameMini','selectImg3')">
						<img v-if="dialogType=='新增游戏'" class="selectImg3" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameMini')">
						<img v-if="dialogType=='修改游戏'" class="selectImg3" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameMini')">
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
							v-model="gameIntroduce">
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
							v-model="skillLighter">
						</el-input>
					</td>
				</tr>
				<tr>
					<td>游戏背景图片</td>
					<td>
						<input id="gameBanner" type="file" @change="change_file_img('gameBanner','selectImg4')">
						<img v-if="dialogType=='新增游戏'" class="selectImg4" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameBanner')">
						<img v-if="dialogType=='修改游戏'" class="selectImg4" src="static/games_list/add.png" alt="hello world" @click="pic_click('gameBanner')">
					</td>
				</tr>
			</table>
			<table class="mini">
				<tbody>
					<!-- 特色玩法 -->
					<tr>
						<td>特色玩法标题</td>
						<td>跳转链接</td>
						<td>时间</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in featureGameplay">
						<td>
							<el-input clearable v-model="featureGameplay[index].title" placeholder="请输入特色玩法标题"></el-input>
						</td>
						<td>
							<el-input clearable v-model="featureGameplay[index].link" placeholder="请输入特色玩法跳转链接"></el-input>
						</td>
						<td>
							<el-date-picker
						    	v-model="featureGameplay[index].time"
						    	type="date"
						    	placeholder="选择日期"
						    	value-format="yyyy-MM-dd HH:mm:ss">
						    </el-date-picker>
						</td>
						<td>
							<el-button type="success" @click="publicAdd('featureGameplay',index)">新增</el-button>
							<el-button type="danger" @click="publicDel('featureGameplay',index)">删除</el-button>
						</td>
					</tr>
					<!-- 角色信息 -->
					<tr>
						<td>角色图像</td>
						<td>角色名称</td>
						<td>角色描述</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in roleInfos" class="roleInfos">
						<td>
							<input :id="`gameInfoImg${index}`" type="file" @change="change_file_img(`gameInfoImg${index}`,`selectImga${index}`)">
							<img v-if="dialogType=='新增游戏'" :class="`selectImga${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gameInfoImg${index}`)">
							<img v-if="dialogType=='修改游戏'" :class="`selectImga${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gameInfoImg${index}`)">
							<!-- <input type="file" style="display:block"> -->
						</td>
						<td>
							<el-input clearable v-model="roleInfos[index].name" placeholder="请输入角色名称"></el-input>
						</td>
						<td>
							<el-input
								class="input-mini"
								type="textarea"
								:rows="2"
								placeholder="请输入角色描述"
								v-model="roleInfos[index].description">
							</el-input>
						</td>
						<td>
							<el-button type="success" @click="publicAdd('roleInfos',index)">新增</el-button>
							<el-button type="danger" @click="publicDel('roleInfos',index)">重置</el-button>
						</td>
					</tr>
					<!-- 游戏壁纸 -->
					<tr>
						<td>游戏壁纸</td>
						<td colspan="2">游戏壁纸大图</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in gameWallpaper" class="gameWallpaper">
						<td>
							<input :id="`gamePics${index}`" type="file" @change="change_file_img(`gamePics${index}`,`selectImgbs${index}`)">
							<img v-if="dialogType=='新增游戏'" :class="`selectImgbs${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gamePics${index}`)">
							<img v-if="dialogType=='修改游戏'" :class="`selectImgbs${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gamePics${index}`)">
						</td>
						<td colspan="2">
							<input :id="`gamePicl${index}`" type="file" @change="change_file_img(`gamePicl${index}`,`selectImgbl${index}`)">
							<img v-if="dialogType=='新增游戏'" :class="`selectImgbl${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gamePicl${index}`)">
							<img v-if="dialogType=='修改游戏'" :class="`selectImgbl${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gamePicl${index}`)">
						</td>
						<td>
							<el-button type="success" @click="publicAdd('gameWallpaper',index)">新增</el-button>
							<el-button type="danger" @click="publicDel('gameWallpaper',index)">重置</el-button>
						</td>
					</tr>
					<!-- 游戏截图 -->
					<tr>
						<td>游戏截图</td>
						<td colspan="2">游戏截图大图</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item,index) in gameScreenshot" class="gameScreenshot">
						<td>
							<input :id="`gameScreenshots${index}`" type="file" @change="change_file_img(`gameScreenshots${index}`,`selectImgcs${index}`)">
							<img v-if="dialogType=='新增游戏'" :class="`selectImgcs${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gameScreenshots${index}`)">
							<img v-if="dialogType=='修改游戏'" :class="`selectImgcs${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gameScreenshots${index}`)">
						</td>
						<td colspan="2">
							<input :id="`gameScreenshotl${index}`" type="file" @change="change_file_img(`gameScreenshotl${index}`,`selectImgcl${index}`)">
							<img v-if="dialogType=='新增游戏'" :class="`selectImgcl${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gameScreenshotl${index}`)">
							<img v-if="dialogType=='修改游戏'" :class="`selectImgcl${index}`" src="static/games_list/add.png" alt="hello world" @click="pic_click(`gameScreenshotl${index}`)">
						</td>
						<td>
							<el-button type="success" @click="publicAdd('gameScreenshot',index)">新增</el-button>
							<el-button type="danger" @click="publicDel('gameScreenshot',index)">重置</el-button>
						</td>
					</tr>
				</tbody>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit">提交</el-button>
				<el-button @click="dialogShow = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style scoped lang="styl">
</style>
<script>
import pagesComponent from '@/public/pages.vue';
import timeSearchComponent from '@/public/timeSearch.vue';
import {public_data} from '@/public/mixins.js';

export default{
	components:{
		pagesComponent:pagesComponent,
		timeSearchComponent:timeSearchComponent,
	},
	mixins:[public_data],
	data(){
		return{
			dataList:[],//游戏列表数据
			time:'',//查询的时间
			gameTypeSearch:'',//搜索所选游戏类型
			isHotGameSearch:'',//搜索所选是否热门游戏
			gameClassSearch:'',//搜索所选游戏类型
			hotTagsSearch:'',//搜索所选热门标签
			isShowSearch:'',//搜索所选是否显示
			searchType:'',//当前查询的类别
			searchTypes:['游戏名称','运营代理商'],//所有查询的类别
			searchContent:'',//查询的内容
			gameName:'',//游戏名称
			gameType:[],//所选游戏类型
			gameTypes:['动作','射击','格斗','冒险','模拟','角色扮演','策略','音乐','休闲','体育','竞速'],//全部游戏类型
			isHotGame:'',//所选热门游戏情况
			isHotGames:['是','否'],//全部热门游戏情况
			gameClass:'',//所选游戏种类
			gameClasses:['网页游戏','手机游戏'],//全部游戏种类
			gameLink:'',//游戏链接
			hotTag:[],//所选热门标签
			hotTags:['棋牌','篮球'],//全部热门标签
			saleDepartment:'',//运营代理商
			showTime:'',//上线时间
			onlinePeoples:0,//在线人数
			isShow:'',//所选是否显示
			isShows:['是','否'],//全部是否显示情况,
			gameIntroduce:'',//游戏介绍
			skillLighter:'',//技术亮点
			featureGameplay:[
				{
					title:'',//特色玩法标题
					link:'',//特色玩法链接
					time:'',//特色玩法时间
				}
			],//特色玩法
			roleInfos:[
				{
					name:'',//角色名称
					description:''//角色描述
				}
			],//角色信息
			gameWallpaper:[0],//游戏壁纸数量
			gameScreenshot:[0],//游戏截图数量
			imgsProxy:[],//上传函数所需参数
			imgsContent:[],//后台存储图片所需参数
		}
	},
	methods:{
		// 获取后台游戏列表数据
		getData(){
			this.$axios.get(`/infos/game_list_get
				?page=${this.page}
				&gameType=${this.gameTypeSearch}
				&isHot=${this.isHotGameSearch}
				&gameClass=${this.gameClassSearch}
				&hotTag=${this.hotTagsSearch}
				&isShow=${this.isShowSearch}
				&searchType=${this.searchType}
				&searchContent=${this.searchContent}
				&time=${this.time}
				`).then((res)=>{
				this.dataList=res.data.rows;
				this.pages=res.data.pages;
			}).catch((err)=>{
				console.log(err);
			});
			// this.$axios.post('http://192.168.108.24:8089/gameManage/findGameDataList');
		},
		// 查询
		search(){
			// 前端类型验证
			if(this.searchType==''&&this.searchContent!=''){
				this.$message({
		          	message: `您还未选择查询类别`,
		          	type: 'warning'
		        });
			}else{
				this.getData();
			}
		},
		// 新增
		add(){
			// 模态框打开类型为新增
			this.dialogShow=true;
			this.dialogType='新增游戏';
			// 初始化模态框
			this.modal_init();
		},
		// 修改
		modify(){
			// 模态框打开类型为修改
			this.dialogShow=true;
			this.dialogType='修改游戏';
			// 初始化模态框
			this.modal_init();
			// 此处需要获取相应数据库的值
		},
		// 模态框初始化
		modal_init(){
			// 初始化图片信息
			this.imgsProxy=[];
			this.imgsContent=[];
			// 所有数据初始化
			$('img').attr('src','static/games_list/add.png');
			$('input:file').val('');
			this.gameName='';
			this.gameType=[];
			this.isHotGame='';
			this.gameClass='';
			this.gameLink='';
			this.hotTag=[];
			this.saleDepartment='';
			this.showTime='';
			this.onlinePeoples=0;
			this.isShow='';
			this.gameIntroduce='';
			this.skillLighter='';
			this.featureGameplay=[{title:'',link:'',time:''}];
			this.roleInfos=[{name:'',description:'',pic:''}];
			this.gameWallpaper=[0];//游戏壁纸数量
			this.gameScreenshot=[0];//游戏截图数量
		},
		// 点击图片、弹出文件选择
		pic_click(id){
			$(`#${id}`).click();
		},
		// 文件选择完毕、触发事件、改变所选图片
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
		// 表格新增
		publicAdd(source,index){
			switch(source){
				case 'featureGameplay':var obj={title:'',link:'',time:''};break;
				case 'roleInfos':var obj={name:'',description:'',pic:''};break;
				case 'gameWallpaper':var obj={};break;
			}
			this[source].splice(index+1,0,obj);
		},
		// 表格删除/重置
		publicDel(source,index){
			if(source=='gameWallpaper'){
				$(`#gamePics${index}`).val('');
				$(`#gamePicl${index}`).val('');
				$(`.selectImgbs${index}`).attr('src','static/games_list/add.png');
				$(`.selectImgbl${index}`).attr('src','static/games_list/add.png');
			}else if(source=='gameScreenshot'){
				$(`#gameScreenshots${index}`).val('');
				$(`#gameScreenshotl${index}`).val('');
				$(`.selectImgcs${index}`).attr('src','static/games_list/add.png');
				$(`.selectImgcl${index}`).attr('src','static/games_list/add.png');
			}else if(source=='roleInfos'){
				$(`#gameInfoImg${index}`).val('');
				$(`.selectImga${index}`).attr('src','static/games_list/add.png');
				this.roleInfos[index].name='';
				this.roleInfos[index].description='';
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
		// 提交上传
		submit(){
			// 前端上传验证
			var msg='您还未填写';
			if(this.gameName=='')
				msg+=' 游戏名称 '
			msg+='新增失败！';
			if(msg!='您还未填写新增失败！'){
				this.$message({
		          	message: `${msg}`,
		          	type: 'warning'
		        });
		        return;
			}
			// 图片分类信息存储
			// 存储参数--游戏图标
			this.imgsId_collection('gameIcon','icon');
			if(this.gameClass=='手机游戏'){
				// 存储参数--游戏二维码
				this.imgsId_collection('gameEwm','ewm');
			}
			//存储参数--缩略展示图
			this.imgsId_collection('gameMini','mini');
			// 存储参数--游戏背景图
			this.imgsId_collection('gameBanner','background');
			//存储参数--角色图像
			var length=$('.roleInfos').length;
			for(var i=0;i<length;i++){
				this.imgsId_collection(`gameInfoImg${i}`,'role');
			}
			// 存储参数--游戏壁纸和游戏壁纸大图
			var length=$('.gameWallpaper').length;
			for(var i=0;i<length;i++){
				this.imgsId_collection(`gamePics${i}`,'wallpaper');
				this.imgsId_collection(`gamePicl${i}`,'wallpaper_large');
			}
			// 存储参数--游戏截图和游戏截图大图
			var length=$('.gameScreenshot').length;
			for(var i=0;i<length;i++){
				this.imgsId_collection(`gameScreenshots${i}`,'screenshot');
				this.imgsId_collection(`gameScreenshotl${i}`,'screenshot_large');
			}
			// oss账户信息
			var client = new OSS.Wrapper({
		        region: 'oss-cn-shenzhen',
		        accessKeyId: 'LTAIaGX9gQ9iRNyJ',
		        accessKeySecret: '4NoCWvII2zAdM3xFNCFjNxxjzeILbb',
		        bucket:'brand-new-days'
		    });
			// 执行函数--执行图片存储函数
			this.storeImgs(client,this.imgsProxy);
		},
		// 图片信息采集
		imgsId_collection(file_id,file_path){
			var f = document.getElementById(file_id).files[0];
	    	var val= document.getElementById(file_id).value;
	    	// 如果值为空、则不上传
			if(val==''){
				return;
			}
			// 上传函数所需参数
			this.imgsProxy.push({
				path:`${file_path}/${f.name}`,
				source:f,
				type:file_id
			});//命名空间加上文件名,中间加上/ 会在后台生成文件夹(如果有crate权限)
		},
		// 同步上传
		async storeImgs(client,imgsProxy){
		    for(var i=0;i<imgsProxy.length;i++){
		    	let imgs=await client.multipartUpload(imgsProxy[i].path,imgsProxy[i].source);
		    	// 存储返回参数信息及图片类别
		    	this.imgsContent.push({
		    		type:imgsProxy[i].type,
		    		url:imgs.url
		    	});
		    }
		    this.submitAfter();
		},
		// 最终上传
		submitAfter(){
			// 图片url分类解析
			// 传给后台图片初始化
			var gameIcon,linkEwm,miniPic,gameBackground='';
			var roleInfoImg=[];
			var gameWallpapers=[];
			var gameWallpaperl=[];
			var gameScreenshots=[];
			var gameScreenshotl=[];
			this.imgsContent.forEach((data)=>{
				if(data.type=='gameIcon'){
					gameIcon=data.url;
				}else if(data.type=='gameEwm'){
					linkEwm=data.url;
				}else if(data.type=='gameMini'){
					miniPic=data.url;
				}else if(data.type=='gameBanner'){
					gameBackground=data.url;
				}else if(data.type.includes('gameInfoImg')){
					let str=data.type.split('gameInfoImg')[1];
					this.roleInfos[str].pic=data.url;
				}else if(data.type.includes('gamePics')){
					let str=data.type.split('gamePics')[1];
					gameWallpapers[str]=data.url;
				}else if(data.type.includes('gamePicl')){
					let str=data.type.split('gamePicl')[1];
					gameWallpaperl[str]=data.url;
				}else if(data.type.includes('gameScreenshots')){
					let str=data.type.split('gameScreenshots')[1];
					gameScreenshots[str]=data.url;
				}else if(data.type.includes('gameScreenshotl')){
					let str=data.type.split('gameScreenshotl')[1];
					gameScreenshotl[str]=data.url;
				}
			});
			if(this.gameClass=='网页游戏'){
				linkEwm=this.gameLink;
			}
			//最终上传的数据----将所需数据传给后台进行存储
			this.$axios.post('/infos/game_list_add',this.$qs.stringify({
				gameName:this.gameName,
				gameIcon:gameIcon||'',
				gameType:this.gameType.toString(),
				isHot:this.isHotGame,
				gameClass:this.gameClass,
				linkEwm:linkEwm||'',
				hotTag:this.hotTag.toString(),
				operateName:this.saleDepartment,
				onlineTime:this.showTime,
				onlinePeople:this.onlinePeoples,
				isShow:this.isShow,
				miniPic:miniPic||'',
				gameIntroduce:this.gameIntroduce,
				skill:this.skillLighter,
				gameBackground:gameBackground||'',
				featureGameplay:this.featureGameplay,
				roleInfos:this.roleInfos,
				gameWallpapers:gameWallpapers.length==0?'':gameWallpapers,
				gameWallpaperl:gameWallpaperl.length==0?'':gameWallpaperl,
				gameScreenshots:gameScreenshots.length==0?'':gameScreenshots,
				gameScreenshotl:gameScreenshotl.length==0?'':gameScreenshotl
			})).then((res)=>{
				// 返回信息
				this.dialogShow=false;
				var str=this.dialogType.substring(0,2);
				this.$message({
		          	message: `${str}成功！`,
		          	type: 'success'
		        });
			}).catch((err)=>{
				console.log(err);
			});
		}
	}
}
</script>