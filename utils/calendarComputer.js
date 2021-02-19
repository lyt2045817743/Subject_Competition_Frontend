class calendarComputer{
	constructor(initDate) {
	    this.initDate = initDate;
	}
	
	addDateByday(days) {
		const d = this.initDate ? new Date(this.initDate) : new Date();
		d.setDate(d.getDate()+days);
		const m=d.getMonth()+1;
		return d.getFullYear()+'-'+m+'-'+d.getDate();
	}
	
	combatDate() {
		const m=this.initDate.getMonth()+1;
		return this.initDate.getFullYear()+'-'+m+'-'+this.initDate.getDate();
	}
}

export default calendarComputer;