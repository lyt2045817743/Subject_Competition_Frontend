export function toQueryString(paramsObj) {
	let qs = '?';
	for(let str in paramsObj) {
		qs = qs + str + '=' + paramsObj[str] + '&'
	}
	return qs
}