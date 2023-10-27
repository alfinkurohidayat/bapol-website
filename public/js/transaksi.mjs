 // Fungsi untuk membuka WhatsApp
 function openWhatsApp() {
  const msg1 = document.querySelector('.numbers').textContent;
  const msg2 = document.querySelector('.cardName').textContent;
  const msg3 = document.querySelector('h1').textContent;
  // Ganti nomor WA dan pesan sesuai dengan yang Anda inginkan
  var phoneNumber = "6282175577847"; // Ganti dengan nomor WA yang ingin Anda tuju
  var message = `Halo, saya ingin memesan ${msg3} ukuran ${msg1} dengan harga ${msg2}.`;

  // URL WA dengan nomor dan pesan
  var waURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Buka WhatsApp di jendela baru
  window.open(waURL);
}

// Fungsi untuk membuka Instagram
function openInstagram() {
  // Ganti dengan username Instagram yang ingin Anda tuju
  var instagramUsername = "bapol.id"; // Ganti dengan username Instagram yang ingin Anda tuju

  // URL profil Instagram
  var instagramURL = `https://www.instagram.com/${instagramUsername}`;

  // Buka profil Instagram di jendela baru
  window.open(instagramURL);
}