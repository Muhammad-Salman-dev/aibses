document.addEventListener('DOMContentLoaded', function() {

    // =================================================
    // 1. GLOBAL: SIDEBAR TOGGLE
    // =================================================
    const menuBtn = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    function handleSidebarToggle(e) {
        if(e) e.stopPropagation();
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    }

    if(menuBtn) {
        menuBtn.addEventListener('click', handleSidebarToggle);
    }

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
            }
        }
    });

    // =================================================
    // 2. PAGE: PROFILE SETTINGS (Tab Switching Logic)
    // =================================================
    window.openTab = function(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active-content");
        }

        tablinks = document.getElementsByClassName("tab-link");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = "block";
            targetTab.classList.add("active-content");
        }
        if (evt) evt.currentTarget.className += " active";
    };

    // Initialize default tab if on profile page
    if (document.querySelector('.setting-tabs')) {
        const firstTab = document.querySelector('.tab-link');
        // Optional: uncomment if you want to force click the first tab on load
        // if(firstTab) firstTab.click();
    }


    // =================================================
    // 3. PAGE: NEW LEADS (Apply Filters & Click Handling)
    // =================================================
    if (window.location.pathname.includes('leads.html')) {
        const filterBtn = document.getElementById('filterBtn');
        const searchInput = document.getElementById('searchInput');

        function applyLeadsFilters() {
            const searchText = searchInput.value.toLowerCase().trim();
            const selectedCity = document.getElementById('citySelect').value.toLowerCase();
            const selectedSize = document.getElementById('sizeSelect').value;
            const tableRows = document.querySelectorAll('#leadsTable tbody tr');

            tableRows.forEach(row => {
                const idText = row.querySelector('.id-tag')?.innerText.toLowerCase() || "";
                const nameText = row.querySelector('.user-cell div span')?.innerText.toLowerCase() || "";
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
        }

        if (filterBtn) filterBtn.addEventListener('click', function(e) { e.preventDefault(); applyLeadsFilters(); });
        if (searchInput) searchInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); applyLeadsFilters(); }});

        const bidButtons = document.querySelectorAll('.btn-bid-primary');
        bidButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const leadID = row.querySelector('.id-tag').innerText;
                const name = row.querySelector('.user-cell span').innerText;
                const location = row.querySelector('.location-text').innerText;
                const system = row.querySelector('.system-spec').innerText;

                const targetUrl = `bid-submission.html?id=${encodeURIComponent(leadID)}&name=${encodeURIComponent(name)}&loc=${encodeURIComponent(location)}&sys=${encodeURIComponent(system)}`;
                window.location.href = targetUrl;
            });
        });
    }

    // =================================================
    // 4. PAGE: BID SUBMISSION (Read Data from URL)
    // =================================================
    if (window.location.pathname.includes('bid-submission.html')) {
        const params = new URLSearchParams(window.location.search);
        const leadID = params.get('id');
        const name = params.get('name');
        const location = params.get('loc');
        const system = params.get('sys');

        if(leadID) {
            if(document.getElementById('page-header-id')) document.getElementById('page-header-id').innerText = `Bidding for ${leadID}`;
            if(document.getElementById('detail-id')) document.getElementById('detail-id').innerText = leadID;
            if(document.getElementById('detail-name')) document.getElementById('detail-name').innerText = name;
            if(document.getElementById('detail-location')) document.getElementById('detail-location').innerText = location;
            if(document.getElementById('detail-system')) document.getElementById('detail-system').innerText = system;
        }

        const bidForm = document.getElementById('bidForm');
        if(bidForm) {
            bidForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert("Success! Your bid has been sent to the customer.");
                window.location.href = "leads.html";
            });
        }
    }

    // =================================================
    // 5. PAGE: VERIFICATION STATUS (Show/Hide States)
    // =================================================
    // Only runs if showState is called
    window.showState = function(state) {
        // Get the containers based on your HTML IDs
        const pendingView = document.getElementById('view-pending');
        const rejectedView = document.getElementById('view-rejected');
        const approvedView = document.getElementById('view-approved');

        // Check if elements exist (to avoid errors on other pages)
        if (!pendingView || !rejectedView || !approvedView) return;

        // Hide all views first
        pendingView.style.display = 'none';
        rejectedView.style.display = 'none';
        approvedView.style.display = 'none';

        // Show the one requested
        if (state === 'pending') {
            pendingView.style.display = 'block';
        } else if (state === 'rejected') {
            rejectedView.style.display = 'block';
        } else if (state === 'approved') {
            approvedView.style.display = 'block';
        }
    };

});