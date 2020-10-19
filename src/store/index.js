import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		keyword1: "",
		keyword2: "",
		period: "",
		chart: {
			trendsData: "",
			dates:'',
			loaded: false,
		},
		error: {
			message: "",
			show: false,
		},
	},
	mutations: {
		SET_KEYWORD1(state, kw) {
			state.keyword1 = kw;
		},
		SET_KEYWORD2(state, kw) {
			state.keyword2 = kw;
		},
		SET_PERIOD(state, period) {
			state.period = period;
		},
		SET_TRENDS_DATA(state, data) {
			state.chart.trendsData = data;
		},
		SET_DATES(state, pDate) {
			state.chart.dates = pDate;
		},
		SET_LOADED(state, bool) {
			state.chart.loaded = bool;
		},
		SET_ERROR_MESSAGE(state, msg) {
			state.error.message = msg;
		},
		SET_SHOW_ERROR_MESSAGE(state, bool) {
			state.error.show = bool;
		},
	},
	actions: {
		setKeyword1(context, kw) {
			context.commit("SET_KEYWORD1", kw);
		},
		setKeyword2(context, kw) {
			context.commit("SET_KEYWORD2", kw);
		},
		setPeriod(context, period) {
			context.commit("SET_PERIOD", period);
		},
		setTrendsData(context, data) {
			context.commit("SET_TRENDS_DATA", data);
		},
		setDates(context, pDates) {
			context.commit('SET_DATES', pDates);
		},
		setLoaded(context, bool) {
			context.commit("SET_LOADED", bool);
		},
		setErrorMessage(context, msg) {
			context.commit("SET_ERROR_MESSAGE", msg);
		},
		setShowErrorMessage(context, bool) {
			context.commit("SET_SHOW_ERROR_MESSAGE", bool);
		},
	},
	modules: {},
});
