<template>
	<view class="content">
		<view class="firstline">
			<text class="title">赛事列表</text>
			<view class="newbtn" @click="addComp">
				<u-icon name="plus-circle" />新建
			</view>
		</view>
		<view class="search">
			<u-search placeholder="请输入竞赛名称" v-model="competitionKW" @search="searchCompetition" @custom="searchCompetition"></u-search>
		</view>
		<view class="comp-list">
			<view class="cbl-hasdata" v-if="compeInfoList.length">
				<single-competition v-for="(item, index) in compeInfoList" :key="item.id" :cardInfo="item" :hasBtns="false"/>
				<u-loadmore :status="status" margin-top="30" @loadmore="loadmoreCom()"/>
			</view>
			<u-empty text="暂无数据" mode="list" v-else></u-empty>
		</view>
	</view>
</template>

<script>
	import SingleCompetition from '../competition/components/SingleCompetition'
	// import compeInfoList from '../competition/tempData/compeInfoList.js'
	import { queryCompListFun } from '../../api/competition.js'
	export default {
		components: { SingleCompetition },
		data() {
			return {
				status: 'loadmore',
				competitionKW: '',
				compeInfoList: [],
				loadmoreCom() {
					// this.compeInfoList = this.compeInfoList.concat(this.compeInfoList);
				},
			}
		},
		methods: {
			addComp() {
				uni.navigateTo({
					url: './basicInfo'
				})
			}
		},
		onLoad() {
			 queryCompListFun({pageNum:3, pageCount: 1}).then( res => {
				 this.compeInfoList = res.data
				 console.log(res.data)
			 })
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
.u-empty {
	position: fixed;
	top: 0vh;
	left: 50vw;
	transform: translateX(-50%);
}
</style>
