<template>
	<view class="content font-set">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="学工号">
				<u-input :disabled="true" v-model="numberId" />
			</u-form-item>
			<u-form-item label="姓名" prop="name">
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item label="所属单位">
				<u-select v-model="show" mode="mutil-column-auto" :list="organList" @confirm="changeOrganVal"></u-select>
				<view class="organ-box">
					<text class="ob-text" v-if="organLabel">{{organLabel}}</text>
					<text class="ob-modify" v-if="organLabel" @click="show = true">修改</text>
					<view @click="show = true" v-else class="disable-text">请选择<u-icon class="select-btn" name="arrow-down" /> </view>
				</view>
			</u-form-item>
		</u-form>
		<button class="btn-in" @click="beforeSubmit">提交</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	let { log } = console
	const emptyForm = {
		name: '',
		organization: ''
	}
	const rules = {
					name: [
						{
							required: true,
							message: '请输入角色名称', 
							trigger: 'blur'
						}
					],
					organization: [
						{
							required: true,
							message: '请选择单位',
							trigger: 'blur'
						}
					]
				};
	export default {
		data() {
			return {
				// numberId: getApp().globalData.user.numberId,
				numberId: '',
				show: false,
				organList: [
					{
						value: 1,
						label: '中国',
						children: [
							{
								value: 2,
								label: '广东',
								children: [
									{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [
									{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [
							{
								value: 9,
								label: '纽约',
								children: [
									{
										value: 10,
										label: '皇后街区'
									}
								]
							}
						]
					}
				],
				form: JSON.parse(JSON.stringify(emptyForm))
			}
		},
		methods: {
			beforeSubmit() {
				// 验证表单内容
				this.$refs['uForm'].validate(valid => {
					if (valid) {
						// console.log('验证通过');
						this.submitForm();
					}
				});
			},
			
			changeOrganVal(val) {
				// this.form.organVal = val[0].value;
				// this.organLabel = val[0].label;
				log(val)
			},
		},
		onReady() {
			this.$refs['uForm'].setRules(rules);
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 0;
		.select-btn {
			margin-left: 7.5upx;
		}
	}
	.btn-in {
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
