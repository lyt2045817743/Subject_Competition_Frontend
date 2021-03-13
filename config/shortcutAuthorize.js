const managerShortcut = {
	business: [
		{
			label: '赛事编辑',
			icon: 'edit-pen',
			path: '/manager/pages/competitionManage/index'
		},
		{
			label: '信息收集',
			icon: 'checkmark-circle',
			path: '/manager/pages/userManage/index'
		},
		{
			label: '消息推送',
			icon: 'bell',
			path: '/manager/pages/userManage/index'
		},
		{
			label: '历年数据',
			icon: 'calendar',
			path: '/manager/pages/userManage/index'
		}
	],
	system: [
		{
			label: '权限管理',
			icon: 'lock',
			path: '/manager/pages/roleManage/index'
		},
		{
			label: '用户管理',
			icon: 'man-add',
			path: '/manager/pages/userManage/index'
		},
		{
			label: '单位管理',
			icon: 'grid',
			path: '/manager/pages/userManage/index'
		},
	]
}

export {
	managerShortcut
}