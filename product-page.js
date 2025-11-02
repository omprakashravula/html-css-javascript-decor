// Save this as product-page.js

// === 1. NEW: Smart function to get the correct product list ===
function getProductListForPage() {
    // Find the main product grid on the page
    const productGrid = document.querySelector('.product-grid');
    
    // Get the ID we will add to the grid (e.g., id="wedding-grid")
    const pageID = productGrid.id; 

    // Return the correct product list based on the ID
    if (pageID === 'wedding-grid' && typeof weddingProducts !== 'undefined') {
        return weddingProducts;
    }
    if (pageID === 'mangal-grid' && typeof mangalProducts !== 'undefined') {
        return mangalProducts;
    }
    if (pageID === 'reception-grid' && typeof receptionProducts !== 'undefined') {
        return receptionProducts;
    }
    if (pageID === 'birthday-grid' && typeof birthdayProducts !== 'undefined') {
        return birthdayProducts;
    }
    
    // Fallback if something is wrong
    return [];
}


// === 2. Lightbox Setup (Same as before) ===
const lightbox = document.querySelector('.lightbox-overlay');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(imageUrl) {
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageUrl;
        lightbox.classList.add('show');
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('show');
    }
}

if (lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}


// === 3. Helper functions (Same as before) ===
function isInArray(arr, itemId) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === itemId) {
            return true;
        }
    }
    return false;
}

function getCart() {
    const cartString = localStorage.getItem('favoriteCart') || '[]';
    return JSON.parse(cartString);
}

function saveCart(cartArray) {
    localStorage.setItem('favoriteCart', JSON.stringify(cartArray));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = getCart();
    const counterElement = document.querySelector('.cart-counter');
    if (counterElement) {
        counterElement.innerHTML = cart.length;
    }
}

// === 4. Main function to build product cards (Updated) ===
function buildProductCards() {
    const productContainer = document.querySelector('.product-grid');
    const cart = getCart(); 
    let htmlToInsert = '';

    // *** THIS IS THE KEY CHANGE ***
    // We call our new "smart" function to get the correct list
    const productList = getProductListForPage();

    if (productList.length > 0) {
        
        productList.forEach(product => {
            const isFavorited = isInArray(cart, product.id);
            const favoritedClass = isFavorited ? 'favorited' : '';

            htmlToInsert += `
                <div class="product-card"> 
                    <button class="add-to-favorite-btn ${favoritedClass}" data-product-id="${product.id}">
                        &#10084;
                    </button>
                    
                    <img class="product-image" src="${product.image}" alt="${product.name}" data-src="${product.image}">
                    
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;
        });
        
        productContainer.innerHTML = htmlToInsert;
        
    } else {
        productContainer.innerHTML = '<p>No products found for this category.</p>';
    }
}

// === 5. Favorite Buttons Setup (Same as before) ===
function setupFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.add-to-favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            let cart = getCart();

            if (isInArray(cart, productId)) {
                cart = cart.filter(id => id !== productId);
                button.classList.remove('favorited');
            } else {
                cart.push(productId);
                button.classList.add('favorited');
            }
            
            saveCart(cart);
        });
    });
}

// === 6. Image Lightbox Setup (Same as before) ===
function setupImageLightbox() {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(image => {
        image.addEventListener('click', () => {
            const imageUrl = image.dataset.src;
            openLightbox(imageUrl);
        });
    });
}


// === 7. RUN ALL OUR FUNCTIONS ===
buildProductCards();    
setupFavoriteButtons(); 
updateCartCounter();    
setupImageLightbox();