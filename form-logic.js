// Save this as form-logic.js

(function() {
    
    const quoteForm = document.querySelector('.quote-form');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // --- 1. Get User's Details ---
            const nameInput = quoteForm.querySelector('.form-input[id*="user-name"]');
            const contactInput = quoteForm.querySelector('.form-input[id*="user-contact"]');
            
            const userName = nameInput.value;
            const userContact = contactInput.value;

            // --- 2. Get Favorited Items ---
            const cartIDs = getCart();
            let favoriteItemsList = '';
            
            // *** THIS IS THE FIX ***
            // Combine all product lists into one big 'allProducts' list.
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

            if (cartIDs.length > 0) {
                cartIDs.forEach(id => {
                    // Search the one big 'allProducts' list
                    const product = allProducts.find(p => p.id === id);
                    if (product) {
                        favoriteItemsList += `\n- ${product.name}`;
                        favoriteItemsList += `\n  Price: ${product.price}`;
                        favoriteItemsList += `\n  Image: ${product.image}\n`;
                    }
                });
            } else {
                favoriteItemsList = '\n(User did not have any items in their favorites list)';
            }

            // --- 3. Build the Email (mailto) Link ---
            const yourEmail = 'ravulaomprakash45@gmail.com'; 
            const subject = 'New Decoration Quote Request from ' + userName;
            
            let body = `Hello Bhavanni Decorations,\n\n`;
            body += `I'm interested in a quote for my event.\n\n`;
            body += `Name: ${userName}\n`;
            body += `Contact (Phone/Email): ${userContact}\n\n`;
            body += `--- FAVORITED ITEMS ---`;
            body += `${favoriteItemsList}\n\n`;
            body += `Thank you!`;
            
            const mailtoLink = `mailto:${yourEmail}`
                             + `?subject=${encodeURIComponent(subject)}`
                             + `&body=${encodeURIComponent(body)}`;
            
            // --- 4. Open the user's email client ---
            window.location.href = mailtoLink;
            quoteForm.reset();
        });
    }

    function getCart() {
        const cartString = localStorage.getItem('favoriteCart') || '[]';
        return JSON.parse(cartString);
    }

})();