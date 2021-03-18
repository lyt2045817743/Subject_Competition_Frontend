<template>
	<view class="single-com__card font-set">
		<view class="sc-info" @click="cardClickHandle">
			<view class="si-basic">
				<!-- <u-avatar :src="cardInfo.headUrl" size="large" /> -->
				<view class="sib-text">
					<view class="sibt-firstline">
						<text class="sif-name">{{cardInfo.name}}</text>
						<text class="sif-label">{{curStage}}</text>
					</view>
					<view class="sibt-single">主办单位：{{cardInfo.institution}}</view>
					<view class="sibt-single">发布单位：{{cardInfo.currentInsti}}</view>
					<view class="sibt-single">发布时间：{{createTime}}</view>
				</view>
			</view>
			<view :class="['deadline', cardInfo.deadline < 2 ? 'active' : '']" v-if="curStage === '报名中' && cardInfo.deadline">报名倒计时：{{cardInfo.deadline}}天</view>
		</view>
	</view>
</template>

<script>
	import codeTranslater from '../../utils/codeTranslater'
	import calendarComputer from '../../utils/calendarComputer.js'
	import { comStageModel } from '../../models/competition.d'
	export default {
		data() {
			return {
				// showDetailBtns: false,
				curStage: '',
				createTime: ''
			}
		},
		props: {
			// hasBtns: {
			// 	type: Boolean,
			// 	default: true
			// },
			cardInfo: {
				type: Object,
				default: {}
			},
			goUrl: {
				type: String
			}
		},
		watch: {
			cardInfo: {
				handler(val) {
					if(val) {
						this.curStage = new codeTranslater(comStageModel).transCode(val.curStageNum);
						this.createTime = new calendarComputer(val.createTime).switchTimeFormat()
					};
				},
				immediate: true
			}
		},
		methods: {
			cardClickHandle() {
				this.cardInfo.createTime = this.createTime;
				this.cardInfo.deadlineDate = new calendarComputer(new Date(Date.parse(this.cardInfo.deadlineDate))).combatDate()
				const cardInfo = JSON.stringify(this.cardInfo)
				uni.navigateTo({
					url: this.goUrl + '?cardInfo=' + encodeURIComponent(cardInfo)
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
		position: relative;
		.sc-info{
			// border: 1px solid #f2f2f2;
			box-shadow: 0px 1px 0px 0px #f2f2f2;
			padding: 0;
			padding-bottom: 25upx;
			margin-top: 25upx;
			border-radius: 15upx;
			border: 2.5upx solid #ebfafa;
			.si-basic {
				display: flex;
				align-items: center;
				.sib-text {
					// margin-left: 25upx;
					width: 100%;
					.sibt-firstline {
						display: flex;
						padding: 25upx;
						background: #d6f5f5;
						.sif-name {
							font-size: 35upx;
							font-weight: bold;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.sif-label {
							display: inline-block;
							padding: 0 10upx;
							border: 1px dashed #ebfafa;
							margin-left: 12.5upx;
							background: #fafad1;
							position: absolute;
							right: 0;
							top: 0;
						}
					}
					.sibt-single {
						font-size: 27.5upx;
						margin-top: 12.5upx;
						padding: 0 25upx;
					}
				}
			}
			.deadline {
				// margin-top: 12.5upx;
				padding: 5upx;
				position: absolute;
				color: #4da6ff;
				right: 5upx;
				bottom: 0;
				text-align: center;
				&.active {
					color: red;
				}
			}
		}
		.sc-btns {
			
		}
	}
</style>
