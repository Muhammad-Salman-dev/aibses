/**
 * ISES User Dashboard - Master Script
 * Sections: 1. Initialization, 2. Data Fetching, 3. Sidebar/UI, 4. Modals/Payment, 5. Profile
 */

// ==========================================
// 1. INITIALIZATION (Page Load)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadUserStats();    // Stats fetch karein
    initGlobalUI();     // Sidebar aur Click listeners setup karein
});

// ==========================================
// 2. DATA FETCHING (API Calls)
// ==========================================
async function loadUserStats() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '../auth/login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/user/dashboard-stats', {
            method: 'GET',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            updateUI(data); // Data pass kiya
        } else {
            handleSessionExpiry();
        }
    } catch (error) {
        console.error("Dashboard Stats Fetch Error:", error);
    }
}

function updateUI(data) {
    // 1. Welcome Text Update
    // Backend se data.user.fullName aa raha hai
    const welcomeH1 = document.querySelector('h1');
    const headerName = document.getElementById('headerUserName');
    if (welcomeH1) welcomeH1.innerText = `Welcome back, ${data.user.fullName}!`;
    if (headerName) headerName.innerText = data.user.fullName;

    // 2. Stats Cards Update
    // Backend se data.stats.totalProjects aa raha hai
    const cards = document.querySelectorAll('.card h3');
    if (cards.length >= 3) {
        cards[0].innerText = (data.stats.totalProjects || 0).toString().padStart(2, '0');
        cards[1].innerText = (data.stats.quotesReceived || 0).toString().padStart(2, '0');
        cards[2].innerText = data.stats.potentialPower || "0 kW";
    }

    // 3. Table Data Update (Recent Submissions)
    const tbody = document.querySelector('table tbody');
    if (tbody && data.recentProjects) {
        tbody.innerHTML = ''; // Purana static data saaf karein

        if(data.recentProjects.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No recent projects found. Start a new request!</td></tr>';
            return;
        }

        data.recentProjects.forEach(proj => {
            // Status ka color fix karne ke liye lowercase karna zaroori hai
            const statusClass = proj.status.toLowerCase().replace(' ', '-');

            const row = `
                <tr>
                    <td>${proj.name}</td>
                    <td>${new Date(proj.date).toLocaleDateString()}</td>
                    <td><span class="status ${statusClass}">${proj.status}</span></td>
                    <td><i class="fa-solid fa-check"></i> ${proj.aiOutput}</td>
                    <td>${proj.vendorQuote}</td>
                    <td>
                        <button class="action-btn" onclick="openModal('chatModal')">View</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }
}

function handleSessionExpiry() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../auth/login.html';
}

// ==========================================
// 3. SIDEBAR & GLOBAL UI CONTROLS
// ==========================================
function initGlobalUI() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.querySelector('.menu-toggle'); // Button class se change kiya
    const closeBtn = document.querySelector('.mobile-close-btn');

    // Sidebar Toggle Logic
    const toggleFunc = () => {
        if (sidebar) sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleFunc);
    if (closeBtn) closeBtn.addEventListener('click', toggleFunc);
    if (overlay) overlay.addEventListener('click', toggleFunc);

    // Resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar?.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        handleSessionExpiry();
    }
}

function toggleVendorMenu(event) {
    event.preventDefault();
    const submenu = document.getElementById('vendorSubmenu');
    const parentLink = event.currentTarget;
    if (submenu) submenu.classList.toggle('open');
    if (parentLink) parentLink.classList.toggle('active-parent');
}

// ==========================================
// 4. MODALS & PAYMENT LOGIC (Baqi waisa hi hai)
// ==========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "flex";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

function selectPaymentMethod(element, type) {
    document.querySelectorAll('.method-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    const cardForm = document.getElementById('cardForm');
    const bankForm = document.getElementById('bankForm');

    if (type === 'card' || type === 'wallet') {
        if (cardForm) cardForm.style.display = 'block';
        if (bankForm) bankForm.style.display = 'none';
    } else {
        if (cardForm) cardForm.style.display = 'none';
        if (bankForm) bankForm.style.display = 'block';
    }
}

function processPayment() {
    const btn = document.querySelector('#paymentModal .btn-primary');
    if (!btn) return;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    setTimeout(() => {
        alert("Payment Successful! Receipt sent to email.");
        closeModal('paymentModal');
        btn.innerHTML = 'Confirm Payment';
        btn.disabled = false;
    }, 2000);
}

// ==========================================
// 5. PROFILE & IMAGE MANAGEMENT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const profilePreview = document.getElementById('profilePreview');
    const headerProfileImg = document.getElementById('headerProfileImg');

    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (profilePreview) profilePreview.src = event.target.result;
                    if (headerProfileImg) {
                        headerProfileImg.style.backgroundImage = `url(${event.target.result})`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// ==========================================
// 6. UTILITIES (Receipts, Counts)
// ==========================================
function updateApplianceCount(btn, change) {
    const input = btn.parentElement.querySelector('input');
    let newVal = parseInt(input.value) + change;
    if (newVal < 0) newVal = 0;

    input.value = newVal;
    const card = btn.closest('.appliance-item');
    if (card) {
        newVal > 0 ? card.classList.add('selected') : card.classList.remove('selected');
    }
}

function downloadReceipt(txnId, amount, description) {
    const receiptHTML = `
        <html>
        <head><title>Receipt - ${txnId}</title></head>
        <body style="font-family: sans-serif; padding: 20px;">
            <div style="border: 1px solid #ddd; padding: 20px; border-radius: 10px; max-width: 500px; margin: auto;">
                <h2 style="color: #2ecc71;">ISES Solar - Receipt</h2>
                <hr>
                <p><strong>Transaction ID:</strong> ${txnId}</p>
                <p><strong>Description:</strong> ${description}</p>
                <h3 style="background: #f4f4f4; padding: 10px; text-align: center;">Amount: ${amount}</h3>
                <p style="font-size: 12px; color: #666; text-align: center;">Generated on ${new Date().toLocaleString()}</p>
            </div>
            <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
    `;
    const win = window.open('', '', 'width=600,height=600');
    win.document.write(receiptHTML);
    win.document.close();
}

// ==========================================
// 7. NEW REQUEST FORM LOGIC (Step 1: Data Collection)
// ==========================================

// Handles appliance quantity increment and decrement
window.updateCount = function(btn, change) {
    const input = btn.parentElement.querySelector('input');
    let newVal = parseInt(input.value) + change;

    // Prevent negative values
    if (newVal < 0) newVal = 0;
    input.value = newVal;

    // Highlight appliance card if quantity is greater than zero
    const card = btn.closest('.appliance-item');
    if (card) {
        if (newVal > 0) {
            card.classList.add('selected');
            card.style.borderColor = '#2ecc71';
        } else {
            card.classList.remove('selected');
            card.style.borderColor = '#eee';
        }
    }
};

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const newRequestForm = document.querySelector('.form-container');

    if (newRequestForm) {
        newRequestForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload

            console.log("Collecting form data...");

            // Capture property details
            const locationInput = document.querySelector(
                'input[placeholder="e.g. House 12, DHA Phase 6, Lahore"]'
            ).value;

            const selects = document.querySelectorAll('.form-select');

            const propertyDetails = {
                location: locationInput,
                direction: selects[0]?.value || '',
                floors: selects[1]?.value || '',
                roofType: selects[2]?.value || ''
            };

            // Validate required field
            if (!propertyDetails.location) {
                alert("Please provide the property location/address.");
                return;
            }

            // Capture selected appliances
            const appliancesList = [];
            const applianceItems = document.querySelectorAll('.appliance-item');

            applianceItems.forEach(item => {
                const name = item.querySelector('h4').innerText;
                const count = parseInt(item.querySelector('input').value);

                if (count > 0) {
                    appliancesList.push({
                        appliance: name,
                        quantity: count
                    });
                }
            });

            // Capture image inputs
            const fileInputs = document.querySelectorAll('input[type="file"]');
            const roofImages = fileInputs[0]?.files || [];
            const surroundImages = fileInputs[1]?.files || [];

            // Prepare collected data object
            const collectedData = {
                propertyInfo: propertyDetails,
                appliancesSelected: appliancesList,
                images: {
                    roofPics: roofImages.length,
                    surroundingPics: surroundImages.length
                }
            };

            console.log("Form data successfully collected:");
            console.log(collectedData);

            alert("Form data has been successfully captured. Please check the console for details.");
        });
    }
});
// ==========================================
// 8. GET CURRENT LOCATION (WhatsApp Style)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationInput = document.getElementById('locationInput');

    if (getLocationBtn && locationInput) {
        getLocationBtn.addEventListener('click', function() {
            // Button ka icon loading spinner mein badal dein
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            // Check karein browser location support karta hai ya nahi
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async function(position) {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        try {
                            // OpenStreetMap API se Coordinates ko Address mein convert karein
                            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                            const data = await response.json();

                            if (data && data.display_name) {
                                locationInput.value = data.display_name; // Asli address input mein daal dein
                            } else {
                                locationInput.value = `Lat: ${lat}, Lon: ${lon}`;
                            }
                        } catch (error) {
                            console.error("Address fetch error:", error);
                            // Agar API masla kare toh sirf coordinates dikha dein
                            locationInput.value = `Lat: ${lat}, Lon: ${lon}`;
                        } finally {
                            // Button ko wapis normal icon par le aayein
                            getLocationBtn.innerHTML = originalIcon;
                        }
                    },
                    function(error) {
                        alert("Location access denied ya phir GPS on nahi hai. Please manually type karein.");
                        getLocationBtn.innerHTML = originalIcon;
                    },
                    { enableHighAccuracy: true } // Accurate location ke liye
                );
            } else {
                alert("Aapka browser Geolocation support nahi karta.");
                this.innerHTML = originalIcon;
            }
        });
    }
});