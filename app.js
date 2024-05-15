import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import session from 'express-session'; //melakukan session pada flash message
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect
import bodyParser from "body-parser";
import { loadData } from './utils/olahdata.js';
import { loadComment } from './utils/comment.js';
import { addComment } from './utils/comment.js';
import { Produk } from './utils/produks.js';
import multer from 'multer';
import {body, validationResult, check} from "express-validator";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

const app = express();
const port = 3300;
const upload = multer({ dest: 'uploads/' });

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

// Data penjualan
const penjualan = [];

// Inventaris donat
const inventaris = {
  donat: { stok: 1000, harga: 5000 }
};

// halaman home
app.get('/beranda', (req, res) => {
  const comments = loadComment();
  const np = Produk();
  res.render('index', {
      comment: comments,
      np: np,
      title: 'beranda',
      layout: 'layout/main-layout',
      mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  });
});

app.post('/', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('index', {
      title: 'comment',
      layout: 'layout/main-layout',
      mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
      errors: errors.array(), // Kirim pesan kesalahan ke halaman
      // ... (tambahkan field lain yang mungkin diperlukan)
    });
  } else {
    try {
      addComment(req.body);
      res.redirect('/beranda');
    } catch (error) {
      console.error('Error while adding comment:', error);
      res.render('index', {
        title: 'comment',
        layout: 'layout/main-layout',
        errors: [{ msg: 'Error while adding comment. Please try again.' }] // Pesan kesalahan umum
        // ... (tambahkan field lain yang mungkin diperlukan)
      });
    }
  }
});

// halaman produk
app.get('/produk', (req,res) => {
  const produk = loadData();
  res.render('produk', {
    produk,
    title : 'produk',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  })
})

// halaman detail produk
app.get('/produk/bp', (req, res) => {
  const bp = [
    {berat : "50 gram" , harga : "5.000"},
    {berat : "250 gram" , harga : "20.000"},
    {berat : "500 gram" , harga : "35.000"},
    {berat : "1 kg" , harga : "70.000"}
   ];
  res.render('bp', { 
    bp,
    title : 'basreng pedas',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  });
});

app.get('/produk/bo', (req, res) => {
  const bo = [
    {berat : "50 gram" , harga : "5.000"},
    {berat : "250 gram" , harga : "20.000"},
    {berat : "500 gram" , harga : "35.000"},
    {berat : "1 kg" , harga : "70.000"}
   ];
  res.render('bo', { 
    bo,
    title : 'basreng original',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  });
});

app.post('/produk/bo/purchase', (req, res) => {
  const { platform, berat, harga } = req.body;
  const item = 'donat';

  if (!inventaris[item]) {
    return res.status(400).send('Item tidak tersedia.');
  }

  const stokDibutuhkan = parseInt(berat, 10);

  if (inventaris[item].stok < stokDibutuhkan) {
    return res.status(400).send('Stok tidak mencukupi.');
  }

  const pembayaranSudahDilakukan = req.body.pembayaranSudahDilakukan === 'true';

  if (pembayaranSudahDilakukan) {
    inventaris[item].stok -= stokDibutuhkan;

    penjualan.push({
      platform,
      tanggal: new Date(),
      berat: stokDibutuhkan,
      harga: parseInt(harga, 10),
      item
    });

    res.send('Data telah dimasukkan ke laporan.');
  } else {
    res.status(400).send('Pelanggan belum membayar.');
  }
});

app.get('/produk/ci', (req, res) => {
  const ci = [
    {berat : "50 gram" , harga : "5.000"}
   ];
  res.render('ci', { 
    ci,
    title : 'basreng original',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  });
});

app.get('/produk/ma', (req, res) => {
  const ma = [
    {berat : "50 gram" , harga : "6.000"}
   ];
  res.render('ma', { 
    ma,
    title : 'basreng original',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  });
});

app.get('/produk/mi', (req, res) => {
  const mi = [
    {berat : "50 gram" , harga : "6.000"}
   ];
  res.render('mi', { 
    mi,
    title : 'basreng original',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  });
});

app.get('/about', (req,res) => {
  res.render('about', {
    title : 'halaman about',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  })
})

app.get('/contact',(req,res) => {
  const contact = [
    {nama : "Putri Regina Indriani", Whatsapp : "082163784981"},
  ]
  res.render('contact', {
    contact,
    title : 'halaman contact',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  })
})

// Rute laporan
function filterPenjualanBerdasarkanRentangTanggal(start, end) {
  return penjualan.filter(penjualan => {
    const tanggalPenjualan = new Date(penjualan.tanggal);
    return tanggalPenjualan >= start && tanggalPenjualan <= end;
  });
}

app.get('/report/daily', (req, res) => {
  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);
  const penjualanHarian = filterPenjualanBerdasarkanRentangTanggal(start, end);
  res.render('report', { penjualan: penjualanHarian, title: 'Laporan Harian', layout: 'layout/main-layout' });
});

app.get('/report/weekly', (req, res) => {
  const today = new Date();
  const start = startOfWeek(today);
  const end = endOfWeek(today);
  const penjualanMingguan = filterPenjualanBerdasarkanRentangTanggal(start, end);
  res.render('report', { penjualan: penjualanMingguan, title: 'Laporan Mingguan', layout: 'layout/main-layout' });
});

app.get('/report/monthly', (req, res) => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const penjualanBulanan = filterPenjualanBerdasarkanRentangTanggal(start, end);
  res.render('report', { penjualan: penjualanBulanan, title: 'Laporan Bulanan', layout: 'layout/main-layout' });
});

app.get('/report/yearly', (req, res) => {
  const today = new Date();
  const start = startOfYear(today);
  const end = endOfYear(today);
  const penjualanTahunan = filterPenjualanBerdasarkanRentangTanggal(start, end);
  res.render('report', { penjualan: penjualanTahunan, title: 'Laporan Tahunan', layout: 'layout/main-layout' });
});

//menangani jika error
app.use('/', (req,res) => {
  const comment = loadComment();
  const np = Produk();
  res.render('index', {
    comment,
    np : np,
    title : 'Bapol',
    layout : 'layout/main-layout',
    mainImageSrc: req.session.mainImageSrc || '/img/donut.jpg',
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
