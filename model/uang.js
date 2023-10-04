import mongoose from 'mongoose';

//membuat schema dan di export ke app.js
const Uang = mongoose.model('Uang', {
    tanggal : {
        type : String,
        required : true,
    },
    materi : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
    }
})

export default Uang;