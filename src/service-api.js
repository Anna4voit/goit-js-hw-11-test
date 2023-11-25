import axios from 'axios';

export async function serviceGallery(q, page, per_page) {
  const URL = 'https://pixabay.com/api';
  const API_KEY = '40737115-44b84706cba0bed376614eb3e';
  const params = new URLSearchParams({
    key: API_KEY,
    per_page,
    page,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const response = await axios.get(`${URL}/?${params}`);
  return response.data;
}
