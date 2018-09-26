const express = require('express');
const Router = express.Router();
const bp = require('body-parser');
var methodOverride = require('method-override');
const Products = require('../db/products.js');
const PE_Inventory = new Products();
const knex = require('../knex/knex.js');

Router.use(bp.urlencoded({ extended: true }));
Router.use(methodOverride('_method'));

//render out product home page
Router.get('/', (req, res) => {
  knex.raw('SELECT * FROM products')
    .then( result => {
      const products = result.rows;
      console.log('products', products)
      res.render('productshome', { products });
    })
    .catch(err => {
      console.log('error', err);
    })
});

// render out the product form
Router.get('/new', (req, res) => {
  res.render('productform');
});

// render out product details
Router.get('/:id', (req, res) => {
  console.log('req params log', req.params)
  const { id } = req.params;
  knex.raw(`SELECT * FROM products WHERE id = ${id}`)
  .then( result => {
    console.log('result', result)
    const products = result.rows[0];
    console.log('products', products)
    res.render('productdetail', { products });
  })
  .catch(err => {
    console.log('error', err);
  })
});

//render out products edit get
Router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  knex.raw(`SELECT * FROM products WHERE id = ${id}`)
    .then(result => {
      const productToEdit = result.rows[0]
      res.render(`edit`, { productToEdit })
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/product')
    })
});

//render out edit product put
Router.put('/:id', (req, res) => {
  console.log('fired')
  const { id } = req.params;
    knex.raw(`UPDATE products SET name = '${req.body.name}', description = '${req.body.description}', price = ${req.body.price} WHERE id = ${id}`)
      .then( result => {
        console.log('EDIT product redirect /products/${id}');
        res.redirect(`/product/${id}`);
      })
      .catch( err => {
        console.log('error', err)
      });
});


// add product item
Router.post('/new', (req, res) => {
  const item = req.body;
  knex.raw(`INSERT INTO products (name, description, price) VALUES ('${item.name}', '${item.description}', '${item.price}')`)
    .then( result => {
      console.log('result', result)
      res.redirect('/product');
    })
    .catch( err => {
      console.log('error', err)
      res.redirect('/')
    })
});

//delete product
Router.delete('/:id', (req, res) => {
  const { id } = req.params;
  knex.raw(`DELETE FROM products WHERE id = ${id}`)
    .then( result => {
      console.log('delete result', result)
      res.redirect('/product');
    })
    .catch( err => {
      console.log('error', err)
      res.redirect('/')
    })
});

module.exports = Router;