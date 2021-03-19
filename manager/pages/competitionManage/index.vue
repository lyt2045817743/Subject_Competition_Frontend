<template>
	<view class="content font-set">
		<first-line title="赛事列表" url="./addCompetition" />
		<!-- 搜索框 -->
		<view class="search">
			<u-search placeholder="请输入竞赛名称" v-model="competitionKW" @search="initData" @custom="initData"></u-search>
		</view>
		<!-- 赛事信息列表 -->
		<view class="comp-list">
			<view class="cbl-hasdata" v-if="compeInfoList.length">
				<single-competition v-for="(item, index) in compeInfoList" :key="item.id" :cardInfo="item" :hasBtns="false"/>
				<u-loadmore :status="status" margin-top="30" @loadmore="initData()"/>
			</view>
			<u-empty class="empty" text="暂无数据" mode="list" v-else></u-empty>
		</view>
	</view>
</template>

<script>
	import SingleCompetition from '@/components/SingleCompetition/SingleCompetition'
	import FirstLine from '../../components/FirstLine/FirstLine.vue'
	// import compeInfoList from '../competition/tempData/compeInfoList.js'
	import { queryCompListFun } from '@/api/competition.js'
	export default {
		components: { SingleCompetition, FirstLine },
		data() {
			return {
				status: 'loadmore',
				// pageNum: 2,  // 这里为固定值
				pageCount: 0,
				competitionKW: '',
				compeInfoList: [],
			}
		},
		watch: {
			competitionKW(val) {
				this.pageCount = 0;
				this.status = 'loadmore';
			}
		},
		onLoad() {
			 this.initData()
		},
		methods: {
			initData() {
				this.pageCount = this.pageCount + 1;
				queryCompListFun({pageNum: 5, pageCount: this.pageCount, keyword: this.competitionKW}).then( res => {
					
					if(res.data.length) {
						
						// 如果已经获取不到5个数据，则没有更多数据了
						if(res.data.length < 5) {
							this.status = 'nomore'
						}
						if(this.pageCount !== 1) {
							this.compeInfoList = this.compeInfoList.concat(res.data);
						} else {
							// 如果关键词发生变化，此时pageCount是从1开始，需要清除之前数据。
							this.compeInfoList = res.data;
						}
						
					} else {
						this.status = 'nomore'
					}
					 // console.log(res.data)
				}).catch( err => {
					// log(err);
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					})
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
.firstline {
    display: flex;
    align-items: center;
    justify-content: space-between;
	margin-bottom: 25upx;
	.title {
	    font-size: 35upx;
	    font-weight: bold;
	}
}
.empty {
	position: fixed;
	top: 45vh;
	left: 50vw;
	transform: translateX(-50%);
}
</style>
