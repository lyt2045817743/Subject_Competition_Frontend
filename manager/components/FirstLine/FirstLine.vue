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
					url: this.url
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
	}
}
</style>
