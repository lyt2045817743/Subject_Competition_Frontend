<template>
	<view>
		<jinEdit placeholder="请输入内容" :html="html" :showImgSize="true" @editOk="editOk" uploadFileUrl="/#"></jinEdit> 
	</view>
</template>

<script>
	import jinEdit from '../jin-edit/jin-edit.vue';
	export default {
		components: {
			jinEdit
		},
		data() {
			return {
				contentVal: '', //内容（带html）
				contentText: '', //内容（纯文本）
				richText: '',
				html:`<p style="text-align: center;">2020年机器人大赛预热中</p><hr><p style="text-align: center;"><br></p><p>	今天，学校啊找垃圾佛i积分祭祀哦啊积分紧急会以。</p><p><br></p><p style="text-align: center;"><img src="blob:http://localhost:8080/41466c8e-3716-4659-a6c6-34bf2bd06622" data-local="blob:http://localhost:8080/41466c8e-3716-4659-a6c6-34bf2bd06622" alt="图片" style="" width="143"></p><p style="text-align: center;"><br></p><p>	这预示这放假哦嗲家偶分大家我解佛i十九分微积分而忘记哦覅金额我。</p>`
			}
		},
		methods: {
			editOk(e) {
				// console.log('ok', e.delta)
				const html = JSON.stringify(e.delta)
				uni.navigateTo({
					url: './articleReader?html=' + encodeURIComponent(html)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
        padding: 10px;
    }

    #editor {
        width: 100%;
        height: 300px;
        background-color: #CCCCCC;
    }
</style>
