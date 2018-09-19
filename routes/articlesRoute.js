const express = require('express');
const Router = express.Router();
const bp = require('body-parser');
const Articles = require('../db/articles.js');
const Art_Inventory = new Articles();
Router.use(bp.urlencoded({ extended: true }));

Router.get('/', (req, res) => {
  const articleItems = Art_Inventory.all();
  res.render('articleshome', { articleItems });
});

//render out article form
Router.get('/new', (req, res) => {
  res.render('articleform');
});

//render out article details
Router.get('/:title', (req, res) => {
  const { title } = req.params;
  const item = Art_Inventory.getItemById(title);
  console.log('item CS', item)
  res.render('articledetails', item);
});

//render out articles edit get
Router.get('/:id/edit', (req, res) => {
  console.log('am I getting called')
  const { id } = req.params;
  let articleToEdit = Art_Inventory.getItemById(id);
  res.render('edit', { articleToEdit });
});

// add article item
Router.post('/new', (req, res) => {
  const artItem = req.body;
  // console.log('req.body articles ', req.body)
  console.log('artItems', artItem)
  Art_Inventory.add(artItem);
  res.redirect('/article');
});

//delete article
Router.delete('/:title', (req, res) => {
  const { title } = req.params;
  console.log('title', title)
  const deleteArticle = Art_Inventory.deleteArticleById(title);
  res.redirect('/articlesHome');
});

//edit article
Router.put('/:id', (req, res) => {
  const { id } = req.params;
  let articleToEdit = Articles_Inv.getItemById(id);
  if (req.body.title !== articleToEdit.title) {
    articleToEdit.title = req.body.title;
  }
  if (req.body.body !== articleToEdit.body) {
    articleToEdit.body = req.body.body;
  }
  if ( req.body.author !== articleToEdit.author) {
    articleToEdit.author = req.body.author;
  }
  res.redirect(`/${id}`);
});

module.exports = Router;