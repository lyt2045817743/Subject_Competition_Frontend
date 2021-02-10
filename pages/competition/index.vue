<template>
	<view class="competition">
		<view class="comp-box">
			<u-sticky :enable="enable">
				<view class="sticky">
					<u-search placeholder="请输入竞赛名称" v-model="competitionKW" @search="searchCompetition" @custom="searchCompetition"></u-search>
					<view class="cb-radio">
						<text class="cbr-cate__text">{{subCateObj.label}} ({{curCateSum}})</text>
						<text class="cbr-cate__text">我参与的</text>
						<text class="cbr-cate__text">我关注的</text>
						<view class="cbr-more" @click="showCategoryList = true">
							更多分类
							<u-icon name="arrow-down" />
						</view>
					</view>
				</view>
			</u-sticky>
			<u-select v-model="showCategoryList" mode="mutil-column-auto" :list="categoryList" @confirm="confirmCate"></u-select>
			<view class="cb-list">
				<view class="cbl-hasdata" v-if="compeInfoList.length">
					<single-competition v-for="(item, index) in compeInfoList" :key="item.id" :cardInfo="item" :hasBtns="true"/>
					<u-loadmore :status="status" margin-top="30" @loadmore="loadmoreCom()"/>
				</view>
				<u-empty text="暂无数据" mode="list" v-else></u-empty>
			</view>
		</view>
		<view class="wrap">
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>
</template>

<script>
	import categoryList from './tempData/categoryList.js'
	import SingleCompetition from './components/SingleCompetition'
	const { log } = console;
	export default {
		components:{SingleCompetition},
		data() {
			return {
				showCategoryList: false,
				scrollTop: 0,
				enable: true,
				subCateObj: {
					label: '全部',
					value: -1
				},
				status: 'loadmore',
				competitionKW: '',
				categoryList, // 从这里开始的变量为后端获取
				curCateSum: 10,
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
				]
			}
		},
		// 在对应的show和hide页面生命周期中打开或关闭监听
		onShow() {
			this.enable= true
		},
		onHide() {
			this.enable= false
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			searchCompetition(value) {
				log(value)
			},
			confirmCate(value) {
				log(value)
				this.cateObj = value[0];
				this.subCateObj = value[1];
			},
			loadmoreCom() {
				this.compeInfoList = this.compeInfoList.concat(this.compeInfoList);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.competition {
		padding: 0 40upx 35upx;
		.comp-box {
			.sticky {
				padding-top: 35upx;
				background: #fff;
				.cb-radio {
					padding: 25upx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.cbr-cate__text {
						font-size: 30upx;
						font-weight: bold;
					}
					.cbr-more {
						
					}
					/deep/ .u-icon__icon.uicon-arrow-down {
						margin-left: 12.5upx;
					}
				}
			}
			.cb-list {
				position: relative;
				.cbl-hasdata {
					margin-top: -25upx;
				}
			}
		}
	}
</style>
