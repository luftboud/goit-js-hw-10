import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_N8MV9ihyj2JHx3QxHboKO4Utf5E9akypRe35HhTR2rApjrg24wZltJTWKMBdxfrP';
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const BREED_URL = 'https://api.thecatapi.com/v1/images/search';
const catInfo = document.querySelector('.cat-info');

function fetchBreeds() {
  fetch(`${BASE_URL}?api_key=${API_KEY}`)
    .then(resp => {
      console.log(resp);
      loader.classList.remove('visible');
      if (!resp.ok) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        throw new Error(resp.statusText);
      }
      breedSelect.classList.add('visible');
      return resp.json();
    })
    .then(data => {
      for (const cat in data) {
        const element = document.createElement('option');
        element.textContent = data[cat].name;
        element.value = data[cat].id;
        breedSelect.append(element);
      }
    })
    .catch(err => console.error(err));
}

function fetchCatByBreed(event) {
  let breedId = event.target.value;
  console.log(breedId);
  const badImage = document.querySelector('img'); //checking, if there some pics and information that was loaded before
  if (badImage) {
    const info = document.querySelector('.cat-info-text');
    //deleting this information
    badImage.remove();
    info.remove();
  }
  //
  loader.classList.add('visible');
  breedSelect.classList.remove('visible');
  //
  fetch(`${BREED_URL}?api_key=${API_KEY}&breed_ids=${breedId}`)
    //search for some errors
    .then(resp => {
      console.log(resp);
      loader.classList.remove('visible');
      if (!resp.ok) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        throw new Error(resp.statusText);
      }
      breedSelect.classList.add('visible');
      return resp.json();
    })
    //if there none of them, we load all the information
    .then(data => {
      console.log(data);
      //sometimes there is  no information about a cat.
      //for example, we don't have any about malayan breed.
      //so if there is such a situation, an error will appear
      if (data.length == 0) {
        Notiflix.Notify.warning(
          'Sorry, there is no information about this cat. Try again later.'
        );
        throw new Error(resp.statusText);
      }
      const catMarkup = `<img src="${data[0].url}" alt="${data[0].breeds[0].name}">
        <div class="cat-info-text">
          <h2>${data[0].breeds[0].name}</h2>
          <p class="cat-desc">${data[0].breeds[0].description}</p>
          <p class="cat-temp">
            <span class="cat-span">Temperament:</span>
            ${data[0].breeds[0].temperament}
          </p>
        </div>`;
      catInfo.insertAdjacentHTML('afterbegin', catMarkup);
    })
    .catch(err => console.error(err));
}

export {
  BASE_URL,
  API_KEY,
  breedSelect,
  loader,
  BREED_URL,
  catInfo,
  fetchBreeds,
  fetchCatByBreed,
};
