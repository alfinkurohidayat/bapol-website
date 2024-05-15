// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mousemove", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


//  // Daftar gambar yang akan digunakan
//  const images = ["img/donut.jpg", "img/dp.jpg", "img/dp1.jpg"];
//  let currentIndex = 0; // Indeks gambar saat ini

//  function changeImage() {
//      // Ganti gambar dengan gambar berikutnya dalam daftar
//      currentIndex = (currentIndex + 1) % images.length;
//      document.querySelector(".slide_img").src = images[currentIndex];
//  }

//  // Panggil fungsi changeImage setiap beberapa detik (misalnya setiap 5 detik)
//  setInterval(changeImage, 5000); // Ganti gambar setiap 5 detik










 // Function to get the current time in Indonesia (GMT+7)
function getCurrentTimeInIndonesia() {
  const now = new Date();
  const utcOffset = 7; // UTC+7 for Indonesia (Western Indonesian Time)

  const localTime = now.getTime();
  const localOffset = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds

  const utc = localTime + localOffset;
  const offsetTime = utc + (3600000 * utcOffset); // Convert hours to milliseconds

  return new Date(offsetTime);
}

// Target date for the discount (in milliseconds)
const discountEndTime = new Date('2024-05-24T00:00:00').getTime();

// Update the countdown every second
const countdownTimer = setInterval(() => {
  const now = getCurrentTimeInIndonesia().getTime();
  const distance = discountEndTime - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById('countdown').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // If the countdown is over, stop the countdown timer
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = 'Discount has ended!';
  }
}, 1000);



// document.getElementById("dropdown-toggle").addEventListener("click", function() {
//   var content = this.nextElementSibling;
//   if (content.style.display === "none") {
//     content.style.display = "table-row";
//   } else {
//     content.style.display = "none";
//   }
// });




  const d = new Date();
  const hour = d.getHours();

  let greeting = "";

  if (hour >= 0 && hour < 12) {
      greeting = "Good Morning";
  } else if (hour >= 12 && hour < 15) {
      greeting = "Good Afternoon";
  } else if (hour >= 15 && hour < 18) {
      greeting = "Good Afternoon";
  } else {
      greeting = "Good Evening";
  }

  document.querySelector(".say").textContent = greeting;


// Fungsi untuk memicu dialog pemilihan file saat tombol di klik
function changeImage() {
  document.getElementById('uploadInput').click();
}

// Fungsi untuk mengunggah gambar yang dipilih oleh pengguna
function uploadImage(event) {
  const file = event.target.files[0]; // Dapatkan file gambar dari event
  const formData = new FormData(); // Buat objek FormData untuk menyimpan data gambar

  formData.append('image', file); // Tambahkan file gambar ke FormData dengan kunci 'image'

  // Kirim data gambar ke server menggunakan fetch API
  fetch('/upload/image', {
      method: 'POST', // Kirim metode POST ke endpoint '/upload/image'
      body: formData // Kirim data FormData sebagai body permintaan
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to upload image');
      }
      return response.json(); // Parse respons sebagai JSON
  })
  .then(data => {
      // Jika upload berhasil, ubah sumber gambar di browser
      document.getElementById('mainImage').src = data.imageUrl;
  })
  .catch(error => {
      console.error('Error uploading image:', error);
  });
}


document.addEventListener('DOMContentLoaded', () => {
    const submenuToggle = document.querySelector('.submenu-toggle a');
    submenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = submenuToggle.nextElementSibling;
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
});


