const { baseUrl } = require('../config/base.js');

export function request(url, options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      ...options
    })
	.then((res)=>{
		// console.log(res)
		const data = res[1].data;
		
		if(data.code !== 2000 || res[1].statusCode !== 200) {
			uni.showToast({
				title: data.msg,
				icon: 'none',
				duration: 1000    //持续时间为 1秒
			})  
		}
		else {
			res[1].statusCode === 200 ? resolve(data) : reject(data.msg)
		}
		
	})
	.catch((err)=>{
		console.log(err);
		reject(err)
	})
  })
}
