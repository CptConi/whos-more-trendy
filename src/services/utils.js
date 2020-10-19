export default {
    average(pArray) {
        let sum = 0;
        let i;
        let length = pArray.length
        for (i = 0; i < length; i++) {
            sum += parseInt(pArray[i], 10);
        }

        let avg = sum / length;
        return Math.floor(avg);
    },
};
