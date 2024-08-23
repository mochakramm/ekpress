const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')

// Gunakan ejs untuk view engine
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//built in middleware gunakan middleware public agar express dapat mengakses folder static
app.use(express.static('public'));



//application level middleware
app.use((req,res,next) => {
  console.log('time: ', Date.now())
  next()
})



app.get('/index', (req, res) => {
    res.render('index', {
      layout: 'layouts/main-layout',
      title: 'Home'
    });
});
app.get('/', (req, res) => {
    res.render('index', {
      layout: 'layouts/main-layout',
      title: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
      layout: 'layouts/main-layout',
      title: 'about'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {
      layout: 'layouts/main-layout',
      title:'contact'});
});



// Rute penanganan 404
app.use((req, res) => {
  res.status(404)
  res.send('<h1>error goblog</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
