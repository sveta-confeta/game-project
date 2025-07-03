document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.querySelector('.favorites-menu');
    const btnOpenModal = document.getElementById('mobile-menu-favorites');
    const closeBtn = document.querySelector('.favorites-menu__top-btn');
    const body = document.body;

    function closeModal() {
        mobileMenu.classList.add('visually-hidden');
        body.style.overflow = 'auto';
    }

    function openModal() {
        mobileMenu.classList.remove('visually-hidden');
        body.style.overflow = 'hidden';
    }

    closeBtn && closeBtn.addEventListener('click', function () {
        closeModal();
    });
    btnOpenModal && btnOpenModal.addEventListener('click', function () {
        openModal();
    });
});
