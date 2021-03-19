<template>
	<view class="content font-set">
		<!-- 我的团队 -->
		<view class="my-team">
			<view class="firstline">
				<text class="title">我的团队</text>
				<view class="newbtn" @click="goPage('/communication/pages/forum/index')">
					<u-icon name="chat" />去论坛看看
				</view>
			</view>
			<view class="team-info__box">
				<view class="my-team" v-if="myTeam.name"></view>
				<view class="no-team" v-else>
					<view class="nt-text">您还没有团队，您可以<view class="nt-link" @click="goPage('./createTeam/index?type=add')">创建团队</view>，</view>
					<view class="nt-text">还可以<view class="nt-link" @click="goPage('/communication/pages/forum/index')">去论坛找队友</view>，</view>
					<view class="nt-text">还可以<view class="nt-link not-link">加入其他团队<u-icon name="arrow-downward" /></view>。</view>
				</view>
			</view>
		</view>
		<view class="other-team">
			<view class="firstline">
				<text class="title">其他团队</text>
				<view class="search">
					<u-search :placeholder="placeholder" v-model="keyword" @search="searchHandle" @custom="searchHandle"></u-search>
				</view>
			</view>
			<view class="team-info__box">
				<view class="team-list" v-if="teamList.length">
					
				</view>
				<!-- 无数据时 -->
				<u-empty class="empty" v-else text="暂无数据" mode="list"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamList: [],
				myTeam: {}
			}
		},
		methods: {
			goPage(url) {
				uni.navigateTo({
					url,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.firstline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25upx;
		.title {
			font-size: 35upx;
			font-weight: bold;
			display: flex;
			color: #44a299;
			&::before {
				display: block;
				content: "";
				margin-right: 12.5upx;
				width: 0;
				border: 7.5upx solid #44a299;
			}
		}
		.newbtn {
			background-color: #93d2cc;
			border-radius: 25upx;
			padding: 12.5upx;
		}
	}
	.my-team {
		.team-info__box {
			.no-team {
				margin: 50upx;
				.nt-text {
					text-align: center;
					margin-top: 30upx;
				}
				.nt-link {
					display: inline-block;
					margin-left: 7.5upx;
					text-decoration: underline;
					color: #007aff;
					
				}
				.not-link {
					text-decoration: none;
					color: #aaaaaa;
				}
			}
		}
	}

	.other-team {
		.empty {
			position: fixed;
			top: 45vh;
			left: 50vw;
			transform: translateX(-50%);
		}
	}
</style>
