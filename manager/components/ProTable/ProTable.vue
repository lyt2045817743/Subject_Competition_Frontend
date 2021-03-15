<template>
	<view class="font-set">
		
		<!-- 搜索框 -->
		<view class="search">
			<u-search :placeholder="placeholder" v-model="keyword" @search="searchHandle" @custom="searchHandle"></u-search>
		</view>
		
		<!-- 设置列内容按钮 -->
		<view class="set-row">
			<view class="sr-left" @click="modalShow = true">
				<u-icon name="setting" />
				列选项设置
			</view>
			<view class="sr-right" @click="actionMove">
				<u-icon name="question-circle" />
				操作演示
			</view>
		</view>
		
		<!-- 设置列内容模态框 -->
		<u-modal v-model="modalShow" title="请选择要显示的列" :show-cancel-button="true" @confirm="setCol">
			<u-checkbox-group @change="colCheckboxChange" class="checkbox">
				<u-checkbox 
					v-model="item.checked" 
					v-for="(item, index) in allColSet" :key="index" 
					:name="item.name"
				>{{item.name}}</u-checkbox>
			</u-checkbox-group>
		</u-modal>
		
		<!-- 数据表格 -->
		<view class="table-list">
			<!-- 有数据时 -->
			<view class="tl-hasdata" v-if="dataList.length">
				<view class="u-border-bottom u-border-top table-head">
					<u-row gutter="16">
						<u-col :span="span" text-align="center" v-for="col in showCol" :key="col.code">
							<view class="demo-layout bg-purple">{{col.name}}</view>
						</u-col>
					</u-row>
				</view>
				<u-swipe-action :show="item.show" :index="index" 
					v-for="(item, index) in dataList" :key="item._id" 
					@click="click" @open="open"
					:options="options"
				>
					<view :class="{'u-border-bottom': true, 'wrap': true, 'data-row': true, 'row-active': index % 2 === 1 ? true : false}">
						<u-row gutter="16">
							<u-col :span="span" text-align="center" v-for="col in showCol" :key="col.code">
								<view class="demo-layout bg-purple">{{item[col.code]}}</view>
							</u-col>
						</u-row>
					</view>
				</u-swipe-action>
				<!-- 分页按钮 -->
				<view class="page-btns">
					<u-button class="pb-btn" :disabled="pageCount === 1" shape="circle" size="mini" @click="changePage(-1*pageCount+1)">首页</u-button>
					<u-button class="pb-btn" :disabled="pageCount === 1" shape="circle" size="mini" @click="changePage(-1)">上一页</u-button>
					<u-button class="pb-btn" :disabled="dataList.length < 5" shape="circle" size="mini" @click="changePage(1)">下一页</u-button>
				</view>
			</view>
			<!-- 无数据时 -->
			<u-empty class="empty" text="暂无数据" mode="list" v-else></u-empty>
		</view>
		
		<u-modal v-model="showDelConfirmModal" :content="'确认删除'+delKeyLabel+'？'" :show-cancel-button="true" @confirm="delSingle" />
	</view>
</template>

<script>
	let { log } = console
	export default {
		props:{
			placeholder: {
				type: String,
				default: '请输入关键词'
			},
			// api: {
			// 	type: String,
			// 	default: ''
			// }
			dataList: {
				type: Array,
				default: []
			},
			allCol: {
				type: Array,
			},
			pageCount: {
				type: Number,
				default: 0
			},
			// 唯一标识
			keyLabel: {
				type: String,
				default: '_id'
			},
			// 详情页url
			detailUrl: {
				type: String
			}
		},
		computed: {
			span() {
				return (12 / this.showCol.length);
			}
		},
		watch: {
			keyword(val) {
				this.$emit('changeKeyword', val);
			}
		},
		data() {
			return {
				keyword: '',
				// dataList: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				modalShow: false,
				showAction: false,
				showDelConfirmModal: false,
				colCheckboxVal: [],
				allColSet: JSON.parse(JSON.stringify(this.allCol)),
				showCol: [],
				delKeyLabel: '',
				options: [
					{
						text: '详情',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		created() {
			this.showCol = this.allCol.filter( item => {
				return item.checked;
			})
		},
		methods: {
			
			// 当复选框选项发生变化
			colCheckboxChange(detail) {
				// log(detail)
				this.colCheckboxVal = detail;
			},
			
			// 修改allCol中的checkd值
			setCol() {
				this.showCol = this.allColSet.filter( item => {
					return this.colCheckboxVal.indexOf(item.name) !== -1;
				})
			},
			
			click(index, btnInx) {
				if(btnInx == 1) {
					this.showDelConfirmModal = true;
					this.delKeyLabel = this.dataList[index][this.keyLabel]
				} else {
					uni.navigateTo({
						url: this.detailUrl+'?type=detail&'+this.keyLabel+'='+ this.dataList[index][this.keyLabel]
					})
				}
			},
			
			// 打开一个的时候，关闭其他。
			open(index) {
				this.$emit('changeShow', index)
			},
			
			// 删除
			delSingle() {
				this.$emit('delHandle', this.delKeyLabel);
				// log(this.delKeyLabel)
			},
			
			// 根据关键词搜索
			searchHandle() {
				this.$emit('update', 1);
			},
			
			// 翻页
			changePage(addPage) {
				// this.$emit('changePageCountFun', );
				this.$emit('update', this.pageCount + addPage)
			},
			
			// 滑动操作演示
			actionMove() {
				this.$emit('changeShow', 0, true)
			}
		}
	}
</script>

<style scoped lang="scss">
	.set-row {
		margin-top: 25upx;
		display: flex;
		justify-content: space-between;
		font-size: 25upx;
		color: #44a299;
		/deep/ .u-icon {
			margin-right: 7.5upx;
		}
	}
	
	.checkbox {
		padding: 12.5upx;
		display: flex;
		justify-content: space-around;
	}
	
	.table-head {
		margin-top: 15upx;
		background-color: #7FCAC3;
	}
	.data-row, .table-head {
		padding: 30upx;
		font-size: 30upx;
	}
	.row-active {
		background-color: #DFF2F0;
	}
	
	.page-btns {
		margin-top: 35upx;
		display: flex;
		justify-content: flex-end;
		.pb-btn {
			margin-left: 15upx;
		}
	}
	.empty {
		position: fixed;
		top: 45vh;
		left: 50vw;
		transform: translateX(-50%);
	}
</style>
