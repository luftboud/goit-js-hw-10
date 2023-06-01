import {
  BASE_URL,
  API_KEY,
  breedSelect,
  loader,
  BREED_URL,
  catInfo,
  fetchBreeds,
  fetchCatByBreed,
} from './cat-api';


loader.classList.add('visible');
fetchBreeds();

breedSelect.addEventListener('change', fetchCatByBreed);


