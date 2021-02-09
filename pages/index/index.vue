<template>
	<view class="content">
		<u-button type="primary">登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			loginFinish() {
				uni.switchTab({
					url:'../competition/competition'
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-btn--primary {
		width: 80%;
		margin: 10px auto;
	}
</style>
