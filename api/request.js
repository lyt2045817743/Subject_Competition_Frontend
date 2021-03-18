const { baseUrl } = require('../config/base.js');
const { myGetStorage, mySetStorage } = require('../utils/cacheStorage.js')

// 重新登录
function reLogin(reject) {
	uni.redirectTo({
		url: '/pages/index/index' 
	});
	
	reject('登录已过期，请重新登录');
}

export function request(url, options) {
	
	return new Promise((resolve, reject) => {
		if(url !== '/api/user/login') {
			// 获取放入缓存的字段token
			const token = getApp().globalData.token;
			// console.log(token)
			if (token) { // 如果存在token 配置请求头
				 options.header = {
				   'Authorization' : 'Bearer ' + token
				 };
			}else{	// 不存在token 跳转至登录
				reLogin(reject);
			}
		}
		
		uni.request({
		  url: baseUrl + url,
		  ...options
		})
		.then((res)=>{
			
			// console.log(res)
			const data = res[1].data;
			
			if(data.code !== 2000 || res[1].statusCode !== 200) {
				if(res[1].statusCode === 401) {
					reLogin(reject);
				}
				else {
					uni.showToast({
						title: data.msg,
						icon: 'none',
						duration: 1500    //持续时间为 1.5秒
					}) 
				} 
			} 
			else {
				res[1].statusCode === 200 ? resolve(data) : reject(data.msg);
			}
			
		})
		.catch((err)=>{
			console.log(err);
			reject(err)
		})
	})
}
