import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Налаштування iziToast з позиціонуванням
iziToast.settings({
  position: 'topRight', // Початкове позиціонування
  timeout: 5000,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  progressBar: true,
  customClass: { toast: 'toast-top-right' }, // Додаткове кастомне позиціонування
});

// Елементи інтерфейсу
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery'); // Галерея для зображень

// Створення або використання індикатора завантаження
let loadingIndicator = document.querySelector('#loading-indicator');
console.log(loadingIndicator); // Перевірка наявності елемента в DOM
if (!loadingIndicator) {
  loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loading-indicator';
  loadingIndicator.className = 'loader loader-spinner'; // Використання бібліотеки css-loader
  document.body.appendChild(loadingIndicator);
  console.log(loadingIndicator); // Перевірка наявності індикатора в DOM
}

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Додавання пошуку за клавішею Enter
searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onSearch();
  }
});

// Обробник для кнопки "Search"
searchButton.addEventListener('click', onSearch);

// Функція штучної затримки
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  // Показуємо індикатор завантаження
  loadingIndicator.style.display = 'block';

  // Виконуємо запит на отримання зображень
  fetchImages(query)
    .then(images => {
      // Видаляємо штучну затримку
      if (images.length === 0) {
        iziToast.error({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your <br>search query. Please try again!',
          backgroundColor: '#FF4E4E',
        });
      } else {
        gallery.innerHTML = ''; // Очищення галереї перед новим пошуком
        renderGallery(images); // Рендеринг галереї
        lightbox.refresh(); // Оновлення SimpleLightbox після додавання нових зображень
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
      loadingIndicator.style.display = 'none'; // Приховуємо індикатор після завершення
      searchInput.value = ''; // Очищення інпуту після завершення пошуку
    });
}
