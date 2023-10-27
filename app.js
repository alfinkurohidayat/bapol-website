import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import session from 'express-session'; //melakukan session pada flash massage
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect
import fs from 'node:fs';
import ejs from 'ejs';


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
      title : 'basreng pedas',
      layout : 'layout/main-layout'
    });
  });



//menangani jika error
  app.use('/', (req,res) => {
    res.render('index', {
      title : 'Bapol',
      layout : 'layout/main-layout'
    })
  })


  const data = {
    pageTitle: 'My EJS Page',
    appName: 'My EJS App',
};

  fs.readFile('views/index.ejs', 'utf8', (err, template) => {
    if (err) {
        throw err;
    }

    // Merender berkas EJS
    ejs.render(template, data, (err, renderedHTML) => {
        if (err) {
            throw err;
        }

        // Simpan hasil rendering ke berkas HTML
        fs.writeFile('index.html', renderedHTML, (err) => {
            if (err) {
                throw err;
            }

            console.log('Berkas HTML berhasil dihasilkan.');
        });
    });
});


app.listen(port, () => {
    console.log(`mongo di localhost ${port}`)
})