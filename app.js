const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts')

// Gunakan ejs untuk view engine
app.set('view engine', 'ejs');
app.use(expressLayouts)

app.get('/index', (req, res) => {
    res.render('index', {
      
      title: 'Home',
      layout: 'layouts/main-layout'
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
  res.status(404).render('404'); // Pastikan ada template 404.ejs
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
