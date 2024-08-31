const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}  = require('./utils/contact')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')


const app = express()
const port = 3000


// Gunakan ejs untuk view engine
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts)


//built in middleware gunakan middleware public agar express dapat mengakses folder static
app.use(express.static('public'));

//built in middleware gunakan url encoded agar aplikasi dapat menerima data yang dikirim dari halaman web
app.use(express.urlencoded({extended: true}))
 
//konfigurasi flash
app.use(cookieParser('secret'))
app.use(
  session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)

//konfigurasi flash
app.use(flash())




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
      contacts,
      msg: req.flash('msg')
    });
});


//halaman tambah data contact

app.get('/contact/add', (req, res) => {
    const contacts = loadContact()
    res.render('add-contact',{
      layout: 'layouts/main-layout',
      title: 'halaman tambah contact'
    })
})



//halaman setelah proses input data contact
app.post('/contact',  [

  body('nama').custom((value) => {

    const duplikat = cekDuplikat(value)
    
    if (duplikat) {

      throw new Error ('nama contact sudah digunakan! ');
      
      
    }

    return true

  }),

  check('noHP', 'Nomor handphone tidak valid!').isMobilePhone('id-ID'),
  check('email','Email tidak valid! ').isEmail(),
] ,(req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('add-contact', {
      layout: 'layouts/main-layout',
      title: 'form tambah data contact',
      errors: errors.array()
    })
  } else {

    addContact(req.body)
    //kirimkan flash message
    req.flash('msg','data contact berhasil ditambahkan!')
    res.redirect('/contact')

  }

})

// rute proses delete contact 

app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  // jika contact tidak ada

  if (!contact) {
    
    res.status(404)
    res.send('<h1>404</h1>')

  } else {

    deleteContact(req.params.nama)

    req.flash('msg','data contact berhasil dihapus!')
    res.redirect('/contact')

  }


})

//rute edit contact

app.get('/contact/edit/:nama', (req, res) => {

  const contact = findContact(req.params.nama)

  res.render('edit-contact',{
    layout: 'layouts/main-layout',
    title: 'halaman ubah data contact',
    contact
  })
})


//proses ubah data 

app.post('/contact/update',  [

  body('nama').custom((value, {req} ) => {

    const duplikat = cekDuplikat(value)
    
    if (value !== req.body.oldnama && duplikat) {

      throw new Error ('nama contact sudah digunakan! ');
      
      
    }

    return true

  }),

  check('noHP', 'Nomor handphone tidak valid!').isMobilePhone('id-ID'),
  check('email','Email tidak valid! ').isEmail(),
] ,(req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('edit-contact', {
      layout: 'layouts/main-layout',
      title: 'form tambah data contact',
      errors: errors.array(),
      contact: req.body, 
    })
  } else {
    updateContacts(req.body)
    //kirimkan flash message
    req.flash('msg','data contact berhasil diubah')
    res.redirect('/contact')

  }

})






//halaman detail contact
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
