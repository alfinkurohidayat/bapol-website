import fs from 'fs';

// memebuat folder data jika tidak ada
const dirpath = './data';
if(!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath);
};

// membuat file kontak.json jika belum ada
const datapath = './data/comment.json';
if(!fs.existsSync(datapath)) {
    fs.writeFileSync(datapath, '[]' , 'utf-8');
}

// mengambil semua data
export const loadComment = () => {
    const filebuffer = fs.readFileSync('data/comment.json', 'utf-8');
    const kontaks = JSON.parse(filebuffer);
    return kontaks;
}

// cari kontak berdasarkan nama
export const findComment = email => {
    const kontak = loadComment();
    const kontakf = kontak.find(
        (kontak) => kontak.email.toLowerCase() ===email.toLowerCase()
    );
    return kontakf;
 }


//  tambah data
// menuliskan / menimpa file kontak json dengan data baru
const savekontaks = (kontaks) => {
    // contaks akan di ubah ke string dan ditimpa ke kontak.json
    fs.writeFileSync('data/comment.json', JSON.stringify(kontaks));
} 

// untuk menambah kontak baru ke array dan arraynya untuk ditimpa ke atas
export const addComment= (kon) => {
    const kontakd = loadComment();
    // menambahkan object baru yang dikirim
    kontakd.push(kon);
    // data ditimpa savekontak
    savekontaks(kontakd);
}


// check nama duplikat
// nama sebagai value yang diinputkan di form
export const cekComment = (email) => {

    // kontaks merupakan semua data kontak
    const kontaks = loadComment();

    // lalu ditelusuri
    // jika tidak ada nama yg sama berarti aman
    // jika ada nama yang sama berarti nama akan berisi nama yg dikirim ke variabel duplikat di app.js
    return kontaks.find((kontak) => kontak.email == email)

}
