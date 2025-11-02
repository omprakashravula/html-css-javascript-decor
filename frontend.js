// Save this as frontend.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Logic for Phone Number (Your Existing Code) ---
    const phoneElement = document.getElementById('phone-reveal');

    // Check if the phone element exists on this page
    if (phoneElement) {
        const phoneNumber = '+91 9515655756';

        phoneElement.addEventListener('click', function() {
            phoneElement.textContent = phoneNumber;
            phoneElement.style.cursor = 'default';
            phoneElement.style.textDecoration = 'none';
            phoneElement.style.color = 'var(--text-color)';
        }, { once: true });
    }

    //
    // --- NEW: Logic for Cart Counter ---
    //
    
    // 1. Helper function to get cart from localStorage
    function getCart() {
        const cartString = localStorage.getItem('favoriteCart') || '[]';
        return JSON.parse(cartString);
    }

    // 2. Helper function to update the counter
    function updateCartCounter() {
        const cart = getCart();
        const counterElement = document.querySelector('.cart-counter');
        if (counterElement) {
            counterElement.innerHTML = cart.length;
        }
    }

    // 3. Run the function as soon as the page loads
    updateCartCounter();

});