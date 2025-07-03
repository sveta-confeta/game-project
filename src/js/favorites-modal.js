document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('favorites-modal');
    const btnOpenModal = document.getElementById('help-modal-favorites');
    const closeBtn = document.querySelector('.favorites-modal__close-btn');
    // const body = document.body;
    const myFavoritesContainer = mobileMenu.querySelector('.favorites-modal__list');
    const items = myFavoritesContainer.querySelectorAll('.favorites-modal__list-item');

    if (items.length === 3) {
        myFavoritesContainer.classList.add('three-items');
        myFavoritesContainer.classList.remove('four-items');
    } else if (items.length === 4) {
        myFavoritesContainer.classList.add('four-items');
        myFavoritesContainer.classList.remove('three-items');
    }



    function closeModal() {
        mobileMenu.classList.add('visually-hidden');
        // body.style.overflow = 'auto';
    }

    function openModal() {
        mobileMenu.classList.remove('visually-hidden');
        // body.style.overflow = 'hidden';
    }
    closeBtn && closeBtn.addEventListener('click', function () {
        closeModal();
    });
    btnOpenModal && btnOpenModal.addEventListener('click', function () {
        openModal();
    });
});
