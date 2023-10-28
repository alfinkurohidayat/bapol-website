import fs from 'fs';

// memebuat folder data jika tidak ada
const dirpath = './data';
if(!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath);
};

// membuat file kontak.json jika belum ada
const datapath = './data/data.json';
if(!fs.existsSync(datapath)) {
    fs.writeFileSync(datapath, '[]' , 'utf-8');
}

// mengambil semua data
export const loadData = () => {
    const filebuffer = fs.readFileSync('data/data.json', 'utf-8');
    const kontaks = JSON.parse(filebuffer);
    return kontaks;
}
