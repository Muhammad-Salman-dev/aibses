/**
 * Toggles between User and Vendor signup fields based on selection
 */
function toggleSignupFields() {
    const role = document.getElementById('signupRole').value;
    const userFields = document.getElementById('userFields');
    const vendorFields = document.getElementById('vendorFields');

    if (role === 'vendor') {
        userFields.style.display = 'none';
        vendorFields.style.display = 'block';
    } else {
        userFields.style.display = 'block';
        vendorFields.style.display = 'none';
    }
}

/**
 * Handle the response from Google Identity Services
 */
async function handleCredentialResponse(response) {
    try {
        // FIX: URL ko backend ke mutabiq '/api/auth/google' kar diya hai
        const res = await fetch('http://localhost:8080/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data));

            console.log("Google Login Successful!");
            window.location.href = '../user/dashboard.html';
        } else {
            alert("Login Failed: " + (data.message || "Unknown Error"));
        }
    } catch (error) {
        console.error("Auth Error:", error);
        alert("Server connection failed!");
    }
}
/**
 * Initialize Google One Tap/Button
 */
function initGoogleAuth() {
    if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
            client_id: "749408941967-nta3ofbshftjqmd6h4knetc6798c5d46.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            use_fedcm_for_prompt: false
        });
        const googleBtn = document.getElementById('googleBtn');
        if (googleBtn) {
            google.accounts.id.renderButton(googleBtn, { theme: "outline", size: "large" });
        }
    } else {
        setTimeout(initGoogleAuth, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initGoogleAuth();

    // --- Signup Form Handler ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const role = document.getElementById('signupRole').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;

            let finalName = "";
            let finalNtn = "";

            if (role === 'user') {
                finalName = document.getElementById('fullName').value;
                if(!finalName) return alert("Full Name is required");
            } else {
                finalName = document.getElementById('companyName').value;
                finalNtn = document.getElementById('ntn').value;
                if(!finalName) return alert("Company Name is required");
            }

            const userData = {
                fullName: finalName,
                email: email,
                password: password,
                phone: phone,
                roleId: role === 'user' ? 1 : 2,
                ntn: finalNtn
            };

            try {
                const response = await fetch('http://localhost:8080/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                const data = await response.json();
                if (response.ok) {
                    alert("Account Created Successfully!");
                    // Corrected Path: Moving from auth to user folder
                    window.location.href = '../user/dashboard.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert("Server Error. Please try again later.");
            }
        });
    }

    // --- Login Form Handler ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://localhost:8080/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('user', JSON.stringify(data));
                    // Corrected Path: Navigating to the user folder dashboard
                    window.location.href = '../user/dashboard.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert("Login failed. Verify your connection.");
            }
        });
    }

    // --- Social Button Listeners ---
    const googleBtnElement = document.getElementById('googleBtn');
    if (googleBtnElement) {
        googleBtnElement.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof google !== 'undefined' && google.accounts.id) {
                google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed()) {
                        google.accounts.id.renderButton(googleBtnElement, { size: 'large' });
                    }
                });
            } else {
                alert("Please wait a moment for Google to load.");
            }
        });
    }
});