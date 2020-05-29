// todas as rotas referentes a jobs

const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
  resp.send('all good here');
});

router.get('/add', (req, resp) => {
  resp.render('add');
})
// adicionar um novo job
router.post('/add', (req, resp) => {
  const { title, salary, company, description, email, new_job } = req.body;

  job.create({
    title,
    salary,
    company,
    description,
    email,
    new_job
  }).then( () => resp.json({ ok: true }) )
    .catch(err => console.error(err));
    
});


module.exports = router;
