// GANTI NOMOR WHATSAPP ADMIN DI SINI
const ADMIN_WA = "6285119252063"; 

/* --- CHECKOUT LOGIC --- */
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
        alert("Mohon masukkan email penerima key terlebih dahulu.");
        return;
    }

    const text = `Halo Admin NexussStoree, saya ingin membeli script *${product}* seharga Rp ${price}.%0A%0A` +
                 `📧 Email Penerima Key: ${email}%0A` +
                 `💰 Bukti Transfer: (Saya lampirkan setelah pesan ini)`;

    const url = `https://wa.me/${ADMIN_WA}?text=${text}`;
    
    window.open(url, '_blank');
}

/* --- LIVE COUNTER ANIMATION --- */
const counters = document.querySelectorAll('.counter');
const speed = 200; 

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('K', ''); 
            
            // Hitung increment
            const inc = target / speed;

            // Cek jika target tercapai
            if (count < target) {
                // Format angka (jika desimal atau ribuan)
                if (target % 1 !== 0) {
                    counter.innerText = (count + inc).toFixed(1);
                } else {
                    counter.innerText = Math.ceil(count + inc);
                }
                setTimeout(updateCount, 20);
            } else {
                // Pastikan angka terakhir sesuai target
                if (target % 1 !== 0) {
                    counter.innerText = target.toFixed(1);
                } else {
                    counter.innerText = target;
                    // Tambahkan format ribuan (contoh: 1,542)
                    if(target > 1000) {
                        counter.innerText = target.toLocaleString('en-US');
                    }
                }
            }
        };
        updateCount();
    });
};

/* --- INTERSECTION OBSERVER (Trigger saat di-scroll) --- */
const statsSection = document.querySelector('.stats-container');
let hasAnimated = false; // Mencegah animasi berulang

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true; 
        }
    });
}, { threshold: 0.5 }); 

if (statsSection) {
    observer.observe(statsSection);
}
