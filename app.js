const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const db = require('./database/connection');
const path = require('path');

const Job = require('./models/Job');

app.use(express.json());

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));

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
  Job.findAll({ order: [
    ['createdAt', 'DESC']
  ] })
  .then(jobs => {
    resp.render('index', { jobs });
  });

});

app.use('/jobs', require('./routes/jobs'));

// porta 
const port = 3000;

app.listen(port, ()=> {
  console.log(`listen on port ${port}`);
});