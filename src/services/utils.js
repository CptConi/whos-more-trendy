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
};
