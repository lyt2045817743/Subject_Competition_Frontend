import { loginUrl, addUserUrl, queryUserListUrl, getUserInfoUrl, updateUserInfoUrl, delUserUrl } from './api.js'
import { request } from './request.js'
import { toQueryString } from '../utils/toQueryString.js'

// 用户登录
function loginFun(data) {
	return request(loginUrl, {
		data,
		method: 'POST'
	})
}

// 添加用户
function addUserFun(data) {
	return request(addUserUrl, {
		data,
		method: 'POST'
	})
}

// 查询用户信息
function queryUserListFun(params) {
	const url = queryUserListUrl + toQueryString(params)
	return request(url, {
		method: 'GET'
	})
}

// 根据numberId获取单个用户信息
function getUserInfoFun(numberId) {
	const url = getUserInfoUrl + '/' + numberId;
	return request(url, {
		method: 'GET'
	})
}

// 根据numberId修改某个用户信息
function updateUserInfoFun(numberId, data) {
	const url = updateUserInfoUrl + '/' + numberId;
	return request(url, {
		method: 'PUT',
		data
	})
}

// 根据numberId删除用户
function delUserFun(numberId) {
	const url = delUserUrl + '/' + numberId;
	return request(url, {
		method: 'DELETE'
	})
}

export {
	loginFun,
	addUserFun,
	queryUserListFun,
	getUserInfoFun,
	updateUserInfoFun,
	delUserFun
}
