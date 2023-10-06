import mongoose from 'mongoose';

//membuat schema dan di export ke app.js
const Contact = mongoose.model('Contact', {
    tanggal : {
        type : String,
        required : true,
    },
    materi : {
        type : String,
        required : true,
    },
    jenis : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
    }
})

export default Contact;