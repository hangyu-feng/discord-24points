"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPath = void 0;
const path = __importStar(require("path"));
// import { I18n } from 'i18n';
const client_1 = require("./client");
exports.rootPath = path.dirname(__dirname);
// export const i18n = new I18n();
// i18n.configure({
//   locales: ['en'],
//   staticCatalog: {
//     en: yaml.load(fs.readFileSync(path.join(rootPath, 'config', 'locales', 'en.yml'), 'utf8'))
//   },
//   defaultLocale: 'en'
// })
const client = new client_1.Client24;
client.on('ready', () => {
    console.log("Logged in!");
});
client.on('message', client.msgHandler);
client.login('ODQyMTc2MDcwMTg5ODQyNDQy.YJxflg.L3xbFZ84bDVRHYu8I9jkiokKX0M'); // Test Bot
//# sourceMappingURL=index.js.map