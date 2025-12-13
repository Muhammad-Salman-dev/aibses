// File: frontend/js/auth.js

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. LOGIN LOGIC
    // ============================
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Inputs Values uthao
            const role = document.getElementById('userRole').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Default Password for Prototype
            const defaultPass = "123456";

            // --- VALIDATION LOGIC ---

            // 1. Check if fields are empty
            if (!role || !email || !password) {
                alert("Please fill all fields!");
                return;
            }

            // 2. Check Password
            if (password !== defaultPass) {
                alert("Wrong Password! (Hint: Try '123456' for prototype)");
                return;
            }

            // 3. Role Based Login Check
            if (role === 'admin') {
                if (email === 'admin@ises.com') {
                    console.log("Login Success: Admin");
                    window.location.href = '../admin/dashboard.html';
                } else {
                    alert("Invalid Admin Email! Try: admin@ises.com");
                }
            }
            else if (role === 'vendor') {
                if (email === 'vendor@ises.com') {
                    console.log("Login Success: Vendor");
                    window.location.href = '../vendor/dashboard.html';
                } else {
                    alert("Invalid Vendor Email! Try: vendor@ises.com");
                }
            }
            else if (role === 'user') {
                // User ke liye hum koi bhi email allow kar dete hain ya specific
                if (email === 'user@ises.com' || email.includes('@')) {
                    console.log("Login Success: User");
                    window.location.href = '../user/dashboard.html';
                } else {
                    alert("Invalid Email Format!");
                }
            }
        });
    }

    // ============================
    // 2. SIGNUP LOGIC (UPDATED & DYNAMIC)
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

                // User input se 'required' hatao, Company input pe lagao
                // (Taaki hidden field ki wajah se form error na de)
                document.getElementById('fullNameInput').removeAttribute('required');
                document.getElementById('companyInput').setAttribute('required', 'true');
            } else {
                // Show User Fields, Hide Vendor Fields
                userFields.classList.remove('hidden');
                vendorFields.classList.add('hidden');

                // Company input se 'required' hatao, User input pe lagao
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
            const email = document.querySelector('input[type="email"]').value; // Email field grab kiya

            // Sahi Name grab karo role ke hisab se
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
    // 3. SOCIAL LOGIN LOGIC (NEW)
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