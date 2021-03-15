import { addRoleUrl,queryRoleListUrl, getRoleInfoUrl, updateRoleInfoUrl, delRoleUrl } from './api.js'
import { request } from './request.js'
import { toQueryString } from '../utils/toQueryString.js'

// 添加角色信息
function addRoleFun(data) {
	return request(addRoleUrl, {
		data,
		method: 'POST'
	})
}

// 查询角色信息
function queryRoleListFun(params) {
	const url = queryRoleListUrl + toQueryString(params)
	return request(url, {
		method: 'GET'
	})
}

// 根据roleName获取单个角色信息
function getRoleInfoFun(roleName) {
	const url = getRoleInfoUrl + '/' + roleName;
	return request(url, {
		method: 'GET'
	})
}

// 根据roleName修改某个角色信息
function updateRoleInfoFun(roleName, data) {
	const url = updateRoleInfoUrl + '/' + roleName;
	return request(url, {
		method: 'PUT',
		data
	})
}

// 根据roleName删除角色
function delRoleFun(roleName) {
	const url = delRoleUrl + '/' + roleName;
	return request(url, {
		method: 'DELETE'
	})
}

export {
	addRoleFun,
	queryRoleListFun,
	getRoleInfoFun,
	updateRoleInfoFun,
	delRoleFun
}
