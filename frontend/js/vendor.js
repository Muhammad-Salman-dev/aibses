document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================
    // 1. GLOBAL: SIDEBAR TOGGLE FUNCTIONALITY
    // =================================================
    const menuBtn = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle Function
    function toggleSidebarLocal() {
        if(sidebar) sidebar.classList.toggle('active');
        if(mainContent) mainContent.classList.toggle('sidebar-active');
    }

    // Event Listener
    if(menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebarLocal();
        });
    }

    // Expose to window for HTML onclick attributes
    window.toggleSidebar = toggleSidebarLocal;


    // =================================================
    // 2. PAGE: NEW LEADS (leads.html)
    // =================================================
    const filterBtn = document.getElementById('filterBtn'); // Leads page ka button

    if (filterBtn) {
        filterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const searchText = document.getElementById('searchInput').value.toLowerCase().trim();
            const selectedCity = document.getElementById('citySelect').value.toLowerCase();
            const selectedSize = document.getElementById('sizeSelect').value; 
            const tableRows = document.querySelectorAll('#leadsTable tbody tr');

            tableRows.forEach(row => {
                const idText = row.querySelector('.id-tag')?.innerText.toLowerCase() || "";
                const nameText = row.querySelector('.user-cell span')?.innerText.toLowerCase() || "";
                const locationText = row.querySelector('.location-text')?.innerText.toLowerCase() || "";
                const specText = row.querySelector('.system-spec')?.innerText.toLowerCase() || "";
                
                const sizeMatch = specText.match(/(\d+)/); 
                const systemSize = sizeMatch ? parseInt(sizeMatch[0]) : 0;

                const matchesSearch = (idText.includes(searchText) || locationText.includes(searchText) || nameText.includes(searchText));
                const matchesCity = (selectedCity === 'all') || locationText.includes(selectedCity);
                let matchesSize = false;

                if (selectedSize === 'all') matchesSize = true;
                else if (selectedSize === '3-5') matchesSize = (systemSize >= 3 && systemSize <= 5);
                else if (selectedSize === '6-10') matchesSize = (systemSize >= 6 && systemSize <= 10);
                else if (selectedSize === '10+') matchesSize = (systemSize >= 10);

                row.style.display = (matchesSearch && matchesCity && matchesSize) ? '' : 'none';
            });
        });
    }


    // =================================================
    // 3. PAGE: MY QUOTATIONS (quotes.html)
    // =================================================
    const quoteStatusSelect = document.querySelector('.status-select');
    const quoteSearchInput = document.querySelector('.search-box input');
    
    // Sirf tab chalay jab hum Quotes page par hon
    if (quoteStatusSelect && quoteSearchInput) {

        function filterQuotes() {
            const statusValue = quoteStatusSelect.value.toLowerCase(); // selected status
            const searchValue = quoteSearchInput.value.toLowerCase().trim(); // search text
            const quoteRows = document.querySelectorAll('.custom-table tbody tr');

            quoteRows.forEach(row => {
                // Data nikalna
                const clientName = row.querySelector('.user-name')?.innerText.toLowerCase() || "";
                const quoteId = row.querySelector('.text-secondary')?.innerText.toLowerCase() || ""; // ID
                const rowStatusBadge = row.querySelector('.badge');
                const rowStatusText = rowStatusBadge ? rowStatusBadge.innerText.toLowerCase() : "";

                // 1. Search Logic
                const matchesSearch = clientName.includes(searchValue) || quoteId.includes(searchValue);

                // 2. Status Logic
                // Agar 'all' select hai TO sab dikhao, WRNA exact match dhoondo
                const matchesStatus = (statusValue === 'all') || (rowStatusText === statusValue);

                // Show/Hide
                if (matchesSearch && matchesStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Events listeners (Jab user dropdown change kare ya type kare)
        quoteStatusSelect.addEventListener('change', filterQuotes);
        quoteSearchInput.addEventListener('keyup', filterQuotes);
    }

});