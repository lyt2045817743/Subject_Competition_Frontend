<template>
	<view class="font-set">
		<view class="search">
			<u-search :placeholder="placeholder" v-model="keyword" @search="initData" @custom="initData"></u-search>
		</view>
		<view class="comp-list">
			<view class="cbl-hasdata" v-if="dataList.length">
				<u-swipe-action :show="false" :index="index" 
					v-for="(item, index) in dataList" :key="item.id" 
					@click="click" @open="open"
					:options="options"
				>
					<view class="u-border-bottom">
						{{item.title}}
					</view>
				</u-swipe-action>
			</view>
			<u-empty class="empty" text="暂无数据" mode="list" v-else></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			placeholder: {
				type: String,
				default: '请输入关键词'
			},
			api: {
				type: String,
				default: ''
			}
			// dataList: {
			// 	type: Array,
			// 	default: []
			// }
		},
		watch: {
			keyword(val) {
				this.pageCount = 0;
			}
		},
		onLoad() {
			 this.initData()
		},
		data() {
			return {
				pageCount: 0,
				keyword: '',
				dataList: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '详情',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		methods: {
			initData() {
				this.pageCount = this.pageCount + 1;
				queryCompListFun({pageNum: 5, pageCount: this.pageCount, keyword: this.keyword}).then( res => {

					if(res.data.length) {
						if(this.pageCount !== 1) {
							this.dataList = this.dataList.concat(res.data);
						} else {
							// 如果关键词发生变化，此时pageCount是从1开始，需要清除之前数据。
							this.dataList = res.data;
						}
					}
					 // console.log(res.data)
				})
			},
			click(index, btnInx) {
				if(btnInx == 1) {
					this.dataList.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.dataList[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			// 打开一个的时候，关闭其他。
			open(index) {
				// 原本为'false'，再次设置为'false'会无效
				this.dataList[index].show = true;
				this.dataList.map((val, idx) => {
					if(index != idx) this.dataList[idx].show = false;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.empty {
	position: fixed;
	top: 45vh;
	left: 50vw;
	transform: translateX(-50%);
}
</style>
