document.addEventListener('DOMContentLoaded', function () {
	const mobileMenu = document.querySelector('.mobile-menu');
	const btnOpenModal = document.querySelector('.header__auth');
	const closeBtn = document.querySelector('.mobile-menu__header-close-btn');
	const body = document.body;

	if (!window.matchMedia('(max-width: 1024px)').matches) {
		return;
	}

	function closeModal() {
		mobileMenu.classList.add('visually-hidden');
		body.classList.remove('no-scroll-all');
	}

	function openModal() {
		mobileMenu.classList.remove('visually-hidden');
		setTimeout(() => {
			body.classList.add('no-scroll-all');
		}, 0);
	}

	closeBtn && closeBtn.addEventListener('click', function () {
		closeModal();
	});
	btnOpenModal && btnOpenModal.addEventListener('click', function () {
		openModal();
	});
});
