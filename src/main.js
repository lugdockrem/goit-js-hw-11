import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

iziToast.settings({
  position: 'topRight',
  timeout: 5000,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  progressBar: true,
  customClass: { toast: 'toast-top-right' },
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery');

let loadingIndicator = document.querySelector('#loading-indicator');
console.log(loadingIndicator);
if (!loadingIndicator) {
  loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loading-indicator';
  loadingIndicator.className = 'loader loader-spinner';
  document.body.appendChild(loadingIndicator);
  console.log(loadingIndicator);
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onSearch();
  }
});

searchButton.addEventListener('click', onSearch);

// Функція штучної затримки
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

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

  loadingIndicator.style.display = 'block';

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
        gallery.innerHTML = '';
        renderGallery(images);
        lightbox.refresh();
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
      loadingIndicator.style.display = 'none';
      searchInput.value = '';
    });
}
