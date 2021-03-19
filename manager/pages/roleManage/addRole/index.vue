<template>
	<view class="content">
		<u-form :model="form" ref="uForm" label-width="200">
			<u-form-item label="角色名称" prop="roleName">
				<u-input v-model="form.roleName" :disabled="type === 'detail'" />
			</u-form-item>
			<u-form-item label="业务权限">
				<u-checkbox-group @change="busAuthorizeChange" v-if="type === 'add' || isEdit">
					<u-checkbox 
						v-model="item.checked" 
						v-for="(item, index) in authList.busniess" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
				<view v-else class="auth-box">
					<view class="auth-item__text" v-for="item in form.busAuthVals" :key="item">{{item}}</view>
				</view>
			</u-form-item>
			<u-form-item label="系统权限">
				<u-checkbox-group @change="sysAuthorizeChange" v-if="type === 'add' || isEdit">
					<u-checkbox 
						v-model="item.checked" 
						v-for="(item, index) in authList.system" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
				<view v-else class="auth-box">
					<view class="auth-item__text" v-for="item in form.sysAuthVals" :key="item">{{item}}</view>
				</view>
			</u-form-item>
		</u-form>
		<view class="form-btn">
			<u-button class="primary" shape="circle" size="medium"  v-if="type === 'add'" @click="confirmEdit">重置</u-button>
			<u-button class="primary" shape="circle" size="medium" v-if="type === 'detail' && isEdit" @click="confirmEdit">取消</u-button>
			<u-button class="primary" type="primary" shape="circle" size="medium" v-if="type === 'add' || isEdit" @click="beforeSubmit">提交</u-button>
			<u-button class="primary" type="primary" shape="circle" size="medium" v-if="type === 'detail' && !isEdit" @click="isEdit = true">编辑</u-button>
		
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	let { log } = console
	import codeTranslater from '@/utils/codeTranslater.js'
	import { managerShortcut } from '@/models/shortcutAuthorize.d.js'
	import { addRoleFun, getRoleInfoFun, updateRoleInfoFun } from '@/api/role.js'
	export default {
		data() {
			return {
				isEdit: false,
				type: '',
				rules: {
					roleName: [
						{
							required: true,
							message: '请输入角色名称', 
							trigger: 'blur'
						}
					]
				},
				initAuthList: {},
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
				initForm: {
					roleName: '',
					busAuthVals: [],
					sysAuthVals: []
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

						
			// 取消编辑
			confirmEdit() {
				this.form = JSON.parse(JSON.stringify(this.initForm));
				this.isEdit = false;
				this.authList = JSON.parse(JSON.stringify(this.initAuthList))
			},

			beforeSubmit() {
				// 验证表单内容
				this.$refs['uForm'].validate(valid => {
					if (valid) {
						// console.log('验证通过');
						this.submitForm();
					}
				});
			},
			submitForm() {
				
				const busTrans = new codeTranslater(managerShortcut.business)
				const sysTrans = new codeTranslater(managerShortcut.system)
				
				const busAuthVals = this.form.busAuthVals.map( item => {
					return busTrans.returnCode(item)
				})
				const sysAuthVals = this.form.sysAuthVals.map( item => {
					return sysTrans.returnCode(item)
				})
				
				if(this.type === 'add') {
					const data = {...this.form, busAuthVals, sysAuthVals}
				
					addRoleFun(data).then(res => {
						this.$refs['uToast'].show({
							title: res.msg,
							type: 'success',
						})
						
						setTimeout(function(){
							//当前页
							let pages = getCurrentPages();
							let beforePage = pages[pages.length - 2];
							
							//跳转返回到上一页
							uni.navigateBack({
								delta: 1
							});
						}, 500)
					}).catch( err => {
						// log(err);
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 1500    //持续时间为 1.5秒
						})
					})
				} else {
					const data = { busAuthVals, sysAuthVals }

					updateRoleInfoFun(this.form.roleName, data).then( res => {
						this.isEdit = false;
						this.$refs['uToast'].show({
							title: res.msg,
							type: 'success',
						})
						this.initForm = JSON.parse(JSON.stringify(this.form))
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
		},
		onLoad(params) {
			// log(params)
			if(params.type === 'add') {
				this.type = 'add';
				this.isEdit = true;
				this.initAuthList = JSON.parse(JSON.stringify(this.authList));
			}
			if(params.type === 'detail') {
				this.type = 'detail';
				this.isEdit = false;
				getRoleInfoFun(params.roleName).then( res => {
					const busTrans = new codeTranslater(managerShortcut.business)
					const sysTrans = new codeTranslater(managerShortcut.system)
					const busAuthVals = res.data.busAuthVals.map( item => {
						return busTrans.transCode(item)
					})
					const sysAuthVals = res.data.sysAuthVals.map( item => {
						return sysTrans.transCode(item)
					})
					this.form = {
						roleName: res.data.roleName,
						busAuthVals,
						sysAuthVals
					}

					const busniess = this.authList.busniess.map( item => {
						if(this.form.busAuthVals.indexOf(item.name) !== -1) {
							return {
								...item,
								checked: true,
							}
						} 
						return item;
					})

					const system = this.authList.system.map( item => {
						if(this.form.sysAuthVals.indexOf(item.name) !== -1) {
							return {
								...item,
								checked: true,
							}
						} 
						return item;
					})

					this.authList = { busniess, system };
					this.initForm = JSON.parse(JSON.stringify(this.form))
					this.initAuthList = JSON.parse(JSON.stringify(this.authList));
					// console.log(this.authList);
					
				}).catch( err => {
					// log(err);
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					})
				})
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
		.auth-box {
			display: flex;
			flex-wrap: wrap;
			.auth-item__text {
				margin-right: 30upx;
			}
		}
		.form-btn {
			position: fixed;
			bottom: 75upx;
			display: flex;
			left: 50%;
			transform: translateX(-50%);
			.primary {
				margin-left: 12.5upx;
			}
		}
	}
</style>
