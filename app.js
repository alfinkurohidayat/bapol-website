import express from 'express';
import expressLayouts from 'express-ejs-layouts'; // untuk layout yang lebih mudah
import Contact from './model/contacts.js';
import Uang from './model/uang.js';
import session from 'express-session'; //melakukan session pada flash massage
import cookieParser from 'cookie-parser'; //melakukan cookie pada flash message
import flash from 'connect-flash'; //modul untuk melakukan flash connect
import {body, validationResult, check} from "express-validator"; //modul validasi
import  methodOverride  from 'method-override'; //delete

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
      title : 'form tambah data',
      layout : 'layout/main-layout'
    })
  })


//halaman layanan
app.get('/layanan', async (req,res) => {
  const uang = await Uang.find();

    res.render('layanan', { nama : 'alfin' , title : 'layanan',
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

//menangani jika error
  app.use('/', (req,res) => {
    res.render('index', {
      title : 'form tambah data',
      layout : 'layout/main-layout'
    })
  })


app.listen(port, () => {
    console.log(`mongo di localhost ${port}`)
})