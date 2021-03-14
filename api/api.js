/**
 *赛事
**/
const addCompetitionUrl = '/api/competition/addCompetition' // 管理员新建赛事
const queryCompListUrl = '/api/competition/queryCompList' // 查询赛事列表

/**
 *用户
**/
const loginUrl = '/api/user/login' // 用户登录
const addUserUrl = '/api/user/addUser' // 管理员新建用户
const queryUserListUrl = '/api/user/queryUserList' // 管理员查询用户列表

/**
 *角色
**/
const addRoleUrl = '/api/role/addRole' // 新增角色
const queryRoleListUrl = '/api/role/queryRoleList' // 查询角色列表

export {
	addCompetitionUrl,
	queryCompListUrl,
	loginUrl,
	addUserUrl,
	queryUserListUrl,
	addRoleUrl,
	queryRoleListUrl
}