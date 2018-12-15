export const public_data={
	created(){
		this.getData();//获取用户列表信息
	},
	data(){
		return{
			dataList:[],//用户数据存放
			page:1,//当前页数
			pages:0,//总页数
			dialogShow:false,// 查看模态框是否显示/隐藏
			dialogType:'',//模态框类型
		}
	},
	filters:{
		filter_time(value){
			// 日期格式化操作
			var date=value.split('T')[0]+' '+new Date(value).toTimeString().split(' ')[0];
			return date;
		}
	},
	methods:{
		// 时间查询组件---接收时间
		change_searchTime(time){
			this.time=time;
		},
		// 分页组件---点击分页
		change_page(page){
			// 改变分页、重新获取数据
			this.page=page;
			this.getData();
		},
	}
}