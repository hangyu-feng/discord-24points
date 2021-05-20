import * as path from "path";
// import { I18n } from 'i18n';
import { Client24 } from "./client";
import YAML from "yaml";
import * as fs from "fs";

export const rootPath = path.dirname(__dirname);

// export const i18n = new I18n();
// i18n.configure({
//   locales: ['en'],
//   staticCatalog: {
//     en: yaml.load(fs.readFileSync(path.join(rootPath, 'config', 'locales', 'en.yml'), 'utf8'))
//   },
//   defaultLocale: 'en'
// })

const client = new Client24();

const confidential = YAML.parse(
  fs.readFileSync(path.join(rootPath, "config/confidential.yml"), "utf8")
);

const env = process.env.NODE_ENV === "production" ? "production" : "test";

/*************************************************************
 *                       Client Events                       *
 *************************************************************/

client.on("ready", () => {
  console.log("Logged in!");
});

client.on("message", client.msgHandler);

client.login(confidential[env]["token"]); // Test Bot
