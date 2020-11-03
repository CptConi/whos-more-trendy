import Utils from './utils';

// Light Theme
var lightPrimary = '#F1F1F1';
var lightSecondary = '#DDE1E3';
var lightFont = '#000000';
var lightPlaceholder = '#888888';
var lightShadow = Utils.LightenDarkenColor(lightPrimary, -30);
// var lightHint = '#9AD1D4';

// Dark Theme
var darkPrimary = '#37474F';
var darkSecondary = '#212b30';
var darkFont = '#E0ECF6';
var darkPlaceholder = '#AAA';
var darkShadow = Utils.LightenDarkenColor(darkPrimary, +20);
// var darkHint = '';

export default {
    getStyle(Vue) {
        let appTheme;
        if (!Vue.theme.darkMode) {
            appTheme = {
                primary: lightPrimary,
                secondary: lightSecondary,
                font: lightFont,
                placeholder: lightPlaceholder,
                shadow: lightShadow,
            };
        } else {
            appTheme = { primary: darkPrimary, secondary: darkSecondary, font: darkFont, placeholder: darkPlaceholder, shadow: darkShadow };
        }
        return `
            --team1-color : ${Vue.theme.team1};
            --team1-font : ${Utils.getRightFontColor(Vue.theme.team1)};
            --team2-color : ${Vue.theme.team2};
            --team2-font : ${Utils.getRightFontColor(Vue.theme.team2)};

            --app-primary-color:${appTheme.primary};
            --app-secondary-color:${appTheme.secondary};
            --app-font-color:${appTheme.font};
            --app-placeholder-color:${appTheme.placeholder};
            --app-shadow-color:${appTheme.shadow};
        `;
    },
};
