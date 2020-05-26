const express = require('express');
const app = express();
const db = require('./database/connection');
const bodyparser = require('body-parser');

app.use(express.json());

// db connection
db
  .authenticate()
  .then( ()=> {
    console.log("sucessful connection with db");
  }).catch(err => {
    console.error("error try to connect to db");
  });

// routes
app.get('/', (req, resp) => {
  resp.send("all good");
});

app.use('/jobs', require('./routes/jobs'));

// porta 
const port = 3000;

app.listen(port, ()=> {
  console.log(`listen on port ${port}`);
});