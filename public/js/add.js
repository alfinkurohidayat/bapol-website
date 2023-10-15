const collectionList = document.getElementById('collection-list');

// Menampilkan daftar koleksi saat halaman dimuat
koleksiList.forEach((namaKoleksi) => {
  const listItem = document.createElement('li');
  listItem.textContent = namaKoleksi;
  listItem.addEventListener('click', () => {
    // Saat nama koleksi diklik, ambil dan tampilkan data koleksi tersebut secara real-time
    socket.emit('ambilDataKoleksi', namaKoleksi);
  });
  collectionList.appendChild(listItem);
});