import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        keyword1: '',
        keyword2: '',
        period: '',
        chart: {
            trendsData: '',
            dates: '',
            loaded: false,
            loading: false,
        },
        error: {
            message: '',
            show: false,
        },
        score: {
            red: 0,
            blue: 0,
            visible: false,
        },
        averages: {
            kw1: '',
            kw2: '',
        },
        winner: '',
        theme: {
            team1: '#f44336',
            team2: '#2196f3',
            darkMode: false,
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
        SET_LOADING(state, bool) {
            state.chart.loading = bool;
        },
        SET_ERROR_MESSAGE(state, msg) {
            state.error.message = msg;
        },
        SET_SHOW_ERROR_MESSAGE(state, bool) {
            state.error.show = bool;
        },
        SET_AVERAGES(state, pAverages) {
            state.averages.kw1 = pAverages.avg1;
            state.averages.kw2 = pAverages.avg2;
        },
        SET_WINNER(state, pString) {
            state.winner = pString;
        },
        RESET_SCORE(state) {
            state.score.blue = 0;
            state.score.red = 0;
        },
        ADD_SCORE_RED(state, score) {
            state.score.red += score;
        },
        ADD_SCORE_BLUE(state, score) {
            state.score.blue += score;
        },
        SET_SCORE_VISIBILITY(state, isVisible) {
            state.score.visible = isVisible;
        },
        SET_THEME_TEAM_1(state, pColor) {
            state.theme.team1 = pColor;
        },
        SET_THEME_TEAM_2(state, pColor) {
            state.theme.team2 = pColor;
        },
        SET_THEME_APP(state, pTheme) {
            state.theme.darkMode = pTheme;
        },
    },
    actions: {
        setKeyword1(context, kw) {
            context.commit('SET_KEYWORD1', kw);
        },
        setKeyword2(context, kw) {
            context.commit('SET_KEYWORD2', kw);
        },
        setPeriod(context, period) {
            context.commit('SET_PERIOD', period);
        },
        setTrendsData(context, data) {
            context.commit('SET_TRENDS_DATA', data);
        },
        setDates(context, pDates) {
            context.commit('SET_DATES', pDates);
        },
        setLoaded(context, bool) {
            context.commit('SET_LOADED', bool);
        },
        setLoading(context, bool) {
            context.commit('SET_LOADING', bool);
        },
        setErrorMessage(context, msg) {
            context.commit('SET_ERROR_MESSAGE', msg);
        },
        setShowErrorMessage(context, bool) {
            context.commit('SET_SHOW_ERROR_MESSAGE', bool);
        },
        setAverages(context, pAverages) {
            context.commit('SET_AVERAGES', pAverages);
        },
        setWinner(context, pWinner) {
            context.commit('SET_WINNER', pWinner);
        },
        resetScore(context) {
            context.commit('RESET_SCORE');
        },
        addToScore(context, pScore) {
            pScore.team === 'red' ? context.commit('ADD_SCORE_RED', pScore.score) : context.commit('ADD_SCORE_BLUE', pScore.score);
        },
        SetScoreVisibility(context, isVisible) {
            context.commit('SET_SCORE_VISIBILITY', isVisible);
        },
        setTheme(context, pTeam, pTheme) {
            if (pTeam === '1') {
                context.commit('SET_THEME_TEAM_1', pTheme)
            } else if (pTeam === '2') {
                context.commit('SET_THEME_TEAM_2', pTheme)
            } else if (pTeam === 'darkMode') {
                context.commit('SET_THEME_APP', pTheme)
            }
        }
    },
    modules: {},
});
