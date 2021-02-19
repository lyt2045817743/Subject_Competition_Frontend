<template>
	<view class="content">
		<view class="firstline">
			<text class="title">赛事列表</text>
			<text class="newbtn" @click="addComp">
				<u-icon name="plus-circle" />新建
			</text>
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
	export default {
		components: { SingleCompetition },
		data() {
			return {
				status: 'loadmore',
				competitionKW: '',
				compeInfoList: [
					{
						id: 0,
						headUrl: 'https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=87837f470a654ccbb19959cb54dd9567&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F3812b31bb051f81925995780ddb44aed2f73e7b8.jpg',
						comName: '全国大学生机器人大赛',
						pubInsitName: '信息与计算机工程学院',
						pubTimeStr: '2021.02.08',
						curStageNum: 0,
						deadlineObj: {
							label: '报名截止时间',
							time: '2021.05.31'
						}
					},
					{
						id: 1,
						headUrl: 'https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=87837f470a654ccbb19959cb54dd9567&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F3812b31bb051f81925995780ddb44aed2f73e7b8.jpg',
						comName: '全国大学生机器人大赛',
						pubInsitName: '信息与计算机工程学院',
						pubTimeStr: '2021.02.08',
						curStageNum: 0,
						deadlineObj: {
							label: '报名截止时间',
							time: '2021.05.31'
						}
					}
				],
				loadmoreCom() {
					this.compeInfoList = this.compeInfoList.concat(this.compeInfoList);
				},
			}
		},
		methods: {
			addComp() {
				uni.navigateTo({
					url: './basicInfo'
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
</style>
