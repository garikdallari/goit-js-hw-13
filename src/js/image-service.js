const axios = require('axios');
const API_KEY = '22496813-a3fbe39786787c712b168fbe4';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=8`;
        
        const response = await axios.get(url);
     
        this.page += 1;
        return response.data.hits
    }

      resetPage() {
        this.page = 1
    }

    

}

   
