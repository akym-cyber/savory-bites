// Menu data
const menuItems = [
  {
    name: "Truffle Arancini",
    description: "Risotto balls with black truffle, served with marinara",
    price: "$12",
    category: "starters",
    image: "./images/Arancini.jpeg"
  },
  {
    name: "Bruschetta Trio",
    description: "Toasted bread with tomato, basil, mozzarella, and mushroom toppings",
    price: "$11",
    category: "starters",
    image: "./images/Bruschetta.jpeg"
  },
  {
    name: "Calamari Fritti",
    description: "Lightly fried calamari with lemon aioli",
    price: "$14",
    category: "starters",
    image: "./images/Calamari.jpeg"
  },
  {
    name: "Herb-Crusted Salmon",
    description: "Atlantic salmon with lemon butter sauce, seasonal vegetables",
    price: "$28",
    category: "mains",
    image: "./images/Salmon.jpg"
  },
  {
    name: "Filet Mignon",
    description: "8oz grass-fed beef with truffle mashed potatoes",
    price: "$36",
    category: "mains",
    image: "./images/Filet.jpg"
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Arborio rice with seasonal mushrooms and parmesan",
    price: "$22",
    category: "mains",
    image: "./images/Wild Mushroom Risotto.jpeg"
  },
  {
    name: "Chocolate Soufflé",
    description: "Warm chocolate soufflé with vanilla ice cream",
    price: "$10",
    category: "desserts",
    image: "./images/Chocolate suffle.jpeg"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers",
    price: "$9",
    category: "desserts",
    image: "./images/Tiramisu.jpg"
  },
  {
    name: "Berry Panna Cotta",
    description: "Vanilla panna cotta with fresh seasonal berries",
    price: "$8",
    category: "desserts",
    image: "./images/Panna Cotta.jpeg"
  }
];

// DOM Elements
const menuContainer = document.querySelector('.menu-items');
const filterButtons = document.querySelectorAll('.filter-btn');
const reservationForm = document.getElementById('reservation-form');

// Initialize menu
function initMenu() {
  filterMenu('all');
  setupEventListeners();
}

// Filter menu items
function filterMenu(category) {
  menuContainer.innerHTML = '';
  
  // Update active button
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    }
  });
  
  // Filter items
  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);
  
  // Render items
  filteredItems.forEach(item => {
    const menuItemElement = document.createElement('div');
    menuItemElement.classList.add('menu-item');
    menuItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="price">${item.price}</span>
      </div>
    `;
    menuContainer.appendChild(menuItemElement);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterMenu(button.dataset.filter);
    });
  });
  
  // Reservation form
  if (reservationForm) {
    reservationForm.addEventListener('submit', handleReservation);
  }
  
  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
}

// Handle reservation form submission
function handleReservation(e) {
  e.preventDefault();
  
  // Simple form validation
  const nameInput = reservationForm.querySelector('input[type="text"]');
  const emailInput = reservationForm.querySelector('input[type="email"]');
  const dateInput = reservationForm.querySelector('input[type="date"]');
  const timeInput = reservationForm.querySelector('input[type="time"]');
  
  if (!nameInput.value || !emailInput.value || !dateInput.value || !timeInput.value) {
    alert('Please fill in all required fields');
    return;
  }
  
  // In a real app, you would send this data to a server
  // For now, we'll just show a success message
  reservationForm.reset();
  alert('Thank you! Your reservation has been booked.\nWe look forward to serving you!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMenu);
