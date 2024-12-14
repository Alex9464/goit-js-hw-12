import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '47457730-c1e96e42c58ea46d8ed7b0f32';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 20) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    if (response.data.totalHits === 0) {
      iziToast.warning({ message: 'No images found. Please try another query!' });
      return null;
    }

    return response.data;
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images. Please try again later!' });
    throw new Error(error);
  }
}