import { serviceGallery } from './service-api';
import { createMarkup } from './markup';
import { failure, success, msg } from './notiflix-msg';
import { lightbox } from './lightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  target: document.querySelector('.js-guard'),
};

let options = {
  root: null,
  rootMarging: '300px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);

let page = 1;
let keySearch = '';
let per_page = 20;

refs.searchForm.addEventListener('submit', handleGallery);

function handleGallery(event) {
  event.preventDefault();
  keySearch = event.target.searchQuery.value.trim();
  if (keySearch === '') {
    failure(msg.searchAgain);
    return;
  }
  serviceGallery(keySearch, (page = 1), per_page)
    .then(data => {
      if (data.hits.length === 0) {
        failure(msg.notFound);
        refs.gallery.innerHTML = '';
      } else {
        refs.gallery.innerHTML = createMarkup(data.hits);
        lightbox.refresh();
        const msg = `Hooray! We found ${data.totalHits} images.`;
        success(msg);
        observer.observe(refs.target);
      }
      if (data.totalHits / data.hits.length > 1) {
        autoScroll();
      } else {
        observer.unobserve(refs.target);
        window.scrollTo(0, 0);
      }
    })
    .catch(error => {
      failure(msg.error);
    })
    .finally(() => {
      refs.searchForm.reset();
    });
}

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      serviceGallery(keySearch, page, per_page)
        .then(data => {
          refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
          lightbox.refresh();
          autoScroll();
          const lastPage = Math.ceil(data.totalHits / per_page);
          if (page === lastPage) {
            failure(msg.theEnd);
            observer.unobserve(refs.target);
            return;
          }
        })
        .catch(error => {
          failure(msg.error);
        });
    }
  });
}

function autoScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
