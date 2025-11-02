// Save this as cart.js

// === 1. Helper function to get cart from localStorage ===
function getCart() {
    const cartString = localStorage.getItem('favoriteCart') || '[]';
    return JSON.parse(cartString);
}

// === 2. Helper function to save cart to localStorage ===
function saveCart(cartArray) {
    localStorage.setItem('favoriteCart', JSON.stringify(cartArray));
    updateCartCounter(); 
}

// === 3. Helper function to update the counter ===
function updateCartCounter() {
    const cart = getCart();
    const counterElement = document.querySelector('.cart-counter');
    if (counterElement) {
        counterElement.innerHTML = cart.length;
    }
}

// === 4. Main function to load and display cart items ===
function loadCartItems() {
    const cartContainer = document.querySelector('.cart-container');
    const cartIDs = getCart(); 
    
    // *** THIS IS THE FIX ***
    // Combine all your product lists into one big list.
    // We check if each list exists first before adding it.
    let allProducts = [];
    if (typeof weddingProducts !== 'undefined') {
        allProducts = allProducts.concat(weddingProducts);
    }
    if (typeof mangalProducts !== 'undefined') {
        allProducts = allProducts.concat(mangalProducts);
    }
    if (typeof receptionProducts !== 'undefined') {
        allProducts = allProducts.concat(receptionProducts);
    }
    if (typeof birthdayProducts !== 'undefined') { // <-- NEWLY ADDED
        allProducts = allProducts.concat(birthdayProducts);
    }
    
    let htmlToInsert = '';

    if (cartIDs.length === 0) {
        cartContainer.innerHTML = '<p>Your favorites list is empty.</p>';
        const clearButton = document.querySelector('.clear-cart-btn');
        if (clearButton) {
            clearButton.style.display = 'none';
        }
        return;
    }

    cartIDs.forEach(id => {
        // Now, we search the one big 'allProducts' list
        const product = allProducts.find(p => p.id === id);

        if (product) {
            htmlToInsert += `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                    </div>
                    <button class="remove-from-cart-btn" data-product-id="${product.id}">
                        &times;
                    </button>
                </div>
            `;
        }
    });
    
    cartContainer.innerHTML = htmlToInsert;
    setupRemoveButtons();
}

// === 5. Function to add click listeners to "Remove" buttons ===
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            let cart = getCart();
            cart = cart.filter(id => id !== productId);
            saveCart(cart); 
            loadCartItems();
        });
    });
}

// === 6. Function to set up the "Clear All" button ===
function setupClearCartButton() {
    const clearButton = document.querySelector('.clear-cart-btn');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            saveCart([]);
            loadCartItems();
        });
    }
}

// === 7. RUN ALL OUR FUNCTIONS ===
loadCartItems();
setupClearCartButton();
updateCartCounter();