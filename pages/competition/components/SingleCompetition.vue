<template>
	<view class="single-com__card">
		<view class="sc-info" @click="showDetailBtns = !showDetailBtns">
			<view class="si-basic">
				<u-avatar :src="cardInfo.headUrl" size="large" />
				<view class="sib-text">
					<view class="sibt-firstline">
						<text class="sif-name">{{cardInfo.comName}}</text>
						<text class="sif-label">{{curStage}}</text>
					</view>
					<view class="sibt-single">发布单位：{{cardInfo.pubInsitName}}</view>
					<view class="sibt-single">发布时间：{{cardInfo.pubTimeStr}}</view>
				</view>
			</view>
			<view class="deadline" v-if="cardInfo.deadlineObj">{{cardInfo.deadlineObj.label}}：{{cardInfo.deadlineObj.time}}</view>
		</view>
		<view class="sc-btns" v-if="hasBtns && showDetailBtns">
			<u-grid :col="4">
				<u-grid-item @click="goPage('notify')">
					<!-- <u-badge count="9" :offset="[20, 20]"></u-badge> -->
					<u-icon name="bell"></u-icon>
					<view class="grid-text">赛事通知</view>
				</u-grid-item>
				<u-grid-item @click="goPage('download')">
					<u-icon name="download" class=""></u-icon>
					<view class="grid-text">附件下载</view>
				</u-grid-item>
				<u-grid-item @click="goPage('apply')">
					<u-icon name="hourglass-half-fill"></u-icon>
					<view class="grid-text">去报名</view>
				</u-grid-item>
				<u-grid-item @click="goPage('history')">
					<u-icon name="clock"></u-icon>
					<view class="grid-text">历年风采</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import codeTranslater from '../../../utils/codeTranslater'
	import { comStageModel } from '../../../models/competition.d'
	export default {
		data() {
			return {
				showDetailBtns: false,
				curStage: ''
			}
		},
		props: {
			hasBtns: {
				type: Boolean,
				default: true
			},
			cardInfo: {
				type: Object,
				default: {}
			}
		},
		watch: {
			cardInfo: {
				handler(val) {
					if(val) {
						this.curStage = new codeTranslater(comStageModel).transCode(val.curStageNum)
					};
				},
				immediate: true
			}
		},
		methods: {
			goPage(pageName) {
				
				uni.navigateTo({
					url: './' + pageName + '?id=' + this.cardInfo.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
	.single-com__card {
		.sc-info{
			border: 1px solid #f2f2f2;
			box-shadow: 0px 1px 0px 0px #f2f2f2;
			padding: 17.5upx;
			margin-top: 25upx;
			.si-basic {
				display: flex;
				align-items: center;
				.sib-text {
					margin-left: 12.5upx;
					.sibt-firstline {
						display: flex;
						.sif-name {
							font-size: 35upx;
							font-weight: bold;
						}
						.sif-label {
							display: inline-block;
							padding: 0 10upx;
							border: 1px dashed #d9d9d9;
							margin-left: 12.5upx;
							background: #fafad1;
						}
					}
					.sibt-single {
						font-size: 27.5upx;
						margin-top: 7.5upx;
					}
				}
			}
			.deadline {
				margin-top: 7.5upx;
			}
		}
		.sc-btns {
			
		}
	}
</style>
