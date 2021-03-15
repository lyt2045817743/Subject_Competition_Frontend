<template>
	<view class="firstline">
		<text class="title">{{title}}</text>
		<view class="newbtn" @click="addComp">
			<u-icon name="plus-circle" />新建
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: {
				type: String,
				default: '列表'
			},
			url: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			addComp() {
				uni.navigateTo({
					url: this.url + '?type=add'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.firstline {
    display: flex;
    align-items: center;
    justify-content: space-between;
	margin-bottom: 25upx;
	.title {
	    font-size: 35upx;
	    font-weight: bold;
		display: flex;
		color: #44a299;
		&::before {
			display: block;
			content: "";
			margin-right: 12.5upx;
			width: 0;
			border: 7.5upx solid #44a299;
		}
	}
	.newbtn {
		background-color: #93d2cc;
		border-radius: 25upx;
		padding: 12.5upx;
	}
}
</style>
