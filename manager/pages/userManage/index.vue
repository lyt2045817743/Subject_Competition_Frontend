<template>
	<view class="content font-set">
		<first-line title="用户列表" url="./addUser" />
		<pro-table placeholder="请输入用户名" detailUrl="./addUser" @changeShow="changeDataShow" @delHandle="delUserHandle" @update="initData" @changeKeyword="changeKeywordFun" :pageCount="pageCount" :dataList="dataList" :allCol="allCol" keyLabel="numberId" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import FirstLine from '../../components/FirstLine/FirstLine.vue'
	import ProTable from '../../components/ProTable/ProTable.vue'
	import { queryUserListFun, delUserFun } from '../../../api/user.js'
	import codeTranslater from '../../../utils/codeTranslater.js'
	import { identityModel } from '../../../models/user.d.js'
	
	let { log } = console
	export default {
		components:{ FirstLine, ProTable },
		data() {
			return {
				dataList: [],
				pageCount: 1,
				keyword: '',
				allCol: [
					{
						code: 'numberId',
						name: '学工号',
						checked: true
					},{
						code:'isManager',
						name: '管理员',
						checked: true
					},{
						code:'identityType',
						name: '身份',
						checked: true
					}
				]
			}
		},
		// 在onShow生命周期获取初始数据，可以保证新增数据返回后能够重新获取数据。
		onShow() {
			 this.initData(1)
		},
		methods: {
			initData(pageCount) {
				if(pageCount) this.pageCount = pageCount;
				// log(this.pageCount, this.keyword)
				queryUserListFun({pageNum: 5, pageCount: pageCount || this.pageCount, keyword: this.keyword}).then( res => {
			
					const codeTrans = new codeTranslater(identityModel)
					const dataList = res.data.map( item => {
						return {
							numberId: item.numberId,
							isManager: item.isManager ? '是' : '否',
							identityType: codeTrans.transCode(item.identityType)
						}
					})
					
					if(dataList.length || this.pageCount === 1) {
						this.dataList = dataList;
					} else {
						uni.showToast({
							title: '没有更多了！',
							icon: 'none',
							duration: 1500    //持续时间为 1.5秒
						}) 
						this.pageCount = this.pageCount - 1;
					}
					// log(this.dataList)
					 // console.log(res.data)
				}).catch( err => {
					// log(err);
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					})
				})
			},
			changeKeywordFun(newVal) {
				this.keyword = newVal;
			},
			delUserHandle(numberId) {
				delUserFun(numberId).then( res => {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
					})
					this.initData(1);
				}).catch( err => {
					// log(err);
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					})
				})
			},
			// 改变数据行操作栏的显示状态
			changeDataShow(index, action = false) {
				// 原本为'false'，再次设置为'false'会无效
				const tempList = JSON.parse(JSON.stringify(this.dataList))
				tempList[index].show = true;
				if(action) {
					setTimeout(function(){
						tempList[index].show = false;
					}, 700)
				}
				this.dataList = tempList.map((val, idx) => {
					if(index != idx) {
						return {
							...val,
							show:false
						}
					} else {
						return val;
					}
				})
				// log(index, this.dataList)
			}
		}
	}
</script>

