import mongoose from 'mongoose';

// mengkoneksikan
export const db = mongoose.connect('mongodb://127.0.0.1:27017/alfin',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});



// // menambah 1 data
// const contact1 = new Contact({
//     nama : 'putri',
//     nohp : '082175577847',
//     email : 'alfin@gmail.com',
// })

// // simpan ke collection
// contact1.save().then((contact) => console.log(contact))