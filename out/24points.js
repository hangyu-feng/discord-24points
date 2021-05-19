"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAns = void 0;
/*
 * Some old codes that surprisingly works
 */
function getAns(nums) {
    let numbersStrArray = nums.map((x) => x.toString());
    let res = "";
    function judge(numsArray, numsStrArray, target = 24) {
        if (!numsArray || numsArray.length === 0)
            return false;
        if (numsArray.length === 1) {
            if (Math.abs(numsArray[0] - target) < 1e-5) {
                res = numsStrArray[0];
                return true;
            }
            return false;
        }
        for (let i = 0; i < numsArray.length - 1; i++) {
            for (let j = i + 1; j < numsArray.length; j++) {
                let n1 = numsArray[i];
                let n2 = numsArray[j];
                let s1 = numsStrArray[i];
                let s2 = numsStrArray[j];
                let rest = [];
                let restStr = [];
                for (let k = 0; k < numsArray.length; k++) {
                    if (k !== i && k !== j) {
                        rest.push(numsArray[k]);
                        restStr.push(numsStrArray[k]);
                    }
                }
                if (judge([n1 + n2, ...rest], ["(" + s1 + " + " + s2 + ")", ...restStr], target) ||
                    judge([n1 - n2, ...rest], ["(" + s1 + " - " + s2 + ")", ...restStr], target) ||
                    judge([n2 - n1, ...rest], ["(" + s2 + " - " + s1 + ")", ...restStr], target) ||
                    judge([n1 * n2, ...rest], ["(" + s1 + " * " + s2 + ")", ...restStr], target) ||
                    judge([n1 / n2, ...rest], ["(" + s1 + " / " + s2 + ")", ...restStr], target) ||
                    judge([n2 / n1, ...rest], ["(" + s2 + " / " + s1 + ")", ...restStr], target)) {
                    return true;
                }
            }
        }
        return false;
    }
    if (judge(nums, numbersStrArray)) {
        return res;
    }
    return "";
}
exports.getAns = getAns;
//# sourceMappingURL=24points.js.map