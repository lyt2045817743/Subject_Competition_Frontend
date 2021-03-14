<template>
	<view class="content font-set">
		<first-line title="用户列表" url="./addUser" />
		<pro-table placeholder="请输入用户名" :dataList="dataList" :showCol="showCol" />
	</view>
</template>

<script>
	import FirstLine from '../../components/FirstLine/FirstLine.vue'
	import ProTable from '../../components/ProTable/ProTable.vue'
	import { queryUserListFun } from '../../../api/user.js'
	import codeTranslater from '../../../utils/codeTranslater.js'
	import { identityModel } from '../../../models/user.d.js'
	
	let { log } = console
	export default {
		components:{ FirstLine, ProTable },
		data() {
			return {
				dataList: [],
				pageCount: 0,
				keyword: '',
				showCol: [
					{
						code: 'numberId',
						label: '学工号'
					},{
						code:'isManager',
						label: '管理员',
					},{
						code:'identityType',
						label: '身份'
					}
				]
			}
		},
		onLoad() {
			 this.initData()
		},
		methods: {
			initData() {
				this.pageCount = this.pageCount + 1;
				queryUserListFun({pageNum: 5, pageCount: this.pageCount, keyword: this.keyword}).then( res => {
			
					const codeTrans = new codeTranslater(identityModel)
					const dataList = res.data.map( item => {
						return {
							numberId: item.numberId,
							isManager: item.isManager ? '是' : '否',
							identityType: codeTrans.transCode(item.identityType)
						}
					})
					
			
					if(dataList.length) {
						if(this.pageCount !== 1) {
							this.dataList = this.dataList.concat(dataList);
						} else {
							// 如果关键词发生变化，此时pageCount是从1开始，需要清除之前数据。
							this.dataList = dataList;
						}
					}
					// log(this.dataList)
					 // console.log(res.data)
				})
			},
		}
	}
</script>

