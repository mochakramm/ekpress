//install dulu expres 4.17.1
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! ganteng')
})
app.get('/about', (req, res) => {
  res.send('ini adalah halaman about')
})
app.get('/contact', (req, res) => {
  res.send('ini adalah halaman contact')
})

app.use('/',(req,res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})










// const http = require('http');
// const fs = require('fs');
// const port =3000


// const renderHTML = (path, res) => {
//     fs.readFile(path, (e, data) => {
//         if (e) {
//             res.writeHead(404)
//             res.write('error: file not found')

//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// }
// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//     });

//     const url = req.url;

//     switch (url) {
//         case '/about':
//             renderHTML ('./about.html', res)
//             break
//         case '/contact':
//             renderHTML('./contact.html', res)
//             break
//         default:
//             renderHTML('./index.html',res)
//             break
//     }

//     // if (url === '/about') {
//     //   renderHTML('./about.html', res)
//     //  } else if (url === '/contact') {
//     //   renderHTML('./contact.html', res)
//     // } else {
//     //  renderHTML('./index.html', res)
//     // }
//   })
//   .listen(port, () => {
//     console.log('server is listening on port 3000...');
//   });
