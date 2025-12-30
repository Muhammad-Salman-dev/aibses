// ============================
// 1. SIDEBAR TOGGLE (Mobile)
// ============================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if(sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// ============================
// 2. LOGOUT LOGIC
// ============================
function logout() {
    if(confirm("Are you sure you want to logout?")) {
        window.location.href = '../../index.html';
    }
}

// ============================
// 3. AUTO CLOSE MENU ON RESIZE
// ============================
window.addEventListener('resize', function() {
    if(window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
    }
});

// --- TOGGLE VENDOR DROPDOWN ---
function toggleVendorMenu(event) {
    event.preventDefault();

    const submenu = document.getElementById('vendorSubmenu');
    const parentLink = event.currentTarget;

    submenu.classList.toggle('open');
    parentLink.classList.toggle('active-parent');
}

// --- MODAL FUNCTIONS ---
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal if clicked outside box
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// --- PAYMENT MODAL LOGIC ---
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function selectMethod(element, type) {
    document.querySelectorAll('.method-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    document.getElementById('cardForm').style.display = 'none';
    document.getElementById('bankForm').style.display = 'none';

    if (type === 'card' || type === 'wallet') {
        document.getElementById('cardForm').style.display = 'block';
    } else if (type === 'bank') {
        document.getElementById('bankForm').style.display = 'block';
    }
}

function processPayment() {
    const btn = document.querySelector('#paymentModal .btn-primary');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    setTimeout(() => {
        alert("Payment Successful! Receipt sent to email.");
        closeModal('paymentModal');
        btn.innerHTML = 'Confirm Payment';
    }, 2000);
}

// ============================
// 4. PDF RECEIPT GENERATOR
// ============================
function downloadReceipt(txnId, amount, description) {
    const receiptContent = `
        <html>
        <head>
            <title>Receipt - ${txnId}</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f9f9f9; }
                .receipt-box { max-width: 600px; margin: auto; background: white; padding: 30px; border: 1px solid #ddd; border-radius: 10px; }
                .header { text-align: center; border-bottom: 2px solid #2ecc71; padding-bottom: 20px; margin-bottom: 20px; }
                .brand { font-size: 24px; font-weight: bold; color: #2ecc71; }
                .details { line-height: 1.8; color: #333; }
                .amount-box { background: #eafaf1; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #27ae60; margin: 20px 0; border-radius: 8px; }
                .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="receipt-box">
                <div class="header">
                    <div class="brand">ISES Solar</div>
                    <p>Payment Receipt</p>
                </div>

                <div class="details">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Transaction ID:</strong> ${txnId}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Payment Method:</strong> Bank Transfer / Card</p>
                    <p><strong>Status:</strong> <span style="color:green">Verified & Paid</span></p>
                </div>

                <div class="amount-box">
                    ${amount}
                </div>

                <div class="footer">
                    <p>This is a computer-generated receipt.</p>
                    <p>ISES - Intelligent Sustainable Energy Solution</p>
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(receiptContent);
    printWindow.document.close();
}

// =========================================
// 5. PROFILE PAGE LOGIC (Image Preview & Save)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const profilePreview = document.getElementById('profilePreview');
    const headerProfileImg = document.getElementById('headerProfileImg');
    const profileForm = document.getElementById('profileForm');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');
    const fullNameInput = document.getElementById('fullNameInput');
    const headerUserName = document.getElementById('headerUserName');

    if (imageUpload) {
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if(profilePreview) profilePreview.src = e.target.result;
                    if(headerProfileImg) {
                        headerProfileImg.style.backgroundImage = `url(${e.target.result})`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const originalText = saveBtn.innerText;
            saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            saveBtn.style.opacity = '0.7';
            saveBtn.disabled = true;

            setTimeout(() => {
                alert("Profile Updated Successfully!");

                saveBtn.innerHTML = originalText;
                saveBtn.style.opacity = '1';
                saveBtn.disabled = false;

                if (headerUserName && fullNameInput) {
                    headerUserName.innerText = fullNameInput.value;
                }
            }, 1500);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if(confirm("Discard unsaved changes?")) {
                window.location.reload();
            }
        });
    }
});
