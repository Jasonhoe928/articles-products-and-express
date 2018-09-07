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

app.use(methodOverride('_method'));

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

//render out products edit get
app.get('/products/:id/edit', (req, res) => {
  const { id } = req.params;
  let productToEdit = PE_Inventory.getItemById(id);
  res.render('edit', { productToEdit });
});

//render out articles edit get
app.get('/articles/:id/edit', (req, res) => {
  console.log('am I getting called')
  const { id } = req.params;
  let articleToEdit = Art_Inventory.getItemById(id);
  res.render('edit', { articleToEdit });
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


//delete product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const deleteProduct = PE_Inventory.deleteProductById(id);
  res.redirect('/productsHome');
});

//delete article
app.delete('/articles/:title', (req, res) => {
  const { title } = req.params;
  console.log('title', title)
  const deleteArticle = Art_Inventory.deleteArticleById(title);
  res.redirect('/articlesHome');
})



//edit product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  let productToEdit = PE_Inventory.getItemById(id);
  console.log('productToEdit', productToEdit)
  if (req.body.name !== productToEdit.name) {
    productToEdit.name = req.body.name;
  }
  if (req.body.price !== productToEdit.price) {
    productToEdit.price = req.body.price;
  }
  if ( req.body.description !== productToEdit.description) {
    productToEdit.description = req.body.description;
  }
  res.redirect(`/product/${id}`);
});


//edit article
app.put('/articles/:id', (req, res) => {
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
  res.redirect(`/articles/${id}`);
});



app.listen(process.env.PORT, () => {
  console.log(`Started app on port: ${process.env.PORT}`);
});