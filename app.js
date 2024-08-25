const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact }  = require('./utils/contact')

const app = express()
const port = 3000


// Gunakan ejs untuk view engine
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts)


//built in middleware gunakan middleware public agar express dapat mengakses folder static
app.use(express.static('public'));







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
    const contacts = loadContact()
    res.render('contact', {
      layout: 'layouts/main-layout',
      title:'contact',
      contacts
    });
});


app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layout',
    contact
  })
})



//Rute penanganan 404
app.use((req, res) => {
res.status(404)
/res.send('<h1>error goblog</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
