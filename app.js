const express = require('express');
const app = express();

app.get('/', (req, resp) => {
  resp.send("all good");
});

const port = 3000;

app.listen(port, ()=> {
  console.log(`listen on port ${port}`);
});