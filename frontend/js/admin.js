// admin.js

// Global variables top par declare karein
let currentRow = null; 
let activePriceRow = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("ISES Admin Dashboard Loaded");

    // --- 1. MODAL HTML INJECTION (Taake har page par popup chale) ---
    if (!document.getElementById('actionModal')) {
        const modalHTML = `
            <div id="actionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 9999; justify-content: center; align-items: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; width: 350px; text-align: center; font-family: sans-serif;">
                    <div id="modalIcon" style="font-size: 50px; margin-bottom: 15px;"></div>
                    <h2 id="modalTitle" style="margin: 0 0 10px 0; color: #333;">Confirm</h2>
                    <p id="modalMessage" style="color: #666; margin-bottom: 25px;"></p>
                    <div style="display: flex; gap: 10px;">
                        <button id="confirmBtn" style="flex: 1; padding: 12px; border: none; border-radius: 8px; color: white; cursor: pointer; font-weight: bold;">Confirm</button>
                        <button onclick="document.getElementById('actionModal').style.display='none'" style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: #f8f9fa; cursor: pointer;">Cancel</button>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    // --- USER MANAGEMENT LOGIC ---
document.addEventListener('click', (e) => {
    // 1. Open Details/Profile Popup
    if (e.target.innerText === 'Details' || e.target.innerText === 'Profile') {
        const row = e.target.closest('tr');
        if (row) {
            const name = row.cells[1].innerText;
            
            document.getElementById('infoName').innerText = name;
            document.getElementById('infoAvatar').innerText = name.charAt(0);
            document.getElementById('infoRole').innerText = row.cells[2].innerText;
            document.getElementById('detID').innerText = row.cells[0].innerText;
            document.getElementById('detCity').innerText = row.cells[3].innerText;
            document.getElementById('detStatus').innerText = row.cells[4].innerText;

            document.getElementById('infoModal').style.display = 'flex';
        }
    }

    // 2. Close Popup logic
    if (e.target.id === 'closeInfoModal' || e.target.id === 'infoModal') {
        document.getElementById('infoModal').style.display = 'none';
    }

   // 3. Verify Button (No inline CSS anymore)
    if (e.target.innerText === 'Verify') {
        const row = e.target.closest('tr');
        if (row && typeof openActionPopup === 'function') {
            // Humne color code hata kar sirf class pass kar di
            openActionPopup(
                'Verify User', 
                `Confirm verification for <b>${row.cells[1].innerText}</b>?`, 
                'modal-theme-success', // Yeh CSS class hai
                'fa-user-check'
            );
        }
    }
});
    // --- 2. SIDEBAR LOGIC ---
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 3. VENDOR APPROVAL LOGIC (Vendors Page) ---
    document.querySelectorAll('.btn-icon-sm.success').forEach(btn => {
        btn.addEventListener('click', function() {
            const vendorName = this.closest('tr').querySelector('h5').innerText;
            currentRow = this.closest('tr'); // Row save kar lo delete karne ke liye
            openActionPopup('Approve Vendor', `Are you sure you want to <b>approve</b> <b>${vendorName}</b>?`, '#10b981', 'fa-circle-check');
        });
    });

    document.querySelectorAll('.btn-icon-sm.danger').forEach(btn => {
        btn.addEventListener('click', function() {
            const vendorName = this.closest('tr').querySelector('h5').innerText;
            currentRow = this.closest('tr');
            openActionPopup('Reject Vendor', `Are you sure you want to <b>reject</b> <b>${vendorName}</b>? This action cannot be undone.`, '#ef4444', 'fa-circle-xmark');
        });
    });

    // --- 4. DOCUMENT REVIEW LOGIC (Docs Page) ---
    const verifyDocBtn = document.querySelector('.btn-green');
    const rejectDocBtn = document.querySelector('.btn-danger');

    if(verifyDocBtn) {
        verifyDocBtn.onclick = () => {
            if(currentRow) {
                alert("Document Verified Successfully! ✅");
                currentRow.remove();
                closeModal();
            }
        };
    }

    if(rejectDocBtn) {
        rejectDocBtn.onclick = () => {
            if(currentRow) {
                const reason = prompt("Enter reason for rejection:");
                if(reason) {
                    alert("Document Rejected! ❌ Reason: " + reason);
                    currentRow.remove();
                    closeModal();
                }
            }
        };
    }

    // --- 5. INVENTORY LOGIC (Inventory Page) ---
    const glassTable = document.querySelector('.glass-table');
    if (glassTable) {
        glassTable.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-bg') && e.target.innerText === 'Update Price') {
                activePriceRow = e.target.closest('tr');
                const productName = activePriceRow.querySelector('td strong').innerText;
                document.getElementById('targetProductName').innerText = productName;
                document.getElementById('priceModal').style.display = 'flex';
            }
        });
    }

    const savePriceBtn = document.getElementById('savePriceBtn');
    if (savePriceBtn) {
        savePriceBtn.onclick = () => {
            const newPrice = document.getElementById('newPriceInput').value;
            if (newPrice && activePriceRow) {
                activePriceRow.cells[2].innerText = `Rs. ${parseInt(newPrice).toLocaleString()}`;
                activePriceRow.cells[3].innerText = "Just Now";
                document.getElementById('priceModal').style.display = 'none';
                alert("Price Updated! ✅");
            }
        };
    }

    // Add Product Logic
    const addProductBtn = document.querySelector('.top-bar .btn-sm');
    if (addProductBtn && addProductBtn.innerText.includes("Add Product")) {
        addProductBtn.onclick = () => document.getElementById('addProductModal').style.display = 'flex';
    }

    // --- 6. DISPUTE RESOLUTION LOGIC (Disputes Page) ---
    const resolveBtn = document.getElementById('resolveDisputeBtn');
    const refundBtn = document.getElementById('refundUserBtn');
    const callBtn = document.getElementById('callVendorBtn');

    if (resolveBtn) {
        resolveBtn.onclick = () => openActionPopup('Resolve Dispute', 'Mark <b>Case #PRJ-102</b> as <b>Resolved</b>?', '#10b981', 'fa-circle-check');
    }
    if (refundBtn) {
        refundBtn.onclick = () => openActionPopup('Confirm Refund', 'Are you sure you want to <b>Refund</b> payment to Ali Khan?', '#ef4444', 'fa-hand-holding-dollar');
    }
    if (callBtn) {
        callBtn.onclick = () => openActionPopup('Contact Vendor', 'Connecting to <b>SolarTech Ltd</b> support line...', '#3498db', 'fa-phone-volume');
    }
});

// ==========================================
// GLOBAL HELPER FUNCTIONS 
// ==========================================

// Ye function bahar hona chahiye taake har jagah se call ho sake
function openActionPopup(title, msg, color, icon) {
    const actionModal = document.getElementById('actionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    const confirmBtn = document.getElementById('confirmBtn');

    if (actionModal && modalTitle && modalMessage && modalIcon && confirmBtn) {
        modalTitle.innerText = title;
        modalMessage.innerHTML = msg;
        modalIcon.innerHTML = `<i class="fa-solid ${icon}" style="color: ${color}"></i>`;
        confirmBtn.style.backgroundColor = color;
        
        // Modal dikhao
        actionModal.style.display = 'flex';
        
        // Confirm button par action
        confirmBtn.onclick = () => {
            alert(title + " Processed Successfully! ✅");
            actionModal.style.display = 'none';
            
            // Agar koi row delete karni ho (Vendors page ke liye)
            if (currentRow) {
                currentRow.remove();
                currentRow = null; 
            }
        };
    } else {
        console.error("Action Modal elements not found in HTML!");
    }
}

// Sidebar dropdown logic
function toggleDropdown(element) {
    const arrow = element.querySelector('.arrow-icon');
    if (arrow) arrow.classList.toggle('rotate');
    
    const submenu = element.nextElementSibling;
    if (submenu) submenu.classList.toggle('open');
}

// Document Modal logic (Docs Review page)
function openModal(imageSrc, btnElement) {
    const modal = document.getElementById('docModal');
    if(modal) {
        modal.style.display = 'flex';
        if (btnElement) currentRow = btnElement.closest('tr');
        const preview = document.querySelector('.doc-preview');
        if (preview) preview.src = imageSrc;
    }
}

function closeModal() {
    const modal = document.getElementById('docModal');
    if(modal) modal.style.display = 'none';
}

// Click outside to close modals
window.onclick = function(event) {
    const actionModal = document.getElementById('actionModal');
    const docModal = document.getElementById('docModal');
    if (event.target == actionModal) actionModal.style.display = "none";
    if (event.target == docModal) docModal.style.display = "none";
};
// ==========================================
// FINANCIAL & COMMISSION PAGE LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Export Report - Real CSV Download Logic
   //  (Real Download from Table) ---
const exportBtn = document.getElementById('exportReportBtn');
if (exportBtn) {
    exportBtn.onclick = () => {
        const original = exportBtn.innerHTML;
        // Button par loading spinner dikhayein
        exportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Exporting...';
        
        setTimeout(() => {
            // 1. Table se live data collect karna
            const table = document.querySelector(".finance-table");
            if (!table) {
                alert("Table nahi mili!");
                exportBtn.innerHTML = original;
                return;
            }
            const rows = Array.from(table.querySelectorAll("tr"));
            
            // 2. Data ko CSV string mein badalna
            const csvContent = rows.map(row => {
                const cells = Array.from(row.querySelectorAll("th, td"));
                return cells.map(cell => {
                    let data = cell.innerText.replace(/\s+/g, ' ').trim();
                    return `"${data}"`; 
                }).join(",");
            }).join("\n");

            // 3. Browser mein download trigger karna
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "ISES_Financial_Report_Dec2025.csv");
            document.body.appendChild(link);
            
            link.click(); // File download trigger
            document.body.removeChild(link);
            
            // 4. Success feedback
            alert("Financial Report (CSV) is downloaded!✅");
            exportBtn.innerHTML = original;
        }, 1200);
    };
}

    // 2. Tabs Filtering Logic - Faster & Visible Text fix
    const filterTabs = document.querySelectorAll('.filter-tabs span');
    const tableRows = document.querySelectorAll('.finance-table tbody tr');

    filterTabs.forEach(tab => {
        tab.onclick = function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            tableRows.forEach(row => {
                // Badge ke text se filter pakadta hai
                const status = row.querySelector('.badge').innerText.toLowerCase().trim();
                if (filter === 'all' || (filter === 'paid' && status === 'paid') || (filter === 'pending' && status === 'pending')) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        };
    });

    // 3. Finance Cards Interaction - Fast Response
    const finCards = document.querySelectorAll('.finance-card');
    finCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transition = '0.2s');
        card.onclick = function() {
            finCards.forEach(c => c.classList.remove('active-card'));
            this.classList.add('active-card');
            
            // Sync with Table Filters
            const type = this.id;
            if (type === 'card-pending') {
                document.querySelector('[data-filter="pending"]').click();
            } else if (type === 'card-commission' || type === 'card-value') {
                document.querySelector('[data-filter="paid"]').click();
            }
        };
    });
});
