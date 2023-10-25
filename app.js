import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import session from 'express-session'; //melakukan session pada flash massage
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect


import http from 'http'; // Import modul 'http'
import { Server } from 'socket.io';


const app = express();

const server = http.createServer(app); // Buat server HTTP

const io = new Server(server); // Gunakan server HTTP untuk 'socket.io'


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
      title : 'beranda',
      layout : 'layout/main-layout'
    })
  })


  


  // halaman produk
app.get('/produk', (req,res) => {
  res.render('produk', {
    title : 'produk',
    layout : 'layout/main-layout'
  })
})


  // halaman detail produk

  app.get('/produk/bp', (req, res) => {
    // Render tampilan EJS (transaksi.ejs) dan kirimkan data produk
    res.render('bp', { 
      products ,
      title : 'basreng pedas',
      layout : 'layout/main-layout'
    });
  });


  const products = [
    { name: 'Produk A', price: 10000 },
    { name: 'Produk B', price: 20000 },
    // Tambahkan produk lain di sini
  ];
  
  io.on('connection', (socket) => {
    console.log('Client terhubung');
  
    // Mendengarkan pembelian produk
    socket.on('buyProduct', (productData) => {
      // Di sini Anda dapat menambahkan logika untuk meng-handle transaksi
      console.log(`Membeli ${productData.productName} seharga Rp ${productData.price}`);
      
      // Emitkan perubahan atau pesan ke semua klien yang terhubung
      io.emit('transactionSuccess', `Transaksi sukses: ${productData.productName}`);
    });
  
    // Ketika klien terputus
    socket.on('disconnect', () => {
      console.log('Client terputus');
    });
  });

//menangani jika error
  app.use('/', (req,res) => {
    res.render('index', {
      title : 'Bapol',
      layout : 'layout/main-layout'
    })
  })


app.listen(port, () => {
    console.log(`mongo di localhost ${port}`)
})