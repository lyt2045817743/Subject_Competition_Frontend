import { queryRoleListUrl } from './api.js'
import { request } from './request.js'
import { toQueryString } from '../utils/toQueryString.js'

// // 添加角色信息
// function addRoleFun(data) {
// 	return request(addRoleetitionUrl, {
// 		data,
// 		method: 'POST'
// 	})
// }

// 查询角色信息
function queryRoleListFun(params) {
	const url = queryRoleListUrl + toQueryString(params)
	return request(url, {
		method: 'GET'
	})
}

export {
	queryRoleListFun
}
