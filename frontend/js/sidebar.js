document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById("sidebar");

    if (sidebarContainer) {
        const pathPrefix = window.location.pathname.includes("/pages/") ? "../../" : "";
        const userPrefix = window.location.pathname.includes("/market/") ? "../user/" : "";
        const marketPrefix = window.location.pathname.includes("/user/") ? "../market/" : "";

        sidebarContainer.innerHTML = `
            <div class="brand">
                <i class="fa-solid fa-solar-panel" style="color: var(--secondary-color);"></i> ISES
                <i class="fa-solid fa-xmark mobile-close-btn" onclick="toggleSidebar()"></i>
            </div>

            <a href="../user/dashboard.html" class="menu-item" data-page="dashboard.html">
                <i class="fa-solid fa-house"></i> Dashboard
            </a>

            <a href="../user/new-request.html" class="menu-item" data-page="new-request.html">
                <i class="fa-solid fa-circle-plus"></i> New Request
            </a>

            <a href="../user/history.html" class="menu-item" data-page="history.html">
                <i class="fa-solid fa-clock-rotate-left"></i> History
            </a>

            <div class="menu-dropdown">
                <a href="#" class="menu-item" id="projectHubBtn" onclick="toggleSubmenu(event)">
                    <div class="menu-item-content">
                        <i class="fa-solid fa-list-check"></i> <span>Project Hub</span>
                    </div>
                    <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
                </a>
                <div class="submenu" id="vendorSubmenu">
                    <a href="../user/quotes.html" class="submenu-item" data-page="quotes.html">
                        <i class="fa-solid fa-file-invoice-dollar"></i> View Quotes
                    </a>
                    <a href="../user/quote-status.html" class="submenu-item" data-page="quote-status.html">
                        <i class="fa-solid fa-hourglass-half"></i> Quote Status
                    </a>
                    <a href="../user/payments.html" class="submenu-item" data-page="payments.html">
                        <i class="fa-solid fa-credit-card"></i> Payments
                    </a>
                </div>
            </div>

            <a href="../market/analysis.html" class="menu-item" data-page="analysis.html">
                <i class="fa-solid fa-chart-line"></i> Market Analysis
            </a>

            <a href="../user/marketplace.html" class="menu-item" data-page="marketplace.html">
                <i class="fa-solid fa-shop"></i> Marketplace
            </a>

            <a href="../user/profile.html" class="menu-item" data-page="profile.html">
                <i class="fa-solid fa-user-gear"></i> Profile Settings
            </a>

            <a href="../../index.html" class="menu-item" style="margin-top: auto; color: #ef4444;">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
            </a>
        `;

        const currentPage = window.location.pathname.split("/").pop();
        const activeLink = document.querySelector(
            `.menu-item[data-page="${currentPage}"], .submenu-item[data-page="${currentPage}"]`
        );

        if (activeLink) {
            activeLink.classList.add('active');

            if (activeLink.classList.contains('submenu-item')) {
                document.getElementById('vendorSubmenu').classList.add('open');
                document.getElementById('projectHubBtn').classList.add('active-parent');
            }
        }
    }
});

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleSubmenu(e) {
    e.preventDefault();
    const submenu = document.getElementById('vendorSubmenu');
    const btn = document.getElementById('projectHubBtn');
    submenu.classList.toggle('open');
    btn.classList.toggle('active-parent');
}
