<template>
	<view class="article-reader content">
		<!-- <u-parse :html="html"></u-parse> -->
		<!-- <editor placeholder=""></editor> -->
		<jin-edit :readOnly="true" :delta="delta"></jin-edit>
	</view>
</template>

<script>
	import jinEdit from '../jin-edit/jin-edit.vue'
	export default {
		components: {
			jinEdit
		},
		onLoad(e) {
			// console.log(e)
			// const html = decodeURIComponent(e.html);
			if(e) {
				this.delta = JSON.parse(e.html)
			} else {
				
			}
		},
		props: {
			delta:{
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				title: '全国机器人大赛报名通知',
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'line-height: 60px; color: red; text-align:center;'
					},
					children: [{
						type: 'text',
						text: 'Hello&nbsp;uni-app!'
					}]
				}],
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .ql-image-overlay {
		display: none;
	}
</style>
