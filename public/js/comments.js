// Fungsi untuk menampilkan komentar yang tersimpan di sessionStorage saat halaman dimuat
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
    
        // Menyimpan komentar ke sessionStorage
        simpanKomentar(nama, email, waktu, komentar);

        // Reset input setelah menambah komentar
        document.getElementById('nama').value = '';
        document.getElementById('email').value = '';
        document.getElementById('text').value = '';
    } else {
        alert("Silakan isi nama, email, dan komentar.");
    }
}

// Fungsi untuk menyimpan komentar ke sessionStorage
function simpanKomentar(nama, email, waktu, komentar) {
    var komentarSebelumnya = sessionStorage.getItem('komentarData');
    var komentarBaru = "";

    if (komentarSebelumnya) {
        komentarBaru = komentarSebelumnya + "<br>" + "<div class='inline'>" + "<h3>" + nama + "</h3 " + "<br>" + email  + "</div>" +  "<p>" + komentar + "</p>" + "<br>";
    } else {
        komentarBaru = "<div class='inline'>" + "<h3>" + nama + "</h3 " + "<br>" + email  + "</div>" +  "<p>" + komentar + "</p>" + "<br>";
    }

    sessionStorage.setItem('komentarData', komentarBaru);
}

// Fungsi untuk menampilkan komentar dari sessionStorage
function tampilkanKomentar() {
    var komentarSebelumnya = sessionStorage.getItem('komentarData');
    if (komentarSebelumnya) {
        document.getElementById('komentar-list').innerHTML = komentarSebelumnya;
    }
}
