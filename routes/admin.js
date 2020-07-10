// todas as rotas referentes a jobs
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', (res, resp) => {
  Job.findAll()
  .then(jobs => {
    // resp.render('admin', { jobs });
    resp.json(jobs);
  })
  .catch(err => console.log(err));
});

router.delete('/remove/:id', (req, resp) => {
  const { id } = req.params;

  Job.destroy({ 
    where: { id: id }
  }).then(jobs => {
    resp.json({ ok: 'delete!' });
  }).catch(err => console.log(`erro: ${err}`));
});

module.exports = router;