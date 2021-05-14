const client = require('./client').client;
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

if (process.env.NODE_ENV === "test") {
  client.login(client.confidential.token_test);
} else {
  client.login(client.confidential.token)
};
