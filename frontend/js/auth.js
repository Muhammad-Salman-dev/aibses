// File: frontend/js/auth.js

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. LOGIN LOGIC (UPDATED: Auto-Detect Role via Email)
    // ============================
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Inputs Values uthao (Ab Role ki zaroorat nahi)
            const email = document.getElementById('email').value.trim(); // .trim() extra spaces hata deta hai
            const password = document.getElementById('password').value;

            // Default Password for Prototype
            const defaultPass = "123456";

            // --- VALIDATION LOGIC ---

            // 1. Check if fields are empty
            if (!email || !password) {
                alert("Please fill all fields!");
                return;
            }

            // 2. Check Password
            if (password !== defaultPass) {
                alert("Wrong Password! (Hint: Try '123456' for prototype)");
                return;
            }

            // 3. AUTO-REDIRECT BASED ON EMAIL
            // System khud check karega email kaunsi hai aur usi hisab se bhejega

            if (email === 'admin@ises.com') {
                console.log("Login Success: Admin");
                // Redirect to Admin Dashboard
                window.location.href = '../admin/dashboard.html';
            }
            else if (email === 'vendor@ises.com') {
                console.log("Login Success: Vendor");
                // Redirect to Vendor Dashboard
                window.location.href = '../vendor/dashboard.html';
            }
            else {
                // Agar Admin ya Vendor nahi hai, toh User hoga
                // Koi bhi doosri email User Dashboard par jayegi
                console.log("Login Success: User");
                window.location.href = '../user/dashboard.html';
            }
        });
    }

    // ============================
    // 2. SIGNUP LOGIC (SAME AS BEFORE)
    // ============================
    const signupForm = document.getElementById('signupForm');
    const roleSelect = document.getElementById('signupRole');
    const userFields = document.getElementById('userFields');
    const vendorFields = document.getElementById('vendorFields');

    // A. Dynamic Fields Handler (Dropdown Change Event)
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            if (this.value === 'vendor') {
                // Show Vendor Fields, Hide User Fields
                userFields.classList.add('hidden');
                vendorFields.classList.remove('hidden');

                document.getElementById('fullNameInput').removeAttribute('required');
                document.getElementById('companyInput').setAttribute('required', 'true');
            } else {
                // Show User Fields, Hide Vendor Fields
                userFields.classList.remove('hidden');
                vendorFields.classList.add('hidden');

                document.getElementById('fullNameInput').setAttribute('required', 'true');
                document.getElementById('companyInput').removeAttribute('required');
            }
        });
    }

    // B. Form Submission Logic
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const role = roleSelect.value;
            const email = document.querySelector('input[type="email"]').value;

            let name;
            if (role === 'user') {
                name = document.getElementById('fullNameInput').value;
            } else {
                name = document.getElementById('companyInput').value;
            }

            if(name && email) {
                alert(`Account Created for ${role.toUpperCase()}: ${name}! \nPlease Login with your email.`);
                window.location.href = 'login.html';
            } else {
                alert("Please fill all visible details.");
            }
        });
    }

    // ============================
    // 3. SOCIAL LOGIN LOGIC
    // ============================
    const socialBtns = document.querySelectorAll('.btn-social');
    if (socialBtns) {
        socialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alert("Social Login is currently in development mode.");
            });
        });
    }
});