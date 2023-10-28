import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import session from 'express-session'; //melakukan session pada flash massage
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect
import bodyParser from "body-parser";
import  {loadData}  from './utils/olahdata.js';
import { loadComment } from './utils/comment.js';
import { findComment } from './utils/comment.js';
import { cekComment } from './utils/comment.js';
import { addComment } from './utils/comment.js';

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

app.use(bodyParser.json());

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
    const comment = loadComment();
    res.render('index', {
      comment,
      title : 'beranda',
      layout : 'layout/main-layout'
    })
  })



  // halaman produk
app.get('/produk', (req,res) => {
  const produk = loadData();
  res.render('produk', {
    produk,
    title : 'produk',
    layout : 'layout/main-layout'
  })
})


  // halaman detail produk

  app.get('/produk/bp', (req, res) => {
    // Render tampilan EJS (transaksi.ejs) dan kirimkan data produk
    res.render('bp', { 
      title : 'basreng pedas',
      layout : 'layout/main-layout'
    });
  });



//menangani jika error
  app.use('/', (req,res) => {
    const comment = loadComment();
    res.render('index', {
      comment,
      title : 'Bapol',
      layout : 'layout/main-layout'
    })
  })



app.listen(port, () => {
    console.log(`mongo di localhost ${port}`)
})