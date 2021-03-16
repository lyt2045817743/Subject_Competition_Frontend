class calendarComputer{
	constructor(initDate) {
	    this.initDate = initDate;
	}
	
	addDateByday(days) {
		const d = this.initDate ? new Date(this.initDate) : new Date();
		d.setDate(d.getDate() + days);
		const m = d.getMonth() + 1;
		return d.getFullYear() + '-' + m + '-' + d.getDate();
	}
	
	combatDate() {
		// console.log(this.initDate)
		const m = this.initDate.getMonth() + 1;
		const result = this.initDate.getFullYear() + '-' + m + '-' + this.initDate.getDate();
		return result;
	}
	
	// 2019-08-18T16:00:00.000Z 转换成格式2019-08-18
	switchTimeFormat(withHour = false) {
		const dateTime = new Date(this.initDate)
		const year = dateTime.getFullYear()
		const month = dateTime.getMonth() + 1
		const date = dateTime.getDate()
		if(withHour) {
			const hour = dateTime.getHours()
			const minute = dateTime.getMinutes()
			const second = dateTime.getSeconds()
			return `${year}-${this.addZero(month)}-${this.addZero(date)} ${this.addZero(hour)}:${this.addZero(minute)}:${this.addZero(second)}`
		} else {
			return `${year}-${this.addZero(month)}-${this.addZero(date)}`
		}
		
	}
	
	addZero (v) {
		return v < 10 ? '0' + v : v
	}
	
	stringToDate() {
		return new Date(Date.parse(this.initDate.replace(/-/g, "/"))); //转换成Data();
	}
}

export default calendarComputer;