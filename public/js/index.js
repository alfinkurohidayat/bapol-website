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


 // Daftar gambar yang akan digunakan
 const images = ["img/donut.jpg", "img/dp.jpg", "img/dp1.jpg"];
 let currentIndex = 0; // Indeks gambar saat ini

 function changeImage() {
     // Ganti gambar dengan gambar berikutnya dalam daftar
     currentIndex = (currentIndex + 1) % images.length;
     document.querySelector(".slide_img").src = images[currentIndex];
 }

 // Panggil fungsi changeImage setiap beberapa detik (misalnya setiap 5 detik)
 setInterval(changeImage, 5000); // Ganti gambar setiap 5 detik