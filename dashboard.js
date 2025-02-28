
document.addEventListener('DOMContentLoaded', function() {
  // Admin credentials (in a real app, this should be on the server)
  const adminCredentials = {
    username: 'admin',
    password: 'password123'
  };

  // DOM elements
  const loginContainer = document.getElementById('login-container');
  const dashboardContainer = document.getElementById('dashboard-container');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const addMovieBtn = document.getElementById('add-movie-btn');
  const addMovieForm = document.getElementById('add-movie-form');
  const movieForm = document.getElementById('movie-form');
  const closeBtn = document.querySelector('.close');
  const movieGrid = document.getElementById('movie-grid');
  const totalMoviesEl = document.getElementById('total-movies');
  const avgRatingEl = document.getElementById('avg-rating');

  // Check if user is logged in
  function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      loginContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      loadMovies();
      updateStats();
    } else {
      loginContainer.style.display = 'flex';
      dashboardContainer.style.display = 'none';
    }
  }

  // Login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem('isLoggedIn', 'true');
      checkAuth();
    } else {
      loginError.textContent = 'Invalid username or password';
    }
  });

  // Logout
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    checkAuth();
  });

  // Open add movie form
  addMovieBtn.addEventListener('click', function() {
    addMovieForm.style.display = 'block';
  });

  // Close add movie form
  closeBtn.addEventListener('click', function() {
    addMovieForm.style.display = 'none';
    movieForm.reset();
  });

  // Click outside to close
  window.addEventListener('click', function(e) {
    if (e.target === addMovieForm) {
      addMovieForm.style.display = 'none';
      movieForm.reset();
    }
  });

  // Add movie form submission
  movieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const movie = {
      id: Date.now(),
      title: document.getElementById('movie-title').value,
      genre: document.getElementById('movie-genre').value,
      rating: parseFloat(document.getElementById('movie-rating').value),
      image: document.getElementById('movie-image').value
    };
    
    // Get existing movies or initialize empty array
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    // Add new movie
    movies.push(movie);
    
    // Save back to localStorage
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // Close form and reset
    addMovieForm.style.display = 'none';
    movieForm.reset();
    
    // Reload movies
    loadMovies();
    updateStats();
  });

  // Load movies from localStorage
  function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    movieGrid.innerHTML = '';
    
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      movieCard.innerHTML = `
        <div class="rating-box">${movie.rating}</div>
        <div class="movie-card-actions">
          <button class="edit-btn" data-id="${movie.id}"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" data-id="${movie.id}"><i class="fas fa-trash"></i></button>
        </div>
        <img src="${movie.image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.genre}</p>
      `;
      
      movieGrid.appendChild(movieCard);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        deleteMovie(id);
      });
    });
    
    // Add edit event listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        editMovie(id);
      });
    });
  }

  // Delete movie
  function deleteMovie(id) {
    if (confirm('Are you sure you want to delete this movie?')) {
      let movies = JSON.parse(localStorage.getItem('movies') || '[]');
      movies = movies.filter(movie => movie.id !== id);
      localStorage.setItem('movies', JSON.stringify(movies));
      loadMovies();
      updateStats();
    }
  }

  // Edit movie
  function editMovie(id) {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    const movie = movies.find(m => m.id === id);
    
    if (movie) {
      document.getElementById('movie-title').value = movie.title;
      document.getElementById('movie-genre').value = movie.genre;
      document.getElementById('movie-rating').value = movie.rating;
      document.getElementById('movie-image').value = movie.image;
      
      // Show form
      addMovieForm.style.display = 'block';
      
      // Override form submission
      const originalSubmit = movieForm.onsubmit;
      movieForm.onsubmit = function(e) {
        e.preventDefault();
        
        // Update movie
        movie.title = document.getElementById('movie-title').value;
        movie.genre = document.getElementById('movie-genre').value;
        movie.rating = parseFloat(document.getElementById('movie-rating').value);
        movie.image = document.getElementById('movie-image').value;
        
        // Save back to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));
        
        // Close form and reset
        addMovieForm.style.display = 'none';
        movieForm.reset();
        
        // Reset form submission
        movieForm.onsubmit = originalSubmit;
        
        // Reload movies
        loadMovies();
        updateStats();
      };
    }
  }

  // Update stats
  function updateStats() {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    // Total movies
    totalMoviesEl.textContent = movies.length;
    
    // Average rating
    if (movies.length > 0) {
      const totalRating = movies.reduce((sum, movie) => sum + movie.rating, 0);
      const avgRating = totalRating / movies.length;
      avgRatingEl.textContent = avgRating.toFixed(1);
    } else {
      avgRatingEl.textContent = '0';
    }
  }

  // Initialize
  checkAuth();

  // Add sample data if no movies exist
  const movies = JSON.parse(localStorage.getItem('movies') || '[]');
  if (movies.length === 0) {
    const sampleMovies = [
      {
        id: 1,
        title: 'Побег из Претории',
        genre: 'Триллер',
        rating: 8.5,
        image: 'images/Фото 1 сейчас в кино.png'
      },
      {
        id: 2,
        title: 'Джокер',
        genre: 'Триллер, драма, криминал',
        rating: 9.0,
        image: 'images/Фото 2 сейчас в кино.png'
      }
    ];
    localStorage.setItem('movies', JSON.stringify(sampleMovies));
    loadMovies();
    updateStats();
  }
});
