import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';


function fetchElement(elementId) {
  // Делаем запрос пользователя с данным I
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '25733108-a2320bdb0f7933c9befe0040d',
        q: elementId,
        image_type: 'photo',
        orientation: 'orientation',
        safesearch: 'true',
        per_page: 40,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data.hits);
}

export default { fetchElement };
