import Notiflix from 'notiflix';

export const msg = {
  error: 'Oops! Something went wrong! Try reloading the page!',
  notFound:
    'Sorry, there are no images matching your search query. Please try again.',
  theEnd: 'We are sorry, but you have reached the end of search results.',
  searchAgain: 'Please enter search words and try again.',
};

const options = {
  timeout: 1000,
  position: 'center-center',
  width: '400px',
  fontSize: '24px',
};

export function failure(msg) {
  Notiflix.Notify.failure(msg, options);
}

export function success(msg) {
  Notiflix.Notify.success(msg, options);
}
