// carrito.js - Funcionalidad del carrito de compras

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('btn-checkout');
    
    // Cargar carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Función para renderizar los productos en el carrito
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            updateCartSummary(0);
            updateCartCount();
            return;
        }
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-btn" data-index="${index}">
                    <img src="img/iconos/eliminar.png" alt="Eliminar" style="width: 16px; height: 16px;">
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        updateCartSummary();
        updateCartCount();
    }
    
    // Función para actualizar el resumen del carrito
    function updateCartSummary() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.07;
        const shipping = 5.00;
        const total = subtotal + tax + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Función para actualizar el contador del carrito
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        // Actualizar también en localStorage para que otras páginas puedan acceder
        localStorage.setItem('cartCount', totalItems);
    }
    
    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
    
    // Función para cambiar la cantidad de un producto
    function updateQuantity(index, change) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    }
    
    // Event listeners para los botones de cantidad y eliminar
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-btn')) {
            const index = e.target.dataset.index || e.target.parentElement.dataset.index;
            removeFromCart(parseInt(index));
        } else if (e.target.classList.contains('minus')) {
            const index = parseInt(e.target.dataset.index);
            updateQuantity(index, -1);
        } else if (e.target.classList.contains('plus')) {
            const index = parseInt(e.target.dataset.index);
            updateQuantity(index, 1);
        }
    });
    
    // Event listener para el botón de pago
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
            return;
        }
        
        // Guardar el carrito actual como una compra en el historial
        const purchase = {
            id: Date.now(),
            date: new Date().toLocaleDateString('es-ES'),
            items: [...cart],
            total: parseFloat(totalElement.textContent.replace('$', ''))
        };
        
        // Obtener historial existente o crear uno nuevo
        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        purchaseHistory.push(purchase);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
        
        // Vaciar el carrito
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Redirigir a la página de confirmación o historial
        alert('¡Compra realizada con éxito! Serás redirigido al historial de compras.');
        window.location.href = 'historial.html';
    });
    
    // Inicializar el carrito
    renderCartItems();
});