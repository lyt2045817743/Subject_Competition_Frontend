import { addCompetitionUrl } from './api.js'
import { request } from './request.js'

function addCompFun(data) {
	return request(addCompetitionUrl, {
		data,
		method: 'POST'
	})
}

export {
	addCompFun
}
