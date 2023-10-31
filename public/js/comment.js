function addComment(event) {
    event.preventDefault(); // Mencegah pengiriman form default

    // Mengambil nilai dari form
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Buat elemen untuk menampilkan komentar yang ditambahkan
    const commentContainer = document.createElement('div');
    const commentText = document.createElement('p');
    commentText.innerHTML = `<strong>${name}</strong>: ${comment}`;
    commentContainer.appendChild(commentText);

    // Tambahkan komentar ke bagian komentar
    const commentsSection = document.getElementById('commentsSection');
    commentsSection.appendChild(commentContainer);

    // Reset form setelah menambah komentar
    document.getElementById('commentForm').reset();
}