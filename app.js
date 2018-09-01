const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
// const Inventory = require('./db/pe_inventory.js');
const Products = require('./db/products.js');
const PE_Inventory = new Products();
// const DS_Inv = new Inventory();

app.use(express.static('public'));

app.use(bp.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({ layout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs'); 

// render all product items
app.get('/', (req, res) => {
  const items = PE_Inventory.all();
  console.log('items', items);
  res.render('home', { items });
});

// render out the product form
app.get('/product/new', (req, res) => {
  res.render('form');
});

// render out product details
app.get('/product/:id', (req, res) => {
  console.log('did it call');
  const { id } = req.params;
  const item = PE_Inventory.getItemById(id);
  console.log('item', item);
  res.render('detail', item);
});

// add item
app.post('/product/new', (req, res) => {
  console.log('req.body', req.body);
  const item = req.body;
  PE_Inventory.add(item);
  res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(`Started app on port: ${process.env.PORT}`);
});