// File: frontend/js/marketplace.js

// --- 1. PRODUCT DETAILS MODAL ---
function openProductModal(title, price, city) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalCity').innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + city;

    // Uses the global openModal logic from userDashboard.js if available,
    // otherwise manual display style
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// --- 2. FILTER FUNCTION LOGIC ---
function filterProducts() {
    // A. Get Input Values
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityValue = document.getElementById('cityFilter').value;
    const categoryValue = document.getElementById('categoryFilter').value;
    const brandValue = document.getElementById('brandFilter').value;

    // B. Get All Cards
    const cards = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    cards.forEach(card => {
        // Get Data Attributes from Card
        const cardCity = card.getAttribute('data-city');
        const cardCat = card.getAttribute('data-category');
        const cardBrand = card.getAttribute('data-brand');
        const cardTitle = card.querySelector('h3').innerText.toLowerCase();

        // C. Matching Logic
        const matchCity = (cityValue === 'all' || cityValue === cardCity);
        const matchCat = (categoryValue === 'all' || categoryValue === cardCat);
        const matchBrand = (brandValue === 'all' || brandValue === cardBrand);
        const matchSearch = cardTitle.includes(searchInput);

        // D. Show or Hide
        if (matchCity && matchCat && matchBrand && matchSearch) {
            card.style.display = 'block'; // Show
            visibleCount++;
        } else {
            card.style.display = 'none'; // Hide
        }
    });

    // E. Show "No Results" message if grid is empty
    const noResultMsg = document.getElementById('noResults');
    if (noResultMsg) {
        noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
}