document.addEventListener('DOMContentLoaded', function () {
    const helpButton = document.getElementById('help');
    const helpModal = document.getElementById('help-modal');
    const oftenSearched = document.getElementById('often-searched');
    const modalItems = document.querySelectorAll('.help-modal__list-item');
    const helpArrow = document.querySelector('.header__menu-item-link .icon--arrow-small');
    const profileModal = document.getElementById('profile-modal');
    const profileModalArrow = document.querySelector('.header__auth .header__auth-arrow-btn');
    const body = document.body;

    function closeOftenSearchedModal() {
        if (oftenSearched && oftenSearched.classList.contains('visible')) {
            oftenSearched.classList.remove('visible');
            document.body.classList.remove('no-scroll');
            document.querySelector('.content').classList.remove('wrapper_blur');
        }
    }

    function closeProfileModal() {
        if (profileModal) {
            profileModal.classList.add('hidden');
            profileModalArrow.style.transform = 'rotate(0deg)';
        }
    }

    function openModal() {
        closeOftenSearchedModal();
        closeProfileModal();
        helpModal.classList.remove('visually-hidden');
        helpArrow.style.transform = 'rotate(-180deg)';
        document.body.classList.add('no-scroll');
    }

    function closeModal() {
        helpModal.classList.add('visually-hidden');
        helpArrow.style.transform = 'rotate(0deg)';
        document.body.classList.remove('no-scroll');
    }

    helpButton.addEventListener('click', function (event) {
        event.stopPropagation();

        if (helpModal.classList.contains('visually-hidden')) {
            openModal();
        } else {
            closeModal();
        }
    });

    modalItems.forEach(item => {
        item.addEventListener('click', function () {
            closeModal();
        });
    });

    document.addEventListener('click', function (event) {
        if (!helpModal.contains(event.target) && !helpButton.contains(event.target)) {
            closeModal();
        }
    });

    helpModal.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
