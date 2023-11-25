export function createMarkup(item) {
  return item
    .map(
      ({
        largeImageURL,
        webformatURL,
        likes,
        downloads,
        comments,
        tags,
        views,
      }) =>
        `<div class="photo-card"><a class="gallery-link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/></a><div class="info"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p><p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div>`
    )
    .join('');
}
