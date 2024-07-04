document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".header");
	const headerOffset = header.offsetTop;
	let headerHeight = header.offsetHeight;
	let scroll = window.pageYOffset;
	let isScroll = false;
	let scrollPrev = 0;

	const initHeader = () => {
		window.addEventListener("scroll", scrollHeaderHandler);
	}

	const destroyHeaderStyles = () => {
		window.removeEventListener("scroll", scrollHeaderHandler);
		header.classList.remove("header--opened");
		header.removeAttribute("style");
	}

	const scrollHeaderHandler = () => {
		scroll = window.pageYOffset;

		if (scroll >= headerOffset + headerHeight / 2) {
			header.style.backgroundColor = "#fff";

			if (scroll > scrollPrev) {
				isScroll = true;

				headerHeight = isScroll ? header.offsetHeight : null;
				header.classList.remove("header--opened");
				header.style.top = `${-headerHeight}px`;
			} else {
				isScroll = false;
				header.classList.add("header--opened");
				header.style.top = "0";
			}
		} else {
			header.style.backgroundColor = "transparent";
			header.classList.remove("header--opened");
		}

		scrollPrev = scroll;
	}

	const headerResizeObserver = new ResizeObserver((entries) => {
		const [entry] = entries;

		if (entry.contentRect.width > 991) {
			initHeader();
		} else {
			destroyHeaderStyles();
		}
	});

	headerResizeObserver.observe(header);

	initHeader();
	scrollHeaderHandler();
});