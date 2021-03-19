<template>
	<view class="content font-set">
		<u-form :model="form" ref="uForm" label-width="200">
			<u-form-item label="添加方式" v-if="type === 'add'">
				<u-radio-group v-model="addType">
					<u-radio v-for="(item, index) in typeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="身份" prop="identityType">
				<u-radio-group v-model="form.identityType" v-if="type === 'add'">
					<u-radio v-for="(item, index) in identityTypeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
				<view class="info-text" v-else>
					{{form.identityType}}
				</view>
			</u-form-item>
			<u-form-item label="学工号">
				<view  class="numberId-box">
					<view class="numberIdInp" v-for="(item, i) in numberIds" :key="i">
						<u-input v-model="numberIds[i]" type="number" :clearable="false" :disabled="type === 'detail'" />
						<u-icon name="minus-circle" class="reduceBtn" @click="removeNumberId(i)" v-if="addType === '批量添加' && numberIds.length !== 1" />
					</view>
					<u-icon name="plus-circle" class="addBtn" @click="addNumberId" v-if="addType === '批量添加'" />
				</view>
			</u-form-item>
			<u-form-item label="初始密码" prop="initPwd" v-if="type === 'add'">
				<view class="initPwd-box">
					<u-input v-model="form.initPwd" class="ib-inp" />
					<view class="random-pwd" @click="pwdBuilder">
						<u-icon class="reload-btn" name="reload" />生成随机密码
					</view>
				</view>
			</u-form-item>
			<u-form-item :label="isEdit ? '设置为管理员' : '是否为管理员'">
				<u-switch class="switch" v-if="type === 'add' || isEdit" v-model="form.isManager" size="40" />
				<view class="info-text" v-else>
					{{form.isManager ? '是' : '否'}}
				</view>
			</u-form-item>
			<u-form-item label="管理员角色" v-if="form.isManager && (type === 'add' || isEdit)" prop="roleVal">
				<u-select v-model="show" :list="roleList" @confirm="changeRoleVal"></u-select>
				<view class="role-box">
					<text class="rb-text" v-if="roleLabel">{{roleLabel}}</text>
					<text class="rb-modify" v-if="roleLabel" @click="show = true">修改</text>
					<view @click="show = true" v-else class="disable-text">请选择<u-icon class="select-btn" name="arrow-down" /> </view>
				</view>
			</u-form-item>
		</u-form>
		<view class="form-btn">
			<!-- <u-button type="info" shape="circle" size="medium" :ripple="true" @click="temporarySave">保存草稿</u-button> -->
			<u-button class="primary" shape="circle" size="medium"  v-if="type === 'add'" @click="confirmEdit">重置</u-button>
			<u-button class="primary" shape="circle" size="medium" v-if="type === 'detail' && isEdit" @click="confirmEdit">取消</u-button>
			<u-button class="primary" type="primary" shape="circle" size="medium" v-if="type === 'add' || isEdit" @click="beforeSubmit">提交</u-button>
			<u-button class="primary" type="primary" shape="circle" size="medium" v-if="type === 'detail' && !isEdit" @click="isEdit = true">编辑</u-button>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="modalShow" :show-cancel-button="true" @cancel="returnLastPage" @confirm="continueAdd" :title-style="{color: 'black'}" content="添加成功,是否继续添加？">
		</u-modal>
	</view>
</template>

