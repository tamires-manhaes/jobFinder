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

router.get('/admin', (res, resp) => {
  Job.findAll()
  .then(jobs => {
    // resp.render('admin', { jobs });
    resp.json(jobs);
  })
  .catch(err => console.log(err));
});

router.get('/remove', (req, resp) => {
  resp.render('remove');
});

router.post('/remove/', (req, resp) => {
  const { idVaga } = req.body;

  console.log(`id: ${idVaga}`);

  Job.destroy({ 
    where: { id: idVaga }
  }).then( () => {
      resp.redirect('/') 
    }).catch(err => console.log(err) );
});



module.exports = router;
