export class API {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32832453-e3254b3d4cedd40db7f429e0f';

  constructor() {
    this.page = 1;
    this.query = null;
    this.per_page = 12;
  }

  async getPhotos() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      key: API.API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: this.per_page,
    });

    const res = await fetch(`https://pixabay.com/api/?${searchParams}`);
    if (!res.ok) {
      return Promise.reject(new Error('Not found'));
    }
    return await res.json();
  }
}

export default API;
