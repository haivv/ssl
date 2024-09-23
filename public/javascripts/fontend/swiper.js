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
            1920: {
                slidesPerView: 5,  // 1920px 이상에서는 5개 슬라이드 표시
            },
            1200: {
                slidesPerView: 4,  // 1200px 이상에서는 4개 슬라이드 표시
            },
            1024: {
                slidesPerView: 3,  // 1024px 이상에서는 3개 슬라이드 표시
            },
            768: {
                slidesPerView: 2,  // 768px 이상에서는 2개 슬라이드 표시
            },
            480: {
                slidesPerView: 1,  // 480px 이상에서는 1개 슬라이드 표시
            },
            0: {
                slidesPerView: 1,  // 480px 이하에서는 1개 슬라이드 표시
            }
        }
    });
});