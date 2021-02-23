// #ifdef MP-WEIXIN
export const baseUrl = 'http://82.156.118.241:5000'
// #endif

// #ifdef H5
export const baseUrl = '/apis'
// #endif

export function request(url, options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      ...options
    })
	.then((res)=>{
		// console.log(res)
		res[1].statusCode === 200 ? resolve(res[1].data) : reject(res)
	})
	.catch((err)=>{
		console.log(err);
		reject(err)
	})
  })
}
