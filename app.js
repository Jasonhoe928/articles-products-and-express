const express = require('express');
const app = express();
var methodOverride = require('method-override');
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const Products = require('./db/products.js');
const PE_Inventory = new Products();
const Articles = require('./db/articles.js');
const Art_Inventory = new Articles();


app.use(express.static('public'));

app.use(bp.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs'); 

// render all product/article items
app.get('/', (req, res) => {
  // const items = PE_Inventory.all();
  // const artItem = Art_Inventory.all();
  res.render('home');
});


// render out the product form
app.get('/product/new', (req, res) => {
  res.render('productform');
});

//render out the article form
app.get('/article/new', (req, res) => {
    res.render('articleform');
});


//render out the products home page
app.get('/productshome', (req, res) => {
  const detailItems = PE_Inventory.all();
  console.log('product details CL', { detailItems }) //don't understand how this is displayed in console and what it does below
  res.render('productshome', { detailItems });
})

//render out the articles home page
app.get('/articleshome', (req, res) => {
  const articleItems = Art_Inventory.all();
  res.render('articleshome', { articleItems });
})

// render out product details
app.get('/product/:id', (req, res) => {
  // console.log('did it call');
  const { id } = req.params;
  const item = PE_Inventory.getItemById(id);
  // console.log('item', item);
  res.render('productdetail', item);
});


//render out article details
app.get('/article/:title', (req, res) => {
  const { title } = req.params;
  const item = Art_Inventory.getItemById(title);
  console.log('item CS', item)
  res.render('articledetails', item);
});



// add product item
app.post('/product/new', (req, res) => { //whenever there is a post to /product/new, does that trigger the form to populate and submit and come back here as req.body?
  // console.log('req.body', req.body);
  const item = req.body;
  PE_Inventory.add(item);
  res.redirect('/productshome');
});

// add article item
app.post('/article/new', (req, res) => {
    const artItem = req.body;
    // console.log('req.body articles ', req.body)
    console.log('artItems', artItem)
    Art_Inventory.add(artItem);
    res.redirect('/articleshome');
})

// delete product
app.get('/product/:id/removeProduct', (req, res) => {
  console.log('delete is here')
  const { id } = req.params;
  const deleteProduct = PE_Inventory.deleteProductById(id);
  res.render('removeProduct', { deleteProduct });
})



app.listen(process.env.PORT, () => {
  console.log(`Started app on port: ${process.env.PORT}`);
});