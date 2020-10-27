import Utils from './utils';

// Light Theme
var lightPrimary = '#F1F1F1';
var lightSecondary = '#DDE1E3';
var lightFont = '#000000';
var lightShadow = Utils.LightenDarkenColor(lightPrimary, -30);
// Dark Theme
var darkPrimary = '#37474F';
var darkSecondary = '#212b30';
var darkFont = '#E0ECF6';
var darkShadow = Utils.LightenDarkenColor(darkPrimary, +20);

export default {
    // CSS variables binding
    appTheme(Vue) {
        if (!Vue.theme.darkMode) {
            return { primary: lightPrimary, secondary: lightSecondary, font: lightFont, shadow: lightShadow };
        } else {
            return { primary: darkPrimary, secondary: darkSecondary, font: darkFont, shadow: darkShadow };
        }
    },

    getStyle(Vue) {
        return `
            --team1-color : ${Vue.theme.team1};
            --team1-font : ${Utils.getRightFontColor(Vue.theme.team1)};
            --team2-color : ${Vue.theme.team2};
            --team2-font : ${Utils.getRightFontColor(Vue.theme.team2)};
            --app-primary-color:${Vue.appTheme.primary};
            --app-secondary-color:${Vue.appTheme.secondary};
            --app-font-color:${Vue.appTheme.font};
            --app-shadow-color:${Vue.appTheme.shadow};
        `;
    },
};
