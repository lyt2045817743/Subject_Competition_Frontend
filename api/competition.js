import { addCompetitionUrl, queryCompListUrl } from './api.js'
import { request } from './request.js'
import { toQueryString } from '../utils/toQueryString.js'

// 添加赛事信息
function addCompFun(data) {
	return request(addCompetitionUrl, {
		data,
		method: 'POST'
	})
}

// 查询赛事信息
function queryCompListFun(params) {
	const url = queryCompListUrl + toQueryString(params)
	return request(url, {
		method: 'GET'
	})
}

export {
	addCompFun,
	queryCompListFun
}
