// const googleTrends = new URL('https://whosmoretrendy.herokuapp.com/');
const localTest = new URL("http://localhost:3001/");

export default {
	async compare(Vue) {
		try {
			
			let result = await Vue.$http.get(localTest + `${Vue.keyword}/${Vue.keyword2}/${Vue.period}`);
			Vue.dates = result.data.data.map((data) => data.date);
			Vue.trendsData = [
				result.data.data.map((data) => data.keyword1),
				result.data.data.map((data) => data.keyword2),
				result.data.data.map((data) => data.bothKeywords),
			];
			console.log(Vue.trendsData);
			Vue.loaded = true;
		} catch (err) {
			this.errorMessage = err.response.data.error;
			this.showError = true;
		}
	},
};
