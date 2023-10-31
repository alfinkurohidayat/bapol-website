document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function(event) {
        event.preventDefault(); // Menghentikan pengiriman formulir default

        let nama = document.getElementById('nama').value;
        let email = document.getElementById('email').value;
        let text = document.getElementById('text').value;

        // Validasi email atau informasi lain jika diperlukan

        // Kirim data ke server (Anda mungkin memerlukan XMLHttpRequest atau fetch API)
        // Contoh penggunaan fetch:
        fetch('/', {
            method: 'POST',
            body: JSON.stringify({ nama: nama, email: email, text: text }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Manipulasi data jika diperlukan setelah pengiriman formulir
            console.log(data);
        });
    };
});
