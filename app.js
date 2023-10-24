import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import session from 'express-session'; //melakukan session pada flash massage
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect


const app = express();
const port = 3200;


app.set('view engine','ejs')
 
// third-party middleware
app.use(expressLayouts);// konfigurasi

// build-in middleware
app.use(express.static('public'))
// jadi kita harus buat folder public di root


// middleware untuk ngeparsing data tambah kontak
app.use(express.urlencoded({extended : true})); 



//konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
   cookie : {maxAge : 6000},
   secret : 'secret',
   resave : true,
   saveUninitialized : true
}))
app.use(flash());


// halaman home
app.get('/beranda', (req,res) => {
    res.render('index', {
      title : 'AlfinGPT',
      layout : 'layout/main-layout'
    })
  })


//menangani jika error
  app.use('/', (req,res) => {
    res.render('index', {
      title : 'AlfinGPT',
      layout : 'layout/main-layout'
    })
  })


app.listen(port, () => {
    console.log(`mongo di localhost ${port}`)
})