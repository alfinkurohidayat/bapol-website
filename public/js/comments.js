// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('form').onsubmit = function(event) {
//         event.preventDefault(); // Menghentikan pengiriman formulir default

//         let nama = document.getElementById('nama').value;
//         let email = document.getElementById('email').value;
//         let text = document.getElementById('text').value;

//         // Validasi email atau informasi lain jika diperlukan

//         // Kirim data ke server (Anda mungkin memerlukan XMLHttpRequest atau fetch API)
//         // Contoh penggunaan fetch:
//         fetch('/', {
//             method: 'POST',
//             body: JSON.stringify({ nama: nama, email: email, text: text }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Manipulasi data jika diperlukan setelah pengiriman formulir
//             console.log(data);
//         });
//     };
// });




 // Fungsi untuk menampilkan komentar yang tersimpan di localStorage saat halaman dimuat
 window.onload = function() {
    tampilkanKomentar();
};

// Fungsi untuk menambah komentar
function tambahKomentar() {
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var komentar = document.getElementById('text').value;

    if (nama && email && komentar) {
        var waktu = new Date().toLocaleString();
        var komentarBaru = "<div class='inline'>" + "<h3>" + nama + "</h3 " + "<br>" + email  + "</div>" +  "<p>" + komentar + "</p>" + "<br>";
        

        // Menambah komentar baru ke div komentar-list
        document.getElementById('komentar-list').innerHTML += komentarBaru;
    
        // Menyimpan komentar ke localStorage
        simpanKomentar(nama, email, waktu, komentar);

        // Reset input setelah menambah komentar
        document.getElementById('nama').value = '';
        document.getElementById('email').value = '';
        document.getElementById('komentar').value = '';
    } else {
        alert("Silakan isi nama, email, dan komentar.");
    }
}

// Fungsi untuk menyimpan komentar ke localStorage
function simpanKomentar(nama, email, waktu, komentar) {
    var komentarSebelumnya = localStorage.getItem('komentarData');
    var komentarBaru = "";

    if (komentarSebelumnya) {
        komentarBaru = komentarSebelumnya + "<br>" + "<div class='inline'>" + "<h3>" + nama + "</h3 " + "<br>" + email  + "</div>" +  "<p>" + komentar + "</p>" + "<br>";
    } else {
        komentarBaru = "<div class='inline'>" + "<h3>" + nama + "</h3 " + "<br>" + email  + "</div>" +  "<p>" + komentar + "</p>" + "<br>";
    }

    localStorage.setItem('komentarData', komentarBaru);
}

// Fungsi untuk menampilkan komentar dari localStorage
function tampilkanKomentar() {
    var komentarSebelumnya = localStorage.getItem('komentarData');
    if (komentarSebelumnya) {
        document.getElementById('komentar-list').innerHTML = komentarSebelumnya;
    }
}