<script>
	import { queryRoleListFun } from '@/api/role.js'
	import { addUserFun, getUserInfoFun, updateUserInfoFun } from '@/api/user.js'
	import { identityModel } from '@/models/user.d.js'
	import codeTranslater from '@/utils/codeTranslater.js'
	let {log} = console
	
	const emptyData = {
					form: {
						roleVal: '',
						initPwd: '',
						identityType: '',
						isManager: false
					},
					roleLabel: ''
				}
	export default {
		data() {
			return {
				addType: '单个添加',
				show: false,
				modalShow: false,
				isEdit: false,
				type: '',
				typeList: [
					{
						name: '单个添加',
						disabled: false
					},
					{
						name: '批量添加',
						disabled: false
					}
				],
				identityTypeList: [
					{
						name: '教师',
						disabled: false
					},
					{
						name: '专家',
						disabled: false
					},
					{
						name: '学生',
						disabled: false
					}
				],
				rules: {
					identityType: [
						{
							required: true,
							message: '请选择身份', 
							trigger: 'blur'
						}
					],
					initPwd: [
						{
							required: true,
							message: '请输入初始密码', 
							trigger: 'blur'
						}
					],
					roleVal: [
						{
							required: true,
							message: '请选择管理员角色', 
							trigger: 'blur'
						}
					]
				},
				// 传给后端
				numberIds: [
					''
				],
				initDataObj: JSON.parse(JSON.stringify(emptyData)),
				form: JSON.parse(JSON.stringify(emptyData.form)),
				roleLabel: '',
				// 后端获取
				roleList: [
					{
						label: '超级管理员',
						value: '0'
					},
					{
						label: '系统管理员',
						value: '1'
					}
				]
			}
		},
		watch: {
			// ...
			// 如果选择批量添加，需要提示管理员：被添加的用户必须除了学工号其他都相同。
		},
		methods: {
			pwdBuilder(){
				const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
				let str = "";
				for (let i = 0; i < 6; i++) str += t.charAt(Math.floor(Math.random() * t.length));
				this.form.initPwd = str;
			},
			
			addNumberId() {
				this.numberIds = this.numberIds.concat(['']);
				// log(this.numberIds)
			},
			
			// 删除某个学工号
			removeNumberId(idx) {
				let temp = this.numberIds;
				temp.splice(idx, 1);
				this.numberIds = temp;
				// log(this.numberIds)
			},
			
			// 获取角色列表
			queryRoleList() {
				queryRoleListFun({pageCount: -1, pageNum: -1}).then(res => {
					this.roleList = res.data.map(item => {
						return {
							label: item.roleName,
							value: item._id
						}
					});
					// log(this.roleList)
				}).catch( err => {
					// log(err);
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					})
				})
			},
			
			// 选择管理员角色
			changeRoleVal(val) {
				this.form.roleVal = val[0].value;
				this.roleLabel = val[0].label;
				// log(this.form.roleVal)
			},
			
			beforeSubmit() {
				// 验证是否有空的学工号
				if(this.numberIds.indexOf('') !== -1) {
					this.$refs['uToast'].show({
						title: '学工号不能为空',
						type: 'warning',
					})
					return;
				}
				// 验证表单内容
				this.$refs['uForm'].validate(valid => {
					if (valid) {
						// console.log('验证通过');
						this.submitForm();
					}
				});
			},
			
			submitForm() {
				const identityType = new codeTranslater(identityModel).returnCode(this.form.identityType);
				if(this.type === 'add') {
					const data = {...this.form, numberIds: this.numberIds, identityType}
					// log(data)
					addUserFun(data).then( res => {
						this.modalShow = true;
					}).catch( err => {
						// log(err);
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 1500    //持续时间为 1.5秒
						})
					})
				} 
				if(this.type === 'detail'){
					const data = {isManager: this.form.isManager, roleVal: this.form.roleVal};
					updateUserInfoFun(this.numberIds[0], data).then( res => {
						this.isEdit = false;
						this.$refs['uToast'].show({
							title: res.msg,
							type: 'success',
						});
						this.initDataObj = {
							form: JSON.parse(JSON.stringify(this.form)),
							roleLabel: this.roleLabel
						};
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
			
			// 取消编辑
			confirmEdit() {
				this.form = JSON.parse(JSON.stringify(this.initDataObj.form));
				this.roleLabel = this.initDataObj.roleLabel;
				this.isEdit = false;
			},
			
			// 继续添加
			continueAdd() {
				this.form = JSON.parse(JSON.stringify(this.initDataObj.form));
				this.roleLabel = this.initDataObj.roleLabel;
				this.numberIds = [''];
			},
			
			// 不继续添加则返回上级页面
			returnLastPage() {
				setTimeout(function(){
					//当前页
					let pages = getCurrentPages();
					let beforePage = pages[pages.length - 2];
					
					//跳转返回到上一页
					uni.navigateBack({
						delta: 1
					});
				}, 500)
			}
		},
		onLoad(params) {
			// 获取角色列表（列选择器数据）
			this.queryRoleList();
			// log(params)
			if(params.type === 'add') {
				this.type = 'add';
				this.isEdit = true;
			}
			if(params.type === 'detail') {
				this.type = 'detail';
				this.isEdit = false;
				getUserInfoFun(params.numberId).then( res => {
					const identityType = new codeTranslater(identityModel).transCode(res.data.identityType);
					const findResult = this.roleList.find(item => {
						return item.value === res.data.roleVal;
					});
					
					this.form = {...this.form, ...res.data, identityType};
					this.numberIds = [res.data.numberId];
					this.roleLabel = findResult ? findResult.label : '';
					this.initDataObj = {
						form: JSON.parse(JSON.stringify(this.form)),
						roleLabel: this.roleLabel
					};
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
		.switch {
			vertical-align: middle;
		}
		.role-box {
			display: flex;
			.rb-text {
				margin-right: 30upx;
			}
			.rb-modify {
				color: #2979ff;
			}
			.disable-text {
				color: #999999;
			}
			/deep/ .u-select {
				width: 300upx;
			}
		}
		.select-btn {
			margin-left: 7.5upx;
		}
		.numberId-box{
			position: relative;
			width: 375upx;
			.numberIdInp {
				display: flex;
			}
			.addBtn {
				position: absolute;
				bottom: 22upx;
				right: 0;
				z-index: 2;
			}
			.reduceBtn {
				z-index: 2;
				margin-left: 7.5upx;
			}
		}
		.initPwd-box {
			display: flex;
			justify-content: space-around;
			/deep/ .u-input {
				width: 300upx;
			}
			.random-pwd {
				font-size: 10px;
				color: #2979ff;
				.reload-btn {
					margin-right: 7.5upx;
				}
			}
		}
	}
</style>

