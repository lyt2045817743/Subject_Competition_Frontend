class codeTranslater{
	constructor(model) {
	    this.model = model;
	}
	
	transCode(code) {
		const result = this.model.find( item => item.code === code );
		if(result) {
			return result.label;
		} else {
			console.log('code有误');
			return '';
		}
	}
}

export default codeTranslater;