const express = require('express');
const Router = express.Router();
const bp = require('body-parser');
const Articles = require('../db/articles.js');
const Art_Inventory = new Articles();
Router.use(bp.urlencoded({ extended: true }));
const knex = require('../knex/knex.js');

Router.get('/', (req, res) => {
  knex.raw('SELECT * FROM articles')
  .then( result => {
    const articles = result.rows;
    console.log('articles', articles);
    res.render('articleshome', { articles });

  })
});

//render out article form
Router.get('/new', (req, res) => {
  res.render('articleform');
});

//render out article details
Router.get('/:title', (req, res) => {
  const { title } = req.params; //how does req.params evaluate down and what does it do with {title}?
  console.log('article req.params', req.params)
  knex.raw(`SELECT * FROM articles WHERE title = '${title}'`) //why are knex.raw always in ``'s?
  .then( result => {
    console.log('result', result)
    const articles = result.rows[0];
    console.log('articles Cl', articles)
    res.render('articledetails', { articles });
  })
  .catch(err => {
    console.log('error', err);
  })
});


// add article item
Router.post('/new', (req, res) => {
  const articles = req.body;
  console.log('req.body', req.body)
  knex.raw(`INSERT INTO articles (title, description, author) VALUES ('${articles.title}', '${articles.description}', '${articles.author}')`)
    .then( result => {
      console.log('result', result);
      res.redirect('/article');
    })
    .catch( err => {
      console.log('error', err)
      res.redirect('/')
    })
});

//delete article
Router.delete('/:title', (req, res) => {
  const { title } = req.params;
  knex.raw(`DELETE FROM articles WHERE title = '${title}'`)
  .then( result => {
    console.log('deleted result', result);
    res.redirect('/article');
  })
  .catch( err => {
    console.log('error, err');
    res.redirect('/');
  })
});

//render out articles edit get
Router.get('/:title/edit', (req, res) => {
  console.log('am I getting called')
  const { title } = req.params;
  knex.raw(`SELECT * FROM articles WHERE title = '${ title }'`)
    .then(result => {
      const articleToEdit = result.rows[0];
      res.render('edit', { articleToEdit });
    })
});

//edit article put
Router.put('/:title', (req, res) => {
  const { title } = req.params;
  knex.raw(`UPDATE articles SET title = '${req.body.title}', description = '${req.body.description}', author = ${req.body.author} WHERE title = ${title}`)
    .then( result => {
      console.log('EDIT articles redirect /article/${title}');
      res.redirect(`/${title}`);
    })
    .catch( err => {
      console.log('error', err)
    });
  });
module.exports = Router;