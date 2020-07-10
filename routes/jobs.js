// todas as rotas referentes a jobs
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const crypto = require('crypto');

router.get('/', (req, resp) => {
  resp.send('all good here');
});

// detalhe da vaga
router.get('/view/:id', (req, resp) => {
  Job.findOne({ 
    where: { id: req.params.id }
   }).then(job => {
      resp.render('view', {
        job
      });
   }).catch( err => console.log(err) );
});

// form de envio
router.get('/add', (req, resp) => {
  resp.render('add');
});

// adicionar um novo job
router.post('/add', (req, resp) => {
  const { title, description, salary, company, email, new_job } = req.body;
  const id = crypto.randomBytes(3).toString('HEX');

  console.log(` title: ${title}`)

  //inserir dados no sistema
  Job.create({
    title ,
    description,
    salary ,
    company ,
    email ,
    new_job 
  }).then( () => resp.redirect('/') ).catch(err => console.log(err) );

});

module.exports = router;
