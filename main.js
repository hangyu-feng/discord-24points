const yaml = require('js-yaml');
const fs = require('fs');

const client = require('./client').client

const confidential = yaml.load(fs.readFileSync('confidential.yml', 'utf8', err => {
  if (err) {
    console.error(err)
    return
  }
}));

client.login(confidential.token);
