import { loginUrl, addUserUrl, queryUserListUrl } from './api.js'
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

export {
	loginFun,
	addUserFun,
	queryUserListFun
}
