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
    getStyle(Vue) {
        let appTheme; 
        if (!Vue.theme.darkMode) {
            appTheme = { primary: lightPrimary, secondary: lightSecondary, font: lightFont, shadow: lightShadow };
        } else {
            appTheme = { primary: darkPrimary, secondary: darkSecondary, font: darkFont, shadow: darkShadow };
        }
        return `
            --team1-color : ${Vue.theme.team1};
            --team1-font : ${Utils.getRightFontColor(Vue.theme.team1)};
            --team2-color : ${Vue.theme.team2};
            --team2-font : ${Utils.getRightFontColor(Vue.theme.team2)};

            --app-primary-color:${appTheme.primary};
            --app-secondary-color:${appTheme.secondary};
            --app-font-color:${appTheme.font};
            --app-shadow-color:${appTheme.shadow};
        `;
    },
};
