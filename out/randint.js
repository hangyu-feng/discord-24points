"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randInt = void 0;
function randInt(min, max) {
    // inclusive
    return Math.floor(min + Math.random() * (max - min + 1));
}
exports.randInt = randInt;
//# sourceMappingURL=randint.js.map