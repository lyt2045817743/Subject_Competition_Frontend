<template>
	<view class="content">
		<u-form :model="form" ref="uForm" label-width="200">
			<u-form-item label="添加方式">
				<u-radio-group v-model="addType">
					<u-radio v-for="(item, index) in typeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="身份" prop="identityType">
				<u-radio-group v-model="form.identityType">
					<u-radio v-for="(item, index) in identityTypeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="学工号">
				<view  class="numberId-box">
					<view class="numberIdInp" v-for="(item, i) in numberIds" :key="i">
						<u-input v-model="numberIds[i]" type="number" :clearable="false" />
						<u-icon name="minus-circle" class="reduceBtn" @click="removeNumberId(i)" v-if="addType === '批量添加' && numberIds.length !== 1" />
					</view>
					<u-icon name="plus-circle" class="addBtn" @click="addNumberId" v-if="addType === '批量添加'" />
				</view>
			</u-form-item>
			<u-form-item label="初始密码" prop="initPwd">
				<view class="initPwd-box">
					<u-input v-model="form.initPwd" class="ib-inp" />
					<view class="random-pwd" @click="pwdBuilder">
						<u-icon class="reload-btn" name="reload" />生成随机密码
					</view>
				</view>
			</u-form-item>
			<u-form-item label="是否为管理员">
				<u-switch class="switch" v-model="form.isManager" size="40" />
			</u-form-item>
			<u-form-item label="管理员角色" v-if="form.isManager" prop="roleVal">
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
			<u-button class="primary" type="primary" shape="circle" size="medium" @click="beforeSubmit">提交</u-button>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="modalShow" :show-cancel-button="true" @cancel="returnLastPage" @confirm="continueAdd" :title-style="{color: 'black'}" content="添加成功,是否继续添加？">
		</u-modal>
	</view>
</template>

<script>
	import { queryRoleListFun } from '../../../api/role.js'
	import { addUserFun } from '../../../api/user.js'
	import { identityModel } from '../../../models/user.d.js'
	import codeTranslater from '../../../utils/codeTranslater.js'
	let {log} = console
	
	const initFrom = {
					roleVal: '',
					initPwd: '',
					identityType: '',
					isManager: false
				}
	export default {
		data() {
			return {
				addType: '单个添加',
				show: false,
				modalShow: false,
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
				form: JSON.parse(JSON.stringify(initFrom)),
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
				log(this.numberIds)
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
					log(this.roleList)
				})
			},
			
			// 选择管理员角色
			changeRoleVal(val) {
				this.form.roleVal = val[0].value;
				this.roleLabel = val[0].label;
				log(this.form.roleVal)
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
						console.log('验证通过');
						this.submitForm();
					}
				});
			},
			
			submitForm() {
				const identityType = new codeTranslater(identityModel).returnCode(this.form.identityType)
				const data = {...this.form, numberIds: this.numberIds, identityType}
				log(data)
				addUserFun(data).then( res => {
					this.modalShow = true;
				})
			},
			
			// 继续添加
			continueAdd() {
				this.form = JSON.parse(JSON.stringify(initFrom));
				this.numberIds = [''];
			},
			
			// 不继续添加则返回上级页面
			returnLastPage() {
				setTimeout(function(){
					//当前页
					let pages = getCurrentPages();
					let beforePage = pages[pages.length - 2];
					
					// ...
					// // 添加成功后需要刷新上一页数据
					// // #ifdef H5
					// beforePage.initData()
					// // #endif
					
					// // #ifndef H5
					// beforePage.$vm.pageCount = 0
					// // beforePage.$vm.compeInfoList = []
					// beforePage.$vm.initData()
					// // #endif
					
					//跳转返回到上一页
					uni.navigateBack({
						delta: 1
					});
				}, 500)
			}
		},
		onLoad() {
			this.queryRoleList();
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

