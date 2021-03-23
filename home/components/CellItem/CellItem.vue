<template>
	<view class="font-set">
		<view class="u-border-bottom cell-item">
			<view class="title" v-if="title">{{title}}</view>
			<view v-else></view>
			<view class="right">
				<text v-if="valueType === 'text'">
					{{value}}
				</text>
				<u-avatar v-else-if="value" size="mini" :src="src"></u-avatar>
				<u-avatar v-else-if="avatarText" size="mini" bg-color="#93d2cc" :text="avatarText"></u-avatar>
				<u-icon name="arrow-right" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: String,
			},
			// text为普通文本类型，image为图片类型
			valueType: {
				type: String,
				default: 'text'
			},
			// 当头像没有url时，为名字最后一个字。
			avatarText: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// title: '姓名',
				// titleVal: '刘玉婷'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.cell-item {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 35upx;
		padding: 15upx 25upx;
		margin-bottom: 30upx;
		font-size: 11px;
		.title {
		}
		.right {
			color: #858B9C;
		}
	}
</style>
