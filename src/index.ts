// import { I18n } from 'i18n';
import { Client24 } from "./client";
import confidential from "./config/confidential.json"

// export const i18n = new I18n();
// i18n.configure({
//   locales: ['en'],
//   staticCatalog: {
//     en: yaml.load(fs.readFileSync('config/locales/en.yml', 'utf8'))
//   },
//   defaultLocale: 'en'
// })

const client = new Client24();

const env = process.env.NODE_ENV === "production" ? "production" : "test";

/*************************************************************
 *                       Client Events                       *
 *************************************************************/
/*
* 　　 ┏┓　　 　┏┓
* 　　┏┛┻━━━━━━┛┻┓
* 　　┃　　　　　 ┃
* 　　┃　   ━━　  ┃
* 　　┃   ┳┛　┗┳　┃
* 　　┃　　　　　 ┃
* 　　┃　　　┻　　┃
* 　　┃　　　　 　┃
* 　　┗━┓　　 　┏━┛
* 　　　┃　 　　┃
* 　　　┃　 　　┃
* 　　　┃　 　　┗━━━┓
* 　　　┃　　 　　　┣┓
* 　　　┃　　　 　 ┏┛
* 　　　┗┓┓┏━━━┳┓┏┛
* 　　　 ┃┫┫　 ┃┫┫
* 　　 　┗┻┛ 　┗┻┛g
*/

client.on("ready", () => {
  console.log("Logged in!");
});

client.on("message", client.msgHandler);

client.login(confidential[env]["token"]); // Test Bot
