import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


document.addEventListener('DOMContentLoaded', function () {
    const slider = new Swiper('#trend', {
        modules: [Navigation, Pagination],
        initialSlide: 0,
        slidesPerView: "auto",
        centeredSlides: false,
        freeMode:true,
        slidesPerGroup: 1,
        spaceBetween: 8,
        pagination: {
            el: ".trend-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-trend',
            prevEl: '.swiper-button-prev-trend',
        },
    });
});
