const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const db = require('./database/connection');
const bodyParser = require('body-parser');
const path = require('path');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.use( bodyParser.urlencoded({ extended: false }) );

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/jobs', require('./routes/jobs'));

// db connection
db
  .authenticate()
  .then( () => {
    console.log("sucessful connection with db");
  }).catch(err => {
    console.error("error try to connect to db");
  });

// routes
app.get('/', (req, resp) => {

  let search = req.query.job;
  let query = '%'+search+'%';

  if(!search) {
    Job.findAll({ order: [
      ['createdAt', 'DESC']
    ] })
    .then(jobs => {
      resp.render('index', { jobs });
    })
    .catch(err => console.log(err));

  } else {
    Job.findAll({ 
      where: { title: {[Op.like]: query } },
      order: [
        ['createdAt', 'DESC']
    ] })
    .then(jobs => {
      resp.render('index', { jobs });
    });
  }

});

// porta 
const PORT = 3000;

app.listen( PORT, ()=> { console.log(`listen on port ${PORT}`); } );