//install dulu expres 4.17.1
const express = require('express')
const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
 // res.sendFile('./index.html', {root:__dirname})
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})


app.get('/product/:id', (req, res) => {
  res.send(`product id : ${req.params.id} <br> category id : ${req.query.category}` )
})

app.use('/',(req,res) => {
  res.render('index')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})











