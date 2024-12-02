import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
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

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

// Обробник для кнопки "Search"
searchButton.addEventListener('click', onSearch);

// Додавання пошуку за клавішею Enter
searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onSearch();
  }
});

// Функція обробки пошуку
function onSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Input Error',
      message: 'Please enter a search query.',
      backgroundColor: '#FF4E4E',
    });
    return;
  }

  // Виконуємо запит на отримання зображень
  fetchImages(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your <br>search query. Please try again!',
          backgroundColor: '#FF4E4E',
        });
      } else {
        renderGallery(images); // Рендеринг галереї
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
      });
      console.error('Error fetching images:', error);
    })
    .finally(() => {
      searchInput.value = ''; // Очищення інпуту після завершення пошуку
    });
}
