<template>
	<view class="avatar">
		<u-avatar :src="user.avatarUrl" size="mini" v-if="user.avatarUrl"></u-avatar>
		<u-avatar :text="text" size="mini" bg-color="#93d2cc" v-else></u-avatar>
	</view>
</template>

<script>
	export default {
		props: {
			user: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				text: '婷'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.avatar {
		margin-right: 10upx;
	}
</style>
