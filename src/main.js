import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Налаштування iziToast
iziToast.settings({
  position: 'topRight', // Встановлюємо позицію в правому верхньому куті
  timeout: 5000, // Час автоматичного закриття (5 секунд)
  transitionIn: 'fadeIn', // Ефект появи
  transitionOut: 'fadeOut', // Ефект зникання
  progressBar: true, // Показати індикатор прогресу
});

// Елементи DOM
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

// Функція для пошуку зображень
function handleSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  searchInput.value = ''; // Очищення інпуту

  fetchImages(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your <br>search query. Please try again!',
          backgroundColor: '#FF4E4E', // Червоний фон
        });
      } else {
        console.log('Images found:', images);
        // TODO: Додати рендеринг зображень у галереї
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
      });
      console.error('Error fetching images:', error);
    });
}

// Обробник кліку на кнопку
searchButton.addEventListener('click', handleSearch);

// Обробник натискання клавіші "Enter" в інпуті
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
