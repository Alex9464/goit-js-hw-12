import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const loadingIndicator = document.querySelector('#loading');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;
let isLoading = false;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.querySelector('#search-input').value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery(galleryContainer);
  loadMoreButton.style.display = 'none';

  await loadImages();
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  await loadImages();
});

async function loadImages() {
  if (isLoading) return;
  isLoading = true;

  try {
    loadingIndicator.style.display = 'block';
    const data = await fetchImages(currentQuery, currentPage, perPage);

    if (data && data.hits.length > 0) {
      renderGallery(data.hits, galleryContainer);
      lightbox.refresh();
      smoothScroll();

      if (currentPage * perPage >= data.totalHits) {
        iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
    } 
  } catch (error) {
    iziToast.error({ message: 'Failed to load images. Please try again later!' });
    console.error(error);
  } finally {
    loadingIndicator.style.display = 'none';
    isLoading = false;
  }
}

function smoothScroll() {
  const cardHeight = document.querySelector('.gallery .photo-card')?.getBoundingClientRect()?.height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}