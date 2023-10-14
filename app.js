import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import Contact from './model/contacts.js';
import Uang from './model/uang.js';
import session from 'express-session'; //melakukan session pada flash massage
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect
import {body, validationResult, check} from "express-validator"; //modul validasi
import  methodOverride  from 'method-override'; //delete
import mongoose from 'mongoose';

import './utils/db.js';

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


//setup method-override
app.use(methodOverride('_method'));

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


//halaman keuangan
app.get('/layanan', async (req,res) => {
  const uang = await Uang.find();

    res.render('layanan', { nama : 'alfin' , title : 'layanan',
    layout : 'layout/main-layout',
    uang,
    mesage : req.flash('mesage')
  })
  })


// halaman tambah data keuangan
app.get('/layanan/add', (req,res) => {
  res.render('adduang', {
    title : 'form tambah data',
    layout : 'layout/main-layout'
  })
})


// proses tambah data keuangan
app.post('/layanan', [
  
  body('tgl').custom(async(value) => {
    const duplikat = await Uang.findOne({tgl : value})
    if(duplikat) {
      
      throw new Error('tgl sudah digunakan')
    } 

    return true;
  }),


],(req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
   
    res.render('adduang', {
      title : 'form tambah data',
      layout : 'layout/main-layout',
      errors : errors.array()
    })
  }else{
    Uang.insertMany(req.body).then(() => {
      req.flash('mesage', 'data berhasil ditambah')
      res.redirect('/layanan'); 
    })
  }
})




// proses delete kontak menggunakan request method yang benar
// download modul method-override(untuk menggunakan http verbs seperti PUT dan DELETE ditempat yang cliennya tidak suport)
app.delete('/layanan' , (req , res) => {
  Uang.deleteOne({tgl : req.body.tgl}).then(() => {
          req.flash('mesage', 'data berhasil dihapus')
          res.redirect('/layanan'); 
        })      
});




// ubah data uang
app.get('/layanan/edit/:tgl', async (req,res) => {

  const uang = await Uang.findOne({ tgl : req.params.tgl});

  res.render('edituang', {
    title : 'form tambah data',
    layout : 'layout/main-layout',
    uang,
  })
})


//proses ubah data
app.put('/layanan', [
  body('tgl').custom( async (value, { req }) => {
    const duplikat = await Uang.findOne({tgl : value});
    // if(value !== req.body.oldname && duplikat) {
    //   throw new Error('tanggal sudah digunakan')
    // } 
    // return true;
  }),

//  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')

],(req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('edituang', {
      title : 'form ubah data',
      layout : 'layout/main-layout',
      errors : errors.array(),
      kontak : req.body
    })
  }else{
  Uang.updateOne(
    {_id : req.body._id},
    {
      $set: {
      tgl : req.body.tgl,
      masuk : req.body.masuk,
      keluar : req.body.keluar,
      keperluan : req.body.keperluan
    }}
    ).then(() => {
      req.flash('mesage', 'data berhasil diubah')
      res.redirect('/layanan'); 
    })
  }
})



  // tombol aksi detail uang
  app.get('/layanan/:tgl', async (req,res) => {
    // cara mendapatkan data kontak satu orang
    const uang = await Uang.findOne({tgl : req.params.tgl})

    res.render('udetail', { nama : 'alfin' , title : 'details kontak',
    layout : 'layout/main-layout',
    uang
  })
  })





  //halaman kontak
  app.get('/kontak', async (req,res) => {
   const kontaks = await Contact.find();

   res.render('kontak', { nama : 'alfin' , title : 'kontak',
  layout : 'layout/main-layout',
  kontaks,
  mesage : req.flash('mesage')
  })
  })


  // halaman tambah kontak
app.get('/kontak/add', (req,res) => {
  res.render('addkontak', {
    title : 'form tambah data',
    layout : 'layout/main-layout'
  })
})


