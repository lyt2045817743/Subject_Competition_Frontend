<template>
	<view>
		<button class="btn-logout" @click="modalShow = true">退出登录</button>
		<u-modal v-model="modalShow" @confirm="logout()" :show-cancel-button="true" content="确定退出登录？"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalShow: false
			}
		},
		methods: {
			// fnClick(type){
			//   if(type == 'modify'){
			//     uni.navigateTo({
			//       url:''
			//     })
			//   }
			// }
			logout() {
				uni.removeStorageSync('TOKEN');
				uni.removeStorageSync('USER');
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-logout {
		margin-top: 100upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #365fff, #36bbff);
	}
</style>
