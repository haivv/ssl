document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.client-wrapper', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
        breakpoints: {
            1600: {
                slidesPerView: 5,
            },
            1000: {
                slidesPerView: 3,
            },
            710: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            }
        }
    });
});