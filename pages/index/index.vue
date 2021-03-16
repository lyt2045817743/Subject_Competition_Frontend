<template>
	<view class="content">
		<view class="info-box">
			<u-avatar class="icon-img" :src="logoUrl" size="250" mode="circle"></u-avatar>
			<view class="title">
				高校学科竞赛系统
			</view>
		</view>
		<view class="personal-info__form">
			<u-input v-model="numberId" placeholder="请输入学号/教工号/专家账号" type="text" :border="true"/>
			<u-input v-model="password" :password-icon="false" placeholder="请输入密码" type="password"  :border="true"/>
			<u-button type="primary" @click="loginFinish()">登录</u-button>
		</view>
	</view>
</template>

<script>
	import { mySetStorage, myGetStorage } from '../../utils/cacheStorage.js'
	import { logoUrl } from '../../config/base.js'
	import { loginFun } from '../../api/user.js'
	export default {
		data() {
			return {
				logoUrl,
				numberId: '',
				password:''
			}
		},
		onLoad() {
			// 如果登录不超过12小时，则不用登录
			if(myGetStorage('token')) {
				uni.switchTab({
					url:'../competition/index'
				})
			}
		},
		methods: {
			loginFinish() {
				loginFun({numberId: this.numberId, password: this.password}).then( res => {
					const { token } = res.data;
					mySetStorage('token', token);
					uni.switchTab({
						url:'../competition/index'
					})
				}).catch( err => {
					// log(err);
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-btn--primary {
		width: 80%;
		margin: 25upx auto;
	}
	.u-input {
		width: 550upx;
		display: inline-block;
		margin: 35upx auto;
	}
	.info-box {
		text-align: center;
    	margin-top: 125upx;
		.icon-img {
			display: inline-block;
			margin: 0 auto;
		}
		.title {
			font-size: 40upx;
			font-weight: bold;
			margin-bottom: 75upx;
			margin-top: 25upx;
		}
	}
</style>
