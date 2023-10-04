import mongoose from 'mongoose';

//membuat schema dan di export ke app.js
const Uang = mongoose.model('Uang', {
    tgl : {
        type : String,
        require : true
    },
    masuk : {
        type : String,
        required : true,
    },
    keluar : {
        type : String,
        required : true,
    },
    keperluan : {
        type : String,
        required : true,
    }
})

export default Uang;