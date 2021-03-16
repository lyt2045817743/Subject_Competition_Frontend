//设置缓存
const mySetStorage = function (key, value, seconds) {
	var timestamp = Date.parse(new Date()) / 1000
	if (key && value) {
		//设置缓存，默认有效期28天
		if (!seconds) {
			var expire = timestamp + (60*60*12)
		}else{
			var expire = timestamp + seconds
		}
		value = value + "|" + expire
		uni.setStorageSync(key, value);
	} else {
		console.log("key不能空")
	}
}

//获取缓存
const myGetStorage = function(key) {
	var timestamp = Date.parse(new Date()) / 1000
	if (key) {
		var val = uni.getStorageSync(key);
		var tmp = val.split("|")
		if (!tmp[1] || timestamp >= tmp[1]) {
			// 如果缓存失效，则删除缓存，返回空值
			// console.log(key + "已失效")
			uni.removeStorageSync(key)
			return ""
		} else {
			// console.log(key + "未失效")
			return tmp[0]
		}
	}
}

export {
	mySetStorage,
	myGetStorage
};