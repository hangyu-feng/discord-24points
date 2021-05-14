const yaml = require('js-yaml');
const fs = require('fs');
const client = require('./client').client;
const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const confidential = yaml.load(fs.readFileSync('confidential.yml', 'utf8', err => {
  if (err) {
    console.error(err)
    return
  }
}));

client.login(confidential.token);
