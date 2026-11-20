// Application State
let isLoggedIn = false;
let currentPage = 'home';

// DOM Elements
const pages = {
    home: document.getElementById('page-home'),
    login: document.getElementById('page-login'),
    about: document.getElementById('page-about'),
    gallery: document.getElementById('page-gallery')
};

const navButtons = {
    home: document.getElementById('nav-home'),
    login: document.getElementById('nav-login'),
    gallery: document.getElementById('nav-gallery'),
    logout: document.getElementById('nav-logout'),
    about: document.getElementById('nav-about')
};

const loginForm = document.getElementById('login-form');
const heroCta = document.getElementById('hero-cta');
const galleryLogout = document.getElementById('gallery-logout');

// Navigation Functions
function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        if (page) page.classList.remove('active');
    });

    // Show selected page
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
    }

    // Update navigation buttons
    Object.values(navButtons).forEach(button => {
        if (button) button.classList.remove('active');
    });

    if (navButtons[pageName]) {
        navButtons[pageName].classList.add('active');
    }

    currentPage = pageName;
}

function updateNavigation() {
    if (isLoggedIn) {
        // Show gallery and logout, hide login
        navButtons.gallery.classList.remove('hidden');
        navButtons.logout.classList.remove('hidden');
        navButtons.login.classList.add('hidden');
    } else {
        // Show login, hide gallery and logout
        navButtons.gallery.classList.add('hidden');
        navButtons.logout.classList.add('hidden');
        navButtons.login.classList.remove('hidden');
    }
}

function login() {
    isLoggedIn = true;
    updateNavigation();
    showPage('gallery');
}

function logout() {
    isLoggedIn = false;
    updateNavigation();
    showPage('home');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation button event listeners
    navButtons.home.addEventListener('click', () => showPage('home'));
    navButtons.login.addEventListener('click', () => showPage('login'));
    navButtons.about.addEventListener('click', () => showPage('about'));
    navButtons.gallery.addEventListener('click', () => {
        if (isLoggedIn) {
            showPage('gallery');
        }
    });
    navButtons.logout.addEventListener('click', logout);

    // Hero CTA button
    heroCta.addEventListener('click', () => showPage('login'));

    // Gallery logout button
    galleryLogout.addEventListener('click', logout);

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validation logic as requested
        if (username === 'admin' && password === '1234') {
            alert('Login Successful');
            login();
            // Clear form
            loginForm.reset();
        } else {
            alert('Invalid Username or Password');
        }
    });

    // Initialize the application
    updateNavigation();
    showPage('home');
});

// Prevent access to gallery without login
function checkAccess(pageName) {
    if (pageName === 'gallery' && !isLoggedIn) {
        showPage('home');
        return false;
    }
    return true;
}

// Enhanced navigation with access control
function navigateTo(pageName) {
    if (checkAccess(pageName)) {
        showPage(pageName);
    }
}

// Handle browser back/forward buttons (optional enhancement)
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        navigateTo(e.state.page);
    }
});

// Add some visual feedback for image loading
// Fade-in images after they load
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.classList.remove('loaded'); // make sure it hides on refresh

        if (img.complete) {
            setTimeout(() => img.classList.add('loaded'), 100); 
        } else {
            img.addEventListener('load', function() {
                setTimeout(() => img.classList.add('loaded'), 100);
            });
        }
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});