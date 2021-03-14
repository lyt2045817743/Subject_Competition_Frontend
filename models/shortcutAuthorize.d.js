const managerShortcut = {
	business: [
		{
			label: '赛事编辑',
			code: 'compEdit',
			icon: 'edit-pen',
			path: '/manager/pages/competitionManage/index'
		},
		{
			label: '信息收集',
			code: 'infoColl',
			icon: 'checkmark-circle',
			path: '/manager/pages/userManage/index'
		},
		{
			label: '消息推送',
			code: 'msgPush',
			icon: 'bell',
			path: '/manager/pages/userManage/index'
		},
		{
			label: '历年数据',
			code: 'histData',
			icon: 'calendar',
			path: '/manager/pages/userManage/index'
		}
	],
	system: [
		{
			label: '权限管理',
			code: 'authMang',
			icon: 'lock',
			path: '/manager/pages/roleManage/index'
		},
		{
			label: '用户管理',
			code: 'userMang',
			icon: 'man-add',
			path: '/manager/pages/userManage/index'
		},
		{
			label: '单位管理',
			code: 'instMang',
			icon: 'grid',
			path: '/manager/pages/userManage/index'
		},
	]
}

export {
	managerShortcut
}