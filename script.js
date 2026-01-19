// GANTI NOMOR WHATSAPP ADMIN DI SINI
const ADMIN_WA = "6285119252063"; 

function openCheckout(productName, price) {
    document.getElementById('modal-prod').innerText = productName;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('checkoutModal').classList.add('active');
    
    // LOCK BACKGROUND SCROLL
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.getElementById('checkoutModal').classList.remove('active');
    
    // UNLOCK BACKGROUND SCROLL
    document.body.classList.remove('modal-open');
}

// Close modal when clicking outside the modal content
document.getElementById('checkoutModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

function sendToWhatsApp() {
    const product = document.getElementById('modal-prod').innerText;
    const price = document.getElementById('modal-price').innerText;
    const email = document.getElementById('userEmail').value;

    if (!email) {
        alert("Mohon masukkan nomor penerima key terlebih dahulu.");
        return;
    }

    const text = `Halo Admin NexussStoree, saya ingin membeli script *${product}* seharga Rp ${price}.%0A%0A` +
                 `📧 Nomor Penerima Key: ${email}%0A` +
                 `💰 Bukti Transfer: (Saya lampirkan setelah pesan ini)`;

    const url = `https://wa.me/${ADMIN_WA}?text=${text}`;
    
    window.open(url, '_blank');
}
