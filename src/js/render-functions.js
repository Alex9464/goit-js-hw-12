export function renderGallery(images, container) {
  if (!images || images.length === 0) {
    container.innerHTML = '';
    return;
  }

  const markup = images
  .map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, webformatWidth, webformatHeight }) => `
    <div class="photo-card">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="${webformatWidth}" 
        height="${webformatHeight}" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b> ${views}</p>
        <p class="info-item"><b>Comments:</b> ${comments}</p>
        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>
  `
  )
  .join('');
container.innerHTML += markup;
}

export function clearGallery(container) {
container.innerHTML = '';
}