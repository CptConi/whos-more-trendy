export default {
    average(pArray) {
        let sum = 0;
        let i;
        let length = pArray.length;
        for (i = 0; i < length; i++) {
            sum += parseInt(pArray[i], 10);
        }

        let avg = sum / length;
        return Math.floor(avg);
    },

    // Credits to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    },

    // Credits to Chris Coyier https://css-tricks.com/snippets/javascript/lighten-darken-color/
    LightenDarkenColor(col, amt) {
        var usePound = false;
        if (col[0] == '#') {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        var b = ((num >> 8) & 0x00ff) + amt;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        var g = (num & 0x0000ff) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    },

    getRightFontColor(pColor) {
        var color = pColor.substring(1); // strip #
        var rgb = parseInt(color, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >> 8) & 0xff;
        var b = (rgb >> 0) & 0xff;

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; 
        return luma < 135 ? '#E0ECF6' : '#000000';
    },
};
