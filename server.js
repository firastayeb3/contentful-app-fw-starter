const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, './app.html'));
});

app.listen(8080, () => {
  console.log(`Listening on 8080.`);
});
