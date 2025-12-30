// File: frontend/js/marketplace.js

// --- 1. PRODUCT DETAILS MODAL ---
function openProductModal(title, price, city) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalCity').innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + city;

    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// --- 2. FILTER FUNCTION LOGIC ---
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityValue = document.getElementById('cityFilter').value;
    const categoryValue = document.getElementById('categoryFilter').value;
    const brandValue = document.getElementById('brandFilter').value;

    const cards = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cardCity = card.getAttribute('data-city');
        const cardCat = card.getAttribute('data-category');
        const cardBrand = card.getAttribute('data-brand');
        const cardTitle = card.querySelector('h3').innerText.toLowerCase();

        const matchCity = (cityValue === 'all' || cityValue === cardCity);
        const matchCat = (categoryValue === 'all' || categoryValue === cardCat);
        const matchBrand = (brandValue === 'all' || brandValue === cardBrand);
        const matchSearch = cardTitle.includes(searchInput);

        if (matchCity && matchCat && matchBrand && matchSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const noResultMsg = document.getElementById('noResults');
    if (noResultMsg) {
        noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
}
