// const googleTrends = new URL('https://whosmoretrendy.herokuapp.com/');
const localTest = new URL('http://localhost:3001/');

export default {
    async compare(Vue) {
        try {
            Vue.setLoading(true);
            let result = await Vue.$http.get(localTest + `${Vue.keyword1}/${Vue.keyword2}/${Vue.period}`);
            let dates = result.data.data.map((data) => data.date);
            let trendsData = [
                result.data.data.map((data) => data.keyword1),
                result.data.data.map((data) => data.keyword2),
                result.data.data.map((data) => data.bothKeywords),
            ];
            Vue.setDates(dates);
            Vue.setTrendsData(trendsData);
            Vue.setLoaded(true);
            Vue.setLoading(false);
            // Getting averages
            Vue.setKeywordsAverage(trendsData[0], trendsData[1]);
        } catch (err) {
            this.errorMessage = err.response.data.error;
            this.showError = true;
        }
    },
};
