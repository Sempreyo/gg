document.addEventListener("DOMContentLoaded", () => {
	const tabs = $('.accordion__tab');

	if (tabs && tabs.length > 0) {
		tabs.on('click', function () {
			const tabsContentCurrent = $(this).parent().next();

			if (!$(this).hasClass('accordion__tab--active')) {
				$(this).addClass('accordion__tab--active');
				tabsContentCurrent.stop().slideDown(300);
			} else {
				$(this).removeClass('accordion__tab--active');
				tabsContentCurrent.stop().slideUp(300);
			}

		});
	}

	$(window).on("scroll", () => {
		tabs.each(function () {
			if ($(this)[0].getBoundingClientRect().top < $(window).height() / 3 && !$(this).hasClass("scrolled")) {
				const tabsContentCurrent = $(this).parent().next();
				$(this).addClass("accordion__tab--active scrolled");
				tabsContentCurrent.stop().slideDown(300);
			}
		});
	});

	const select = $('.catalog__select');
	const catalogContents = $('.catalog__grid');
	if (select && select.length > 0) {
		select.select2({
			minimumResultsForSearch: -1
		});

		$('.catalog__select').on('select2:select', function () {
			catalogContents.hide();

			$(`.catalog__grid[data-tab="${$('.catalog__select').val()}"]`).fadeIn(300).css('display', 'grid');
		});
	}

	/* Количество символов после запятой */
	const getNumberLengthAfterComma = x => (x.toString().includes('.') ? x.toString().split('.').pop().length : 0);

	const getNumbers = () => {
		const odometerElems = document.querySelectorAll('.odometer-value');
		const regex = /[0-9]*[.,]?[0-9]+/g;
		let nums = [];

		odometerElems.forEach(el => {
			nums.push(el.innerHTML.trim().match(regex));
		});

		return nums.flat(1);
	};

	const odometerElems = document.querySelectorAll(".odometer-value");
	let od = [];
	const numbers = getNumbers();

	const initOdometer = () => {
		odometerElems.forEach((el, i) => {
			const odometerNumber = numbers[i];
			let iterator = getNumberLengthAfterComma(odometerNumber);
			let digitsLength = '';
			for (let i = 0; i < iterator; i++) {
				digitsLength += 'd';
			}

			od[i] = new Odometer({
				el: el,
				format: getNumberLengthAfterComma(odometerNumber) === 0 ? 'd' : `(ddd).${digitsLength}`,
				theme: 'default',
				value: odometerNumber.replace(/[0-9]*[.,]?[0-9]+/, '0')
			});

			od[i].update(odometerNumber);
		});
	}

	const sectionStatistics = document.querySelector(".statistics");
	if (sectionStatistics) {
		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						initOdometer();
					} else {
						odometerElems.forEach((el, i) => {
							od[i].update(0);
						});
					}
				})
			}
		);

		sectionObserver.observe(sectionStatistics);

		initOdometer();
	}

	/* Анимация появления заголовка на первом экране */
	const heroTitle = document.querySelectorAll(".hero__title-part");
	if (heroTitle && heroTitle.length > 0) {
		heroTitle.forEach((el, i) => {
			setTimeout(() => {
				el.classList.add("hero__title-part--fade");
			}, 200 * i);
		});
	}

	/* Анимация появления преимуществ на первом экране */
	const heroAdvantages = document.querySelectorAll(".advantages");
	if (heroAdvantages && heroAdvantages.length > 0) {
		heroAdvantages.forEach((el, i) => {
			setTimeout(() => {
				el.classList.add("advantages--fade");
			}, 200 * i + 400);
		});
	}

	/* Анимация появления хэдера */
	const header = document.querySelector(".header");
	if (header) {
		header.classList.remove("header--hidden");
	}

	/* Анимация появления секций */
	const sections = document.querySelectorAll("section");
	if (sections && sections.length > 0) {
		sections.forEach((el) => {
			el.removeAttribute("invisible");
		});
	}

	/* Модалка для формы обратной связи */
	const modalFeedback = new HystModal({
		linkAttributeName: "data-hystmodal",
		beforeOpen: function (modal) {
			const product = $('.ss-item-type-text input');
			product.val($(".select2-selection__rendered").text());

			/* Маска для телефона */
			$('input[type="tel"]').inputmask("+7 (999) 999 99 99", {
				showMaskOnHover: false
			});
		}
	});

	/* Галерея картинок в модалке */
	var galleryItem = $(".article-block img");

	if (galleryItem && galleryItem.length > 0) {
		galleryItem.each(function () {
			$(this).wrap('<a href="' + $(this).attr("src") + '" data-lightbox="image"></a>');
		});

		lightbox.option({
			'showImageNumberLabel': false
		})
	}
});
