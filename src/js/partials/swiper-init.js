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
});