// proses data kontak
app.post('/kontak', [
  
  body('tanggal').custom(async(value) => {
    const duplikat = await Contact.findOne({tanggal : value})
    if(duplikat) {
      
      throw new Error('tanggal sudah digunakan')
    } 

    return true;
  }),

  check('status', 'status tidak valid').isBoolean(), 
//  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')

],(req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
   
    res.render('addkontak', {
      title : 'form tambah data',
      layout : 'layout/main-layout',
      errors : errors.array()
    })
  }else{
    Contact.insertMany(req.body).then(() => {
      req.flash('mesage', 'data berhasil ditambah')
      res.redirect('/kontak'); 
    })
  }
})



// proses delete kontak
// app.get('/kontak/delete/:nama', async (req,res) => {
//   const kontak = await Contact.findOne({nama : req.params.nama});
//   if(!kontak) {
//     res.send('<h4>data tidak ada</h4>');
//   }else{
//     // menghapus menggunakan id
//     Contact.deleteOne({_id : kontak._id}).then(() => {
//       req.flash('mesage', 'data berhasil dihapus')
//       res.redirect('/kontak'); 
//     })
//   }
// })


// proses delete kontak menggunakan request method yang benar
// download modul method-override(untuk menggunakan http verbs seperti PUT dan DELETE ditempat yang cliennya tidak suport)
app.delete('/kontak' , (req , res) => {
  Contact.deleteOne({tanggal : req.body.tanggal}).then(() => {
          req.flash('mesage', 'data berhasil dihapus')
          res.redirect('/kontak'); 
        })      
});




// ubah data kontak
app.get('/kontak/edit/:tanggal', async (req,res) => {

  const kontak = await Contact.findOne({ tanggal : req.params.tanggal});

  res.render('editkontak', {
    title : 'form tambah data',
    layout : 'layout/main-layout',
    kontak,
  })
})


//proses ubah data
app.put('/kontak', [
  body('tanggal').custom( async (value, { req }) => {
    const duplikat = await Contact.findOne({tanggal : value});
    // if(value !== req.body.oldname && duplikat) {
    //   throw new Error('tanggal sudah digunakan')
    // } 
    // return true;
  }),
 check('status', 'status tidak valid').isBoolean(), 
//  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')

],(req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('editkontak', {
      title : 'form ubah data',
      layout : 'layout/main-layout',
      errors : errors.array(),
      kontak : req.body
    })
  }else{
  Contact.updateOne(
    {_id : req.body._id},
    {
      $set: {
      tanggal : req.body.tanggal,
      materi : req.body.materi,
      jenis : req.body.jenis,
      status : req.body.status
    }}
    ).then(() => {
      req.flash('mesage', 'data berhasil diubah')
      res.redirect('/kontak'); 
    })
  }
})




  // tombol aksi detail
app.get('/kontak/:tanggal', async (req,res) => {
    // cara mendapatkan data kontak satu orang
    const kontaks = await Contact.findOne({tanggal : req.params.tanggal})

    res.render('detail', { nama : 'alfin' , title : 'details kontak',
    layout : 'layout/main-layout',
    kontaks
  })
  })


  app.use('/add', (req,res) => {
    res.render('add' , {
      title : 'form tambah data',
      layout : 'layout/main-layout'
    })
  })



import { jdl } from './public/js/add.js';

  // Skema untuk menambahkan database
const itemSchema = new mongoose.Schema({
  nama: String,
  deskripsi: String,
});

const Item = mongoose.model('Item', itemSchema);

app.use(express.urlencoded({ extended: true }));

// Rute untuk menambahkan item
app.post('/add/tambah-item', (req, res) => {
  const { nama, deskripsi } = req.body;

  const newItem = new Item({
    nama: nama,
    deskripsi: deskripsi,
  });

  newItem.save((err) => {
    if (err) {
      res.status(500).send('Gagal menambahkan item ke database.');
    } else {
      res.status(200).send('Item berhasil ditambahkan ke database.');
    }
  });
});






  app.use('/close', (req,res) => {
    res.render('index' , {
      title : 'form tambah data',
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