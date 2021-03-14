<template>
	<view class="font-set">
		<u-navbar title="个人中心" :border-bottom="false" title-color="#ffffff" :is-back="false" :background="{background: '#39cccc'}" :title-bold="true"></u-navbar>
		<basic-info></basic-info>
		<view class="shortcut">
			<view class="shortcut-box">
				<view class="scb-title">业务</view>
				<u-grid :col="3" :border="false">
					<u-grid-item :custom-style="{'border': '3px solid #ffffff'}" bg-color="#f1fefe" v-for="(item) in shortcutList.business" :key="item.label"  @click="goPath(item.path)">
						<u-icon :name="item.icon" :size="46"></u-icon>
						<view class="grid-text">{{item.label}}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="shortcut-box">
				<view class="scb-title">系统</view>
				<u-grid :col="3" :border="false">
					<u-grid-item :custom-style="{'border': '3px solid #ffffff'}" bg-color="#f1fefe" v-for="(item) in shortcutList.system" :key="item.label"  @click="goPath(item.path)">
						<u-icon :name="item.icon" :size="46"></u-icon>
						<view class="grid-text">{{item.label}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import basicInfo from './components/basicInfo'
	import { managerShortcut } from '../../models/shortcutAuthorize.d.js'
	export default {
		components: { basicInfo },
		data() {
			return {
				shortcutList: []
			}
		},
		onLoad() {
			// 从缓存中获取用户身份
			this.shortcutList = managerShortcut;
		},
		methods: {
			goPath(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shortcut {
		margin: 40upx;
		.shortcut-box{
			margin-bottom: 25upx;
			.scb-title{
				margin-bottom: 25upx;
				font-size: 35upx;
				font-weight: bold;
				display: flex;
				&::before {
					display: block;
					content: "";
					margin-right: 12.5upx;
					width: 0;
					border: 7.5upx solid #39cccc;
				}
			}
		}
	}
	.u-grid-item {
		border-radius: 7.5upx;
	}
</style>
