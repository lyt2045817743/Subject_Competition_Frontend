<template>
	<view class="competition font-set">
		<u-navbar title="首页" :is-back="false" title-color="#ffffff" :background="{background: '#39cccc'}" :title-bold="true"></u-navbar>
		<view class="comp-box">
			<u-sticky :enable="enable">
				<view class="sticky">
					<u-search placeholder="请输入竞赛名称" v-model="competitionKW" @search="initData" @custom="initData"></u-search>
					<u-gap height="25" bg-color="#F0F5F8"></u-gap>
					<view class="cb-radio">
						<text :class="['cbr-cate__text', currentCate === 'all' ? 'active' : '']" @click="tabHandle('all')">{{subCateObj.label}} ({{curCateSum}})</text>
						<text :class="['cbr-cate__text', currentCate === 'join' ? 'active' : '']" @click="tabHandle('join')">我参与的</text>
						<text :class="['cbr-cate__text', currentCate === 'concern' ? 'active' : '']" @click="tabHandle('concern')">我关注的</text>
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
					<single-competition v-for="(item) in compeInfoList" :key="item.id" :cardInfo="item" :hasBtns="true"/>
					<u-loadmore :status="status" margin-top="30" @loadmore="initData()"/>
				</view>
				<u-empty class="empty" text="暂无数据" mode="list" v-else></u-empty>
			</view>
		</view>
		<view class="wrap">
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>
</template>

<script>
	import categoryList from './tempData/categoryList.js'
	import SingleCompetition from '../../components/SingleCompetition/SingleCompetition'
	import { queryCompListFun } from '../../api/competition.js'
	const { log } = console;
	export default {
		components:{ SingleCompetition },
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
				pageCount: 0,
				competitionKW: '',
				currentCate: 'all',
				
				categoryList, // 从这里开始的变量为后端获取
				curCateSum: 10,
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
			searchCompetition(value) {
				// log(value)
			},
			confirmCate(value) {
				// log(value)
				this.cateObj = value[0];
				this.subCateObj = value[1];
			},
			
			// 当切换赛事分类tab时
			tabHandle(tabName) {
				this.currentCate = tabName;
				//...
			},
			
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
							// 如果关键词发生变化，则pageCount重新从1开始，需要清除之前数据。
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
			
		},
		
		// 在对应的show和hide页面生命周期中打开或关闭监听
		onShow() {
			// 每次切换tab页后重新加载页面初始数据			
			this.pageCount = 0;
			this.initData()
			this.enable= true
		},
		onHide() {
			this.enable= false
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
	.competition {
		padding-bottom: 35upx;
		.comp-box {
			.sticky {
				padding-top: 35upx;
				background: #fff;
				.cb-radio {
					padding: 25upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.cbr-cate__text {
						font-size: 30upx;
						&.active {
							color: #39CCCC;
							font-weight: bold;
						}
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
					padding: 0 25upx;
				}
			}
		}
	}
	/deep/ .u-search {
		padding: 0 25upx 25upx;
		width: 100%;
	}
	.empty {
		position: fixed;
		top: 50vh;
		left: 50vw;
		transform: translateX(-50%);
	}
</style>
