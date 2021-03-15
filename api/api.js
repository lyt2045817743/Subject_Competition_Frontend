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
const getUserInfoUrl = '/api/user/getUserInfo' // 根据numberId获取单个用户信息
const updateUserInfoUrl = '/api/user/updateUserInfo' // 根据numberId修改某个用户信息
const delUserUrl = '/api/user/delUser' // 根据numberId删除用户

/**
 *角色
**/
const addRoleUrl = '/api/role/addRole' // 新增角色
const queryRoleListUrl = '/api/role/queryRoleList' // 查询角色列表
const getRoleInfoUrl = '/api/role/getRoleInfo' // 根据roleName获取单个角色信息
const updateRoleInfoUrl = '/api/role/updateRoleInfo' // 根据roleName修改某个角色信息
const delRoleUrl = '/api/role/delRole' // 根据roleName删除角色

export {
	// 赛事
	addCompetitionUrl,
	queryCompListUrl,
	
	// 用户
	loginUrl,
	addUserUrl,
	queryUserListUrl,
	getUserInfoUrl,
	updateUserInfoUrl,
	delUserUrl,
	
	// 角色
	addRoleUrl,
	queryRoleListUrl,
	getRoleInfoUrl,
	updateRoleInfoUrl,
	delRoleUrl
}