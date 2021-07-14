import './js/image-service';
import ImageApiService from './js/image-service';
import imageCardTpl from './templates/image-card.hbs';
import Notiflix from "notiflix";

const imageApiService = new ImageApiService()

const refs = {
    searchForm: document.querySelector('.search-form'),
    imageContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearch(e) {
    e.preventDefault();
    imageApiService.resetPage();
    clearImgContainer();
    refs.loadMoreBtn.classList.add('hidden')
    imageApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

    if (imageApiService.searchQuery === '') {
        return;
    };
   

    try {
        const hits = await imageApiService.fetchImages()
        appendImageMarkup(hits);
    
        if (hits.length === 0) {
        refs.loadMoreBtn.classList.add('hidden')
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        };
        
        if (hits.length > hits.totalHits) {
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        };
        refs.loadMoreBtn.classList.remove('hidden');

    } catch (error) {
        console.log(error);
    }
};

async function onLoadMore() {
    
    try {
        const hits = await imageApiService.fetchImages();
        appendImageMarkup(hits)
      
    } catch (error) {
        console.log(error);
    }
}


function appendImageMarkup(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', imageCardTpl(hits))
}

function clearImgContainer() {
    refs.imageContainer.innerHTML = '';
}