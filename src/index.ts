import * as path from 'path';
// import { I18n } from 'i18n';
import { Client24 } from './client';
import * as yaml from 'js-yaml';
import * as fs from 'fs';


export const rootPath = path.dirname(__dirname);

// export const i18n = new I18n();
// i18n.configure({
//   locales: ['en'],
//   staticCatalog: {
//     en: yaml.load(fs.readFileSync(path.join(rootPath, 'config', 'locales', 'en.yml'), 'utf8'))
//   },
//   defaultLocale: 'en'
// })

const client = new Client24;

client.on('ready', () => {
  console.log("Logged in!");
});

client.on('message', client.msgHandler);

client.login('<token>');  // Test Bot
