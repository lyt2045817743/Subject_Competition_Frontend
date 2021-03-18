<template>
	<view class="font-set">
		<view class="compInfo-box">
			<view class="cb-firstline">
				<text class="cbf-name">{{cardInfo.name}}</text>
			</view>
			<view class="cb-single">主办单位：{{cardInfo.institution}}</view>
			<view class="cb-single">发布单位：{{cardInfo.currentInsti}}</view>
			<view class="cb-single">发布时间：{{cardInfo.createTime}}</view>
			<view class="cb-single">报名截止时间：{{cardInfo.deadlineDate}}</view>
		</view>
		<view class="compInfo-btns">
			<u-grid :col="3" :border="false">
				<u-grid-item @click="goPage('notify')" :custom-style="{'border': '5px solid #ffffff'}" bg-color="#f1fefe">
					<u-icon name="bell"></u-icon>
					<view class="grid-text">赛事通知</view>
				</u-grid-item>
				<u-grid-item :custom-style="{'border': '5px solid #ffffff'}" bg-color="#f1fefe" @click="goPage('download')">
					<u-icon name="download" class=""></u-icon>
					<view class="grid-text">附件下载</view>
				</u-grid-item>
				<u-grid-item @click="goPage('apply')" :custom-style="{'border': '5px solid #ffffff'}" bg-color="#f1fefe">
					<u-icon name="hourglass-half-fill"></u-icon>
					<view class="grid-text">去报名</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	let { log } = console;
	export default {
		data() {
			return {
				cardInfo: {}
			}
		},
		onLoad(detail) {
			const cardInfo = decodeURIComponent(detail.cardInfo);
			this.cardInfo = JSON.parse(cardInfo)
			log(this.cardInfo)
		},
		methods: {
			
			goPage(pageName) {
				uni.navigateTo({
					// pages/competition/
					url: './' + pageName + '?id=' + this.cardInfo.id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.compInfo-box {
		background-color: #cffcfc;
		margin-bottom: 30upx;
		padding: 35upx;
		box-shadow: 0px 1px 0px 0px #f2f2f2;
		.cb-firstline {
			font-size: 35rpx;
			font-weight: bold;
			color: #0dbfbf;
			padding: 10rpx;
			padding-left: 0;
		}
		.cb-single {
			font-size: 27.5upx;
			margin-top: 25upx;
		}
	}
	.compInfo-btns {
		margin: 0 25upx;
		padding: 25upx;
	}
</style>
