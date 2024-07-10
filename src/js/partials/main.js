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

	$('.catalog__select').select2({
		minimumResultsForSearch: -1
	});

	const catalogContents = $('.catalog__grid');
	$('.catalog__select').on('select2:select', function () {
		catalogContents.hide();

		$(`.catalog__grid[data-tab="${$('.catalog__select').val()}"]`).fadeIn(300).css('display', 'grid');
	});

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

	sectionObserver.observe(document.querySelector(".statistics"));

	initOdometer();

	/* Анимация появления заголовка на первом экране */
	const heroTitle = document.querySelectorAll(".hero__title-part");
	heroTitle.forEach((el, i) => {
		setTimeout(() => {
			el.classList.add("hero__title-part--fade");
		}, 200 * i);
	});

	/* Анимация появления преимуществ на первом экране */
	const heroAdvantages = document.querySelectorAll(".advantages");
	heroAdvantages.forEach((el, i) => {
		setTimeout(() => {
			el.classList.add("advantages--fade");
		}, 200 * i + 400);
	});

	/* Анимация появления хэдера */
	const header = document.querySelector(".header");
	header.classList.remove("header--hidden");

	/* Анимация появления секций */
	const sections = document.querySelectorAll("section");
	sections.forEach((el) => {
		el.removeAttribute("invisible");
	});
});
