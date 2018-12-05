<template>
	<div>
		<div class="title">后台管理首页</div>
		<input type="file" id="file" style="display:block" />
		<br/>
		<button value="提交" @click="on_click_upload_file();">提交</button>
	</div>
</template>
<script>
export default{
	methods:{
		on_click_upload_file(){
			var client = new OSS.Wrapper({
		        region: 'oss-cn-shenzhen',
		        accessKeyId: 'LTAIaGX9gQ9iRNyJ',
		        accessKeySecret: '4NoCWvII2zAdM3xFNCFjNxxjzeILbb',
		        bucket:'brand-new-days'
		    });
			var f = document.getElementById("file").files[0];
	    	console.log(f.name);
	    	var val= document.getElementById("file").value;
	    	var suffix = val.substr(val.indexOf("."));
	    	var obj='hello/world2';  // 这里是生成文件名
	    	var storeAs = obj+suffix;  //命名空间加上文件名,中间加上/ 会在后台生成文件夹(如果有crate权限)
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