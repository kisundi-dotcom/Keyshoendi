// shop.js - Shop page logic for Keyshoendi
// Handles product filters, product list, and shop slider

// --- Sample Product Data ---
const products = [
  {
    id: 1,
    name: 'Blue Blazer',
    category: 'clothing',
    size: 'M',
    price: 120,
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Classic Sneakers',
    category: 'shoes',
    size: '43',
    price: 80,
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Green Shirt',
    category: 'clothing',
    size: 'L',
    price: 60,
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Leather Loafers',
    category: 'shoes',
    size: '44',
    price: 150,
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'White Tee',
    category: 'clothing',
    size: 'S',
    price: 30,
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
  }
];

// --- Shop Slider ---
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-slider')) {
    createSlider('shop-slider', [
      {
        img: 'https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=1200&q=80',
        alt: 'Shop Menswear',
        caption: 'Shop the Latest Styles'
      },
      {
        img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Shop Shoes',
        caption: 'Premium Shoes Collection'
      }
    ]);
  }

  // --- Product List Render ---
  renderProducts(products);

  // --- Filter Form Handler ---
  document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cat = document.getElementById('filter-category').value;
    const size = document.getElementById('filter-size').value;
    const price = document.getElementById('filter-price').value;
    let filtered = products;
    if (cat !== 'all') filtered = filtered.filter(p => p.category === cat);
    if (size !== 'all') filtered = filtered.filter(p => p.size === size);
    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }
    renderProducts(filtered);
  });
});

// --- Render Products ---
function renderProducts(list) {
  const container = document.getElementById('product-list');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }
  container.innerHTML = list.map(product => `
    <div class="product-card">
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">$${product.price}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

// --- Add to Cart ---
function addToCart(productId) {
  // Find product by ID
  const product = products.find(p => p.id === productId);
  if (!product) return;
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  // Update cart count in nav
  if (window.updateCartCount) updateCartCount();
  alert('Added to cart!');
}
