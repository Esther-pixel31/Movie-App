const API_KEY = 'ecb7cfd0f575623e8239505c9dba981e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// API Endpoints
const trendingMoviesURL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

// DOM Elements
const searchInput = document.getElementById('searchbar');
const searchButton = document.getElementById('search-btn');
const movieContainer = document.getElementById('movie-container');

// Fetch Trending Movies on Page Load
fetchMovies(trendingMoviesURL);

// Function to Fetch Movies
async function fetchMovies(url) {
    try {
        console.log(`Fetching movies from: ${url}`); // Debugging
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data); // Debugging
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            movieContainer.innerHTML = `<p>No movies found. Try a different search.</p>`;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        movieContainer.innerHTML = `<p>Error fetching movies. Please try again.</p>`;
    }
}

// Function to Display Movies
function displayMovies(movies) {
    movieContainer.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        if (poster_path) { // Only display movies with posters
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${IMG_URL + poster_path}" alt="${title}">
                <h2>${title}</h2>
                <span>⭐ ${vote_average.toFixed(1)}</span>
            `;
            movieContainer.appendChild(movieElement);
        }
    });
}

// Search Button Click Event
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    console.log(`Search clicked: ${query}`); // Debugging
    if (query) {
        fetchMovies(searchURL + encodeURIComponent(query));
    } else {
        alert('Please enter a movie name!');
    }
});

// Search on "Enter" Key Press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
