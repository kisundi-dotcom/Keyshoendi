// cart.js - Cart page logic for Keyshoendi
// Handles cart display, removal, and checkout

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  document.getElementById('checkout-btn').onclick = checkout;
});

// --- Render Cart Items ---
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!container || !totalEl) return;
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalEl.textContent = '0.00';
    return;
  }
  let total = 0;
  container.innerHTML = cart.map((item, idx) => {
    total += item.price;
    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-details">
          <div>${item.name}</div>
          <div class="price">$${item.price}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${idx})">Remove</button>
      </div>
    `;
  }).join('');
  totalEl.textContent = total.toFixed(2);
}

// --- Remove from Cart ---
function removeFromCart(idx) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  if (window.updateCartCount) updateCartCount();
}

// --- Checkout (Demo) ---
function checkout() {
  alert('Thank you for your purchase! (Demo)');
  localStorage.removeItem('cart');
  renderCart();
  if (window.updateCartCount) updateCartCount();
}
