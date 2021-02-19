export const baseUrl = '/apis'

export function request(url, options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      ...options
    })
	.then((res)=>{
		res[1].statusCode === 200 ? resolve(res.data) : reject(res)
	})
	.catch((err)=>{
		console.log(err);
		reject(err)
	})
  })
}
