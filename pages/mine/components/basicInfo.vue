<template>
	<view class="myhome font-set">
		<u-avatar src="" size="large" @click="goMineSet" mode="circle"></u-avatar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goMineSet() {
				uni.navigateTo({
					url: '/home/pages/mineSet'
				})
			}
		}
	}
</script>

<style>
	.myhome{
		background: linear-gradient(to top, #d6f5f5 10%, #39cccc 100%); 
		height: 350upx; 
		display: flex; 
		align-items: center;
		padding: 30upx;
	}
</style>
