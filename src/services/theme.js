export default {
    getStyle(Vue) {
        return `
            --team1-color : ${Vue.theme.team1};
            --team2-color : ${Vue.theme.team2};
            --app-primary-color:${Vue.appTheme.primary};
            --app-secondary-color:${Vue.appTheme.secondary};
            --app-font-color:${Vue.appTheme.font};
        `;
    },
    appTheme(Vue) {
        if (!Vue.theme.darkMode) {
            return { primary: '#F1F1F1', secondary: '#DDE1E3', font: '#000000' };
        } else {
            return { primary: '#37474F', secondary: '#4B616C', font: '#E0ECF6' };
        }
    },
};
