<template>
	<view class="content font-set">
		<first-line title="用户列表" url="./addUser" />
		<pro-table placeholder="请输入用户名" api="" />
	</view>
</template>

<script>
	import FirstLine from '../../components/FirstLine/FirstLine.vue'
	import ProTable from '../../components/ProTable/ProTable.vue'
	export default {
		components:{ FirstLine, ProTable },
		data() {
			return {
				// dataList: []
			}
		},
		methods: {
			
		}
	}
</script>

