import fs from 'fs';

// memebuat folder data jika tidak ada
const dirpath = './data';
if(!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath);
};

// membuat file kontak.json jika belum ada
const datapath = './data/produk.json';
if(!fs.existsSync(datapath)) {
    fs.writeFileSync(datapath, '[]' , 'utf-8');
}

// mengambil semua data
export const Produk = () => {
    const filebuffer = fs.readFileSync('data/produk.json', 'utf-8');
    const pro = JSON.parse(filebuffer);
    return pro;
}
