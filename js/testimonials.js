// testimonials.js - Handles testimonials page for Keyshoendi
// Injects sample reviews into the testimonials page

document.addEventListener('DOMContentLoaded', () => {
  const testimonials = [
    {
      text: 'Keyshoendi has the best selection of men\'s shoes I\'ve found online. Fast shipping and great quality!',
      author: 'James T.'
    },
    {
      text: 'I love the modern styles and the fit is always perfect. Highly recommend Keyshoendi!',
      author: 'Michael B.'
    },
    {
      text: 'Customer service was super helpful and my order arrived quickly. Will shop again!',
      author: 'David L.'
    },
    {
      text: 'The clothing is stylish and comfortable. The shoes are top-notch too!',
      author: 'Chris P.'
    }
  ];
  const container = document.getElementById('testimonials-list');
  if (!container) return;
  container.innerHTML = testimonials.map(t => `
    <div class="testimonial">
      <div class="text">${t.text}</div>
      <div class="author">- ${t.author}</div>
    </div>
  `).join('');
});
