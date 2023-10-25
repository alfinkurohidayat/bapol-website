import io from 'socket.io-client'

const socket = io();
        function buy(productName, price) {
          // Kirim permintaan pembelian ke server melalui WebSocket
          socket.emit('buyProduct', { productName, price });
        }
    
    function payWithDebit(productName, price) {
        // Di sini Anda dapat menambahkan logika untuk melakukan pembayaran dengan Debit
        console.log(`Membayar dengan Debit untuk ${productName} seharga Rp ${price}`);
        
        // Menangani respons dari server saat transaksi sukses
        socket.on('transactionSuccess', (message) => {
          alert(message);
        });
      }
    