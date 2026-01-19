const modal = document.getElementById('checkoutModal');
const prodSpan = document.getElementById('modal-prod');
const priceSpan = document.getElementById('modal-price');
const emailInput = document.getElementById('userEmail');

// Fungsi Buka Modal Checkout
function openCheckout(name, price) {
    prodSpan.textContent = name;
    priceSpan.textContent = price;
    emailInput.value = ''; 
    modal.classList.add('active');
}

// Fungsi Tutup Modal
function closeModal() {
    modal.classList.remove('active');
}

// Event Listener: Tutup modal jika klik di luar area (background gelap)
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Fungsi Kirim ke WhatsApp
function sendToWhatsApp() {
    const email = emailInput.value;
    const product = prodSpan.textContent;
    const price = priceSpan.textContent;

    // Validasi sederhana: Pastikan email diisi
    if (!email) {
        alert("Mohon isi email Anda terlebih dahulu agar Key bisa dikirim.");
        emailInput.focus();
        return;
    }

    const phoneNumber = "6287725677229";
    
    // Format Pesan
    const message = `Permisi ini bukti tf nya.

Nama Produk: ${product}
Harga: Rp ${price}
Email Penerima Key: ${email}

Mohon dikirimkan key setelah verifikasi.`;

    // Encode pesan agar aman untuk URL
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    try {
        window.open(waUrl, '_blank');
    } catch (error) {
        console.error("Gagal membuka WA:", error);
        alert("Jendela WhatsApp tidak terbuka otomatis. Silakan klik link ini:\n" + waUrl);
    }
    
    // Opsional: Tutup modal setelah delay singkat
    setTimeout(() => {
        closeModal();
    }, 500);
}