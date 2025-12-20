// admin.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("ISES Admin Dashboard Loaded");

    // 1. Sidebar Active State Logic (Simple version)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active from all
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });
});

// 2. Market Rate Update Animation
function updatePrice(inputId) {
    const btn = document.querySelector(`button[onclick="updatePrice('${inputId}')"] i`);

    // Add rotation class for effect
    btn.style.transition = "transform 0.5s ease";
    btn.style.transform = "rotate(360deg)";

    // Simulate API Call
    setTimeout(() => {
        btn.style.transform = "rotate(0deg)";
        alert("Price Updated Locally!");
    }, 500);
}

// 3. Publish Button Logic
function publishRates() {
    const btn = document.querySelector('.btn-full-width');
    const originalText = btn.innerText;

    btn.innerText = "Publishing...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        btn.innerText = "Rates Published ✅";
        btn.style.background = "#059669"; // Darker Green

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ""; // Reset
            btn.style.opacity = "1";
        }, 2000);
    }, 1000);
}

// 4. Tab Switching Logic (Projects Section)
function switchTab(element) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add active class to clicked tab
    element.classList.add('active');

    // Yahan aap real application mein content filter karenge
    console.log("Switched to tab:", element.innerText);
}


function openModal(imageSrc) {
    const modal = document.getElementById('docModal');
    if(modal) {
        modal.style.display = 'flex';
        // In real app, set image src dynamically
        // document.querySelector('.doc-preview').src = imageSrc;
    }
}

function closeModal() {
    const modal = document.getElementById('docModal');
    if(modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('docModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// ADMIN TOOGLE
function toggleDropdown(element) {
        // Arrow ko rotate karo
        const arrow = element.querySelector('.arrow-icon');
        arrow.classList.toggle('rotate');

        // Submenu ko show/hide karo
        const submenu = element.nextElementSibling;
        submenu.classList.toggle('open');

        // Active class toggle button par bhi lagao (optional styling ke liye)
        element.classList.toggle('active');
    }