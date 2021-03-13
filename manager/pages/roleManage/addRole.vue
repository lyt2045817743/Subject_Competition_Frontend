<template>
	<view class="content">
		<u-form :model="form" ref="uForm" label-width="200">
			<u-form-item label="角色名称" prop="roleName">
				<u-input v-model="form.roleName" />
			</u-form-item>
			<u-form-item label="业务权限分配">
				<u-checkbox-group @change="busAuthorizeChange">
					<u-checkbox 
						v-model="item.checked" 
						v-for="(item, index) in authList.busniess" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="系统权限分配">
				<u-checkbox-group @change="sysAuthorizeChange">
					<u-checkbox 
						v-model="item.checked" 
						v-for="(item, index) in authList.system" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
		</u-form>
		<view class="form-btn">
			<u-button class="primary" type="primary" shape="circle" size="medium" @click="beforeSubmit">提交</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	let { log } = console
	export default {
		data() {
			return {
				rules: {
					roleName: [
						{
							required: true,
							message: '请输入角色名称', 
							trigger: 'blur'
						}
					]
				},
				authList: {
					busniess: [
						{
							name: '赛事编辑',
							checked: false,
							disabled: false
						},
						{
							name: '信息收集',
							checked: false,
							disabled: false
						},
						{
							name: '消息推送',
							checked: false,
							disabled: false
						},
						{
							name: '历年数据',
							checked: false,
							disabled: false
						}
					],
					system: [
						{
							name: '权限管理',
							checked: false,
							disabled: false
						},
						{
							name: '用户管理',
							checked: false,
							disabled: false
						},
						{
							name: '单位管理',
							checked: false,
							disabled: false
						}
					]
				},
				form: {
					roleName: '',
					busAuthVals: [],
					sysAuthVals: []
				}
			}
		},
		methods: {
			busAuthorizeChange(detail) {
				this.form.busAuthVals = detail;
			},
			sysAuthorizeChange(detail) {
				this.form.sysAuthVals = detail;
			},
			beforeSubmit() {
				// 验证表单内容
				this.$refs['uForm'].validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.submitForm();
					}
				});
			},
			submitForm() {
				log(this.form)
			}
		},
		onReady() {
			this.$refs['uForm'].setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding-top: 0;
		.form-btn {
			position: fixed;
			bottom: 75upx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
