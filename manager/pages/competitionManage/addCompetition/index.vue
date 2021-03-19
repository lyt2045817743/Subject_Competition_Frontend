<template>
	<view class="content">
		<u-form :model="form" ref="uForm" label-width="125">
			<u-form-item label="名称" prop="name"><u-input v-model="form.name" placeholder="例: 第一届全国机器人大赛"/></u-form-item>
			<u-form-item label="主办单位" prop="institution"><u-input v-model="form.institution" /></u-form-item>
			<u-form-item label="发布单位">
				<text class="disable-text">{{currentInsti}}</text>
			</u-form-item>
			<u-form-item label="类型">
				<u-radio-group v-model="compType">
					<u-radio v-for="(item, index) in typeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="人数限制" prop="numLimit" v-if="compType === '团体赛'"><u-input placeholder="请输入数字" type="number" v-model="form.numLimit" /></u-form-item>
			<u-form-item label="当前阶段">
				<u-radio-group v-model="radio">
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<view class="deadline-date" v-if="deadlineDate && radio === '报名中'">报名截止时间：{{deadlineDate}}</view>
			<u-calendar v-model="showCal" mode="date" :min-date="minDate" :max-date="maxDate" @change="deadlineOfApply"></u-calendar>
			<u-button @click="showCal = true" v-if="radio === '报名中'">设置报名截止日期</u-button>
		</u-form>
		<!-- <view class="extra-info">
			<view class="ei-btn"><u-icon name="plus-circle" />自定义信息</view>
		</view> -->
		<view class="form-btn">
			<!-- <u-button type="info" shape="circle" size="medium" :ripple="true" @click="temporarySave">保存草稿</u-button> -->
			<u-button class="primary" type="primary" shape="circle" size="medium" @click="beforeSubmit">提交</u-button>
		</view>
		<u-modal v-model="modalShow" @confirm="submitCompInfo()" :show-cancel-button="true" content="未设置报名截止日期,是否继续？"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { comStageModel } from '@/models/competition.d.js'
	import codeTranslater from '@/utils/codeTranslater'
	import calendarComputer from '@/utils/calendarComputer.js'
	import { addCompFun } from '@/api/competition.js'
	export default {
		data() {
			return {
				maxDate: '',
				minDate: '',
				modalShow: false,
				form: {
					name: '',
					numLimit: '',
					institution: ''
				},
				rules: {
					name: [
						{
							required: true,
							message: '请输入名称', 
							trigger: 'blur'
						}
					],
					institution: [
						{
							required: true,
							message: '请输入主办单位', 
							trigger: 'blur'
						}
					],
					numLimit: [
						{
							required: true,
							message: '请输入人数限制', 
							trigger: 'blur',
						}
					]
				},
				showCal: false,
				currentInsti: '信息与计算机工程学院', //... 从本地存储获取
				radioList: [
					{
						name: '报名中',
						disabled: false
					},
					{
						name: '进行中',
						disabled: false
					},
					{
						name: '已结束',
						disabled: false
					}
				],
				radio: '报名中',
				typeList: [
					{
						name: '团体赛',
						disabled: false
					},
					{
						name: '个人赛',
						disabled: false
					}
				],
				compType: '团体赛',
				deadline: '是',
				deadlineDate: '',
				switchVal: false
			}
		},
		watch: {
			compType(val) {
				if(val === '个人赛'){
					this.form.numLimit = 1;
				}
			}
		},
		methods: {
			
			deadlineOfApply(e) {
				// console.log(e)
				this.deadlineDate = e.result;
			},
			
			submitCompInfo() {
				const curStageNum = new codeTranslater(comStageModel).returnCode(this.radio)
				const createUser = '超级管理员'; //...
				const deadlineDate = new calendarComputer(this.deadlineDate).stringToDate()
				const formData = {...this.form, deadlineDate, curStageNum, currentInsti: this.currentInsti, createTime: new Date(), createUser}
				// console.log(formData)
				addCompFun(formData).then( data => {
					
					this.$refs['uToast'].show({
						title: data.msg,
						type: 'success',
					})
					
					setTimeout(function(){
						//当前页
						let pages = getCurrentPages();
						let beforePage = pages[pages.length - 2];
						
						// 添加成功后需要刷新上一页数据
						// #ifdef H5
						beforePage.initData()
						// #endif
						
						// #ifndef H5
						beforePage.$vm.status = 'loadmore'
						beforePage.$vm.pageCount = 0
						beforePage.$vm.compeInfoList = []
						beforePage.$vm.initData()
						// #endif
						
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
			},
			
			beforeSubmit() {
				// 验证表单内容
				this.$refs['uForm'].validate(valid => {
					if (valid) {
						// console.log('验证通过');
						
						// 提示未设置报名截止日期
						if(!this.deadlineDate && this.radio === '报名中') {
							this.modalShow = true;
						} else {
							this.submitCompInfo()
						}
					}
				});
			},
			
			//...
			temporarySave() {
				
			}
		},
		
		onLoad() {
			this.maxDate = new calendarComputer().addDateByday(90)
			this.minDate = new calendarComputer().addDateByday(1)
		},
		
		onReady() {
			this.$refs['uForm'].setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding-top: 0;
		.disable-text {
			color: #999999;
		}
		.form-btn {
			position: fixed;
			bottom: 75upx;
			left: 50%;
			transform: translateX(-50%);
			// margin-left: 65upx;
			// .primary {
			// 	margin-left: 75upx;
			// }
		}
		.deadline-date {
			margin: 25upx 0;
		}
	}
</style>
