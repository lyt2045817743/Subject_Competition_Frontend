<template>
	<view class="content font-set">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="团队名称" prop="name">
				<view  class="team-name">
					<u-input v-model="form.name" :disabled="type === 'detail'" />
				</view>
			</u-form-item>
			<u-form-item label="团队成员">
				<view class="member-list">
					<view class="ml-item">
						<user-avatar />
					</view>
					<view class="add-user__btn">
						<u-icon name="plus" />
					</view>
				</view>
			</u-form-item>
			<u-form-item label="团队状态">
				<u-radio-group v-model="form.isFullText" v-if="type === 'add'">
					<u-radio v-for="(item, index) in typeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
				<view class="info-text" v-else>
					{{form.isFullText}}
				</view>
			</u-form-item>
			<u-form-item label="招募要求">
				<u-input v-model="form.condition" type="textarea" :border="true" :auto-height="true" />
			</u-form-item>
		</u-form>
		<view class="form-btn">
			<!-- <u-button type="info" shape="circle" size="medium" :ripple="true" @click="temporarySave">保存草稿</u-button> -->
			<u-button class="primary" shape="circle" size="medium"  v-if="type === 'add'" @click="confirmEdit">重置</u-button>
			<u-button class="primary" shape="circle" size="medium" v-if="type === 'detail' && isEdit" @click="confirmEdit">取消</u-button>
			<u-button class="primary" type="primary" shape="circle" size="medium" v-if="type === 'add' || isEdit" @click="beforeSubmit">保存</u-button>
			<u-button class="primary" type="primary" shape="circle" size="medium" v-if="type === 'detail' && !isEdit" @click="isEdit = true">修改</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import UserAvatar from '@/components/UserAvatar/UserAvatar.vue'
	const emptyForm = {
		name: '',
		isFullText: '招募中',
		condition: ''
	}
	export default {
		components: { UserAvatar },
		data() {
			return {
				rules: {
					name: [
						{
							required: true,
							message: '请输入团队名称', 
							trigger: 'blur'
						}
					]
				},
				typeList: [
					{
						name: '招募中',
						disabled: false
					},
					{
						name: '已招满',
						disabled: false
					}
				],
				type: '',
				form: JSON.parse(JSON.stringify(emptyForm))
			}
		},
		onLoad(options) {
			this.type = options.type;
		},
		methods: {
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
		},
		onReady() {
			this.$refs['uForm'].setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.member-list {
		display: flex;
		.add-user__btn {
			width: 29px;
			height: 29px;
			border-radius: 50%;
			background-color: #f2f2f2;
			text-align: center;
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
</style>
