<template>
	<div>
		<div class="title">banner图</div>
		<div class="searchs">
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
			<el-button class="mr25" type="primary" icon="el-icon-search">查询</el-button>
			<el-button type="success" class="add_btn" @click="dialog_show=true;dialog_type='添加banner图'">添加</el-button>
		</div>
		<table class="main_table">
			<thead>
				<tr>
					<td>ID</td>
					<td>banner图</td>
					<td>是否显示</td>
					<td>跳转链接</td>
					<td>到期时间</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in 10">
					<td>1000001</td>
					<td><img class="table_img" src="static/games_banner/banner.png" alt="banner图"></td>
					<td>否</td>
					<td><a href="http://www.p9yi.xyz/games_center/infos">http://www.p9yi.xyz/games_center/infos</a></td>
					<td>2018-11-16 17:51:20</td>
					<td>
						<el-button size="mini" type="warning" icon="el-icon-edit" @click="dialog_show=true;dialog_type='修改banner图'">修改</el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="del">删除</el-button>
					</td>
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
		<!-- 新增与修改模态框 -->
		<el-dialog
			title="banner图"
			:visible.sync="dialog_show"
			width="30%"
			center>
			<table class="mini">
				<caption>{{dialog_type}}</caption>
				<tr>
					<td>banner图</td>
					<td>
						<input id="game_banner" type="file" @change="change_file_img($event,'game_banner','select_img')">
						<img v-if="dialog_type=='添加banner图'" class="select_img" src="static/games_list/add.png" alt="hello world" @click="pic_click('game_banner')">
						<img v-if="dialog_type=='修改banner图'" class="select_img" src="static/games_list/games1.png" alt="hello world" @click="pic_click('game_banner')">
					</td>
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
				<tr>
					<td>跳转链接</td>
					<td><el-input v-model="game_link" placeholder="请输入跳转链接"></el-input></td>
				</tr>
				<tr>
					<td>到期时间</td>
					<td>
						<el-date-picker
							v-model="end_time"
							type="datetime"
							placeholder="选择到期时间">
						</el-date-picker>
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
			visible2:false,
			page:1,
			pages:0,
			search_content:'',//查询的内容
			is_show:'',//搜索当前是否显示
			is_show_dialog:'',//模态框当前是否显示
			is_shows:['是','否'],//全部是否显示
			dialog_show:false,//模态框是否显示
			dialog_type:'',//当前模态框标题
			game_link:'',//跳转链接
			end_time:'',//到期时间
		}
	},
	methods:{
		del(done) {
			this.$confirm('确认删除？').then(_ => {
				this.$message({
		          	message: '删除成功！',
		          	type: 'success'
		        });
			}).catch(_ => {});
		},
		submit(){
			this.on_click_upload_file();
			this.dialog_show=false;
			var str=this.dialog_type.substring(0,2);
			this.$message({
	          	message: `${str}成功！`,
	          	type: 'success'
	        });
		},
		pic_click(id){
			$(`#${id}`).click();
		},
		change_file_img(e,_id,type){
			var preview=document.querySelectorAll(`.${type}`)[0];
			var file=document.getElementById(_id).files[0];
			var reader=new FileReader();
			console.log(e);
			reader.onloadend=()=>{
                preview.src=reader.result;
            }
            // 图片文件不空就显示
            if(file){
                reader.readAsDataURL(file);
            }
            // else{
            //     // 图片文件是空的
            //     preview.src = "";
            // }
		},
		on_click_upload_file(){
			var client = new OSS.Wrapper({
		        region: 'oss-cn-shenzhen',
		        accessKeyId: 'LTAIaGX9gQ9iRNyJ',
		        accessKeySecret: '4NoCWvII2zAdM3xFNCFjNxxjzeILbb',
		        bucket:'brand-new-days'
		    });
			var f = document.getElementById("game_banner").files[0];
	    	var val= document.getElementById("game_banner").value;
	    	var obj=`banner/${f.name}`;  // 这里是生成文件名
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
<style scoped lang="styl">

</style>