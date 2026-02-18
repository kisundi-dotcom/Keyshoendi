// main.js - Shared site-wide JS for Keyshoendi
// Handles navigation cart count, sliders, and shared logic

// --- Cart Count Update ---
function updateCartCount() {
  // Get cart from localStorage or empty array
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Update all cart count spans
  document.querySelectorAll('#cart-count').forEach(span => {
    span.textContent = cart.length;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // --- Hero Slider (Home) ---
  if (document.getElementById('home-slider')) {
    createSlider('home-slider', [
      {
        img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Modern Menswear',
        caption: 'Discover Modern Menswear'
      },
      {
        img: 'https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=1200&q=80',
        alt: 'Stylish Shoes',
        caption: 'Step Up Your Style'
      },
      {
        img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
        alt: 'Keyshoendi Collection',
        caption: 'Keyshoendi Collection 2026'
      }
    ]);
  }

  // --- Featured Products Slider (Home) ---
  if (document.getElementById('featured-slider')) {
    createSlider('featured-slider', [
      {
        img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        alt: 'Blue Blazer',
        caption: 'Blue Blazer'
      },
      {
        img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        alt: 'Classic Sneakers',
        caption: 'Classic Sneakers'
      },
      {
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        alt: 'Green Shirt',
        caption: 'Green Shirt'
      }
    ]);
  }
});

// --- Generic Slider Function ---
function createSlider(containerId, slides) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create slide elements
  container.innerHTML = slides.map((slide, i) => `
    <div class="slide${i === 0 ? ' active' : ''}">
      <img src="${slide.img}" alt="${slide.alt}" />
      <div class="slide-caption">${slide.caption}</div>
    </div>
  `).join('');

  // Add slider controls
  const controls = document.createElement('div');
  controls.className = 'slider-controls';
  controls.innerHTML = `
    <button class="slider-btn prev">&#10094;</button>
    <button class="slider-btn next">&#10095;</button>
  `;
  container.appendChild(controls);

  // Slider logic
  let current = 0;
  const slideEls = container.querySelectorAll('.slide');
  function showSlide(idx) {
    slideEls.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }
  controls.querySelector('.prev').onclick = () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  };
  controls.querySelector('.next').onclick = () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  };
  // Optional: auto-slide
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);
}
