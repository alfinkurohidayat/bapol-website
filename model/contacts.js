import mongoose from 'mongoose';

//membuat schema dan di export ke app.js
const Contact = mongoose.model('Contact', {
    nama : {
        type : String,
        required : true,
    },
    nohp : {
        type : String,
        required : true,
    },
    email : {
        type : String,
    }
})

export default Contact;