export const baseUrl = 'http://localhost:3000/api'

export function request(url, options) {
	console.log(url, options)
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      ...options
    })
	.then((res)=>{
		res.statusCode === 200 ? resolve(res.data) : reject(res)
	})
	.catch((err)=>{
		console.log(err);
		reject(err)
	})
  })
}