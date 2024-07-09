document.addEventListener("DOMContentLoaded", () => {
	const solutionsCarousel = document.querySelectorAll(".solutions__slider");

	if (solutionsCarousel.length > 0) {
		solutionsCarousel.forEach(elem => {
			const solutionsNext = elem.previousElementSibling.querySelector(".swiper-btn-next");
			const solutionsPrev = elem.previousElementSibling.querySelector(".swiper-btn-prev");

			const slider = new Swiper(elem, {
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				navigation: {
					nextEl: solutionsNext,
					prevEl: solutionsPrev,
				}
			});
		});
	}

	const videoCarousel = document.querySelectorAll(".video__slider");

	if (videoCarousel.length > 0) {
		videoCarousel.forEach(elem => {
			const videoNext = elem.previousElementSibling.querySelector(".swiper-btn-next");
			const videoPrev = elem.previousElementSibling.querySelector(".swiper-btn-prev");
			const videos = elem.querySelectorAll("video");

			const slider = new Swiper(elem, {
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				navigation: {
					nextEl: videoNext,
					prevEl: videoPrev,
				},
				on: {
					slideChange: function(swiper) {
						videos.forEach(el => {
							el.pause();
							el.currentTime = 0;
						});
					}
				}
			});
		});
	}
});
