import './css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'; //для сообщений
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import debounce from 'lodash.debounce';
import API from './js/axiosRequest';

const inputEl = document.querySelector('input');
const submitBtn = document.getElementById('searchBtn');
const cardsContainer = document.querySelector('.gallery');

submitBtn.addEventListener('click', onSearch);

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let searchQuery = '';
function onSearch(e) {
  e.preventDefault();
  searchQuery = inputEl.value;

  if (searchQuery === '') {
    clearCountry();
  } else {
    API.fetchElement(searchQuery)
      .then(renderCard)
      .catch(error => error);
  }
}

function renderCard(cards) {
  console.log(cards);
  // lightbox.refresh();
  if (cards.length === 0) {
    onFitchError();
  } else {
    clearCards();

    const markup = cards
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class="photo-card">
            <a class="gallery__item" href="${largeImageURL}">
              <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b><br>${likes}
              </p>
              <p class="info-item">
                <b>Views</b><br>${views}
              </p>
              <p class="info-item">
                <b>Comments</b><br>${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b><br>${downloads}
              </p>
            </div>
          </div>
          `
      )
      .join('');

    cardsContainer.insertAdjacentHTML('beforeend', markup);
  }
}

//Отчистить вывод
function clearCards(element) {
  // countryInfo.innerHTML = '';
}

function onFitchError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      showOnlyTheLastOne: true,
    }
  );
}
