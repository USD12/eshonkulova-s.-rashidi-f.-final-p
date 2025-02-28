
document.addEventListener('DOMContentLoaded', function() {
  // Search functionality
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  
  const movies = [
    { title: 'Побег из Претории', desc: 'Триллер', rate: '8.5', img: 'images/Фото 1 сейчас в кино.png' },
    { title: 'Джокер', desc: 'Триллер, драма, криминал', rate: '9.0', img: 'images/Фото 2 сейчас в кино.png' },
    { title: 'Звёздные войны', desc: 'Фантастика, фэнтези', rate: '8.7', img: 'images/Фото 3 сейчас в кино.png' },
    { title: 'Джентельмены', desc: 'Боевик, комедия', rate: '8.9', img: 'images/Фото 4 сейчас в кино.png' }
  ];

  searchBtn.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    } else {
      searchResults.style.display = 'none';
    }
  });

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 0) {
      const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(value) || 
        movie.desc.toLowerCase().includes(value)
      );
      
      searchResults.innerHTML = filtered.map(movie => `
        <div class="search-result-item">
          <img src="${movie.img}" class="search-result-img" alt="${movie.title}">
          <div class="search-result-info">
            <h4 class="search-result-title">${movie.title}</h4>
            <p class="search-result-desc">${movie.desc}</p>
          </div>
          <span class="search-result-rate">${movie.rate}</span>
        </div>
      `).join('');
      
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchBtn.contains(e.target) && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchInput.classList.remove('active');
      searchResults.style.display = 'none';
    }
  });
  // Form handling
  const loginBtn = document.querySelector('.login-btn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const recoverForm1 = document.getElementById('recoverForm1');
  const recoverForm2 = document.getElementById('recoverForm2');
  const showRegisterBtn = document.getElementById('showRegister');
  const showRecoverLink = document.getElementById('showRecover');
  const showRecover2Btn = document.getElementById('showRecover2');
  const closeBtns = document.querySelectorAll('.close');

  function showForm(form) {
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    recoverForm1.style.display = 'none';
    recoverForm2.style.display = 'none';
    form.style.display = 'block';
  }

  loginBtn.addEventListener('click', () => showForm(loginForm));
  showRegisterBtn.addEventListener('click', () => showForm(registerForm));
  showRecoverLink.addEventListener('click', () => showForm(recoverForm1));
  showRecover2Btn.addEventListener('click', () => showForm(recoverForm2));

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal-form').style.display = 'none';
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-form')) {
      event.target.style.display = 'none';
    }
  });
  const movieButtons = document.querySelectorAll('.movie-button');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');

  movieButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      modals[index].style.display = 'block';
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      modal.style.display = 'none';
    });
  });

  window.addEventListener('click', (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});
//ДЛЯ КНОПКИ ВВЕРХ ПРИ НАЖАТИИ//

document.addEventListener('DOMContentLoaded', function() {
  // ... [existing code] ...
  const upButton = document.querySelector('img[alt="up 1"]'); // Select the image
  const movieSection = document.querySelector('.movie-section'); // Select the movie section

  upButton.addEventListener('click', () => {
    movieSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the section
  });
});





