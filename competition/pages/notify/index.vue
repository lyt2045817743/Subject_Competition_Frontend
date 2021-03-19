<template>
	<view class="notify font-set">
		<view class="notify-list__btn" @click="showList = true">
			<u-icon name="list" color="#808080" size="50"></u-icon>
			<u-badge type="info" :count="notifyTabList.length" :offset="[-5,-5]"></u-badge>
		</view>
		<u-popup v-model="showList" width="250">
			<view class="notify-tablist">
				<view v-for="(item,index) in notifyTabList" :key="item.id" @click="changeNotify(index)">
					<view :class="['nt-name', index === currentId ? 'active' : '']">{{item.notifyName}}</view>
				</view>
			</view>
		</u-popup>
		<view class="notify-content" v-for="(item,index) in notifyTabList" :key="item.id">
			<artcle-reader v-if="currentId === index" :delta="item.delta"></artcle-reader>
		</view>
	</view>
</template>

<script>
	import artcleReader from '@/components/articleReader/articleReader'
	export default {
		components: { artcleReader },
		data() {
			return {
				showList: false,
				currentId: 0,
				// 后端获取
				 
				notifyTabList: [
					{
						id: 0,
						notifyName: '基本信息',
						delta: {
							ops: [
								{
									insert: "2020年机器人大赛预热中"
								}
							]
						}
					},
					{
						id: 1,
						notifyName: '报名清单',
						delta: {
							ops: [
								{
									insert: "报名清单",
								
								}
							]
						}
					},
					{
						id: 2,
						notifyName: '获奖名单',
						delta: {
							ops: [
								{
									insert: "2020获奖名单"
								}
							]
						}
					}
				]
			}
		},
		onLoad(options) {
			// console.log(options)
		},
		methods: {
			changeNotify(index) {
				this.currentId = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notify-list__btn {
		position: fixed;
		bottom: 25upx;
		left: 25upx;
		background: #fff;
		width: 70upx;
		height: 70upx;
		z-index: 1;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		border: 1px solid #808080;
	}
	.notify-tablist {
		margin: 49upx;
		.nt-name {
			margin-bottom: 40upx;
			text-align: center;
			font-size: 35upx;
			font-weight: bold;
			&.active {
				color: blue;
			}
		}
	}
</style>
