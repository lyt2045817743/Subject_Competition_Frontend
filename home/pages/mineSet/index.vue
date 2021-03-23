<template>
	<view class="font-set">
		<view class="info-list">
			<cell-item title="头像" valueType="image" :value="user.avatarUrl" :avatarText="user.name.charAt(user.name.length - 1)" />
			<cell-item title="姓名" :value="user.name" />
			<cell-item title="学工号" :value="user.numberId" />
			<cell-item title="所属一级单位" :value="user.organization.first" />
			<cell-item title="所属二级单位" :value="user.organization.second" v-if="user.organization.second" />
			<cell-item title="联系方式" :value="user.tel" />
			<cell-item title="身份" :value="user.identityType" />
			<cell-item title="管理员角色" v-if="user.roleVal" :value="user.roleVal" />
			<cell-item title="修改密码" />
		</view>
		<button class="btn-logout" @click="modalShow = true">退出登录</button>
		<u-modal v-model="modalShow" @confirm="logout()" :show-cancel-button="true" content="确定退出登录？"></u-modal>
	</view>
</template>

<script>
	let { log } = console
	import CellItem from '../../components/CellItem/CellItem.vue'
	export default {
		components: {
			CellItem
		},
		data() {
			return {
				modalShow: false,
				user: {
					name: '刘玉婷',
					numberId: '2017224409',
					organization: {
						first: '信息与计算机工程学院',
						second: '信息管理与信息系统',
						third: '2班'
					},
					avatarUrl: '',
					identityType: '学生',
					roleVal: '',
					tel: '110'
				}
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
		},
		// ...返回之前，如果姓名为空，提示：姓名为必填项。
	}
</script>

<style lang="scss" scoped>
	.btn-in, .btn-logout {
		position: fixed;
		bottom: 150upx;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #365fff, #36bbff);
	}
</style>
