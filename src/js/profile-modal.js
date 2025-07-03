document.addEventListener('DOMContentLoaded', function () {
    const currencyElement = document.querySelector('.header__auth');
    const modalProfileElement = document.getElementById('profile-modal');
    const contentElement = document.querySelector('.content');
    const profileModalArrow = document.querySelector('.header__auth .header__auth-arrow-btn');
    const profileModalGgoOut = modalProfileElement?.querySelector('.profile-modal__go-out');
    const oftenSearched = document.getElementById('often-searched');
    const helpModal = document.getElementById('help-modal');
    const helpArrow = document.querySelector('.header__menu-item-link .icon--arrow-small');
    const body = document.body;

    function closeOftenSearchedModal() {
        if (oftenSearched && oftenSearched.classList.contains('visible')) {
            oftenSearched.classList.remove('visible');
            contentElement.classList.remove('wrapper_blur');
            document.body.classList.remove('no-scroll');
        }
    }
    function closeHelpModal() {
        if (helpModal) {
            helpModal.classList.add('visually-hidden');
            helpArrow.style.transform = 'rotate(0deg)';
        }
    }

    if (!window.matchMedia('(min-width: 1024px)').matches) {
        return;
    }

    function handleScreenSize() {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            if (!currencyElement) {
                return;
            }

            currencyElement.addEventListener('click', function(event) {
                event.stopPropagation();
                closeOftenSearchedModal();
                closeHelpModal()
                modalProfileElement.classList.toggle('hidden');

                if (!modalProfileElement.classList.contains('hidden')) {
                    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
                    profileModalArrow.style.transform = 'rotate(-180deg)';
                    contentElement.classList.add('disable-pointer-events');
                    document.body.classList.add('no-scroll');
                    body.style.paddingRight = `${scrollBarWidth}px`;
                } else {
                    profileModalArrow.style.transform = 'rotate(0deg)';
                    contentElement.classList.remove('disable-pointer-events');
                    document.body.classList.remove('no-scroll');
                    body.style.paddingRight = '';
                }
            });

            document.addEventListener('click', function(event) {
                if (!modalProfileElement.contains(event.target) && !currencyElement.contains(event.target)) {
                    modalProfileElement.classList.add('hidden');
                    profileModalArrow.style.transform = 'rotate(0deg)';
                    contentElement.classList.remove('disable-pointer-events');
                    document.body.classList.remove('no-scroll');
                    body.style.paddingRight = '';
                }
            });

            profileModalGgoOut.addEventListener('click', function(event) {
                modalProfileElement.classList.add('hidden');
                profileModalArrow.style.transform = 'rotate(0deg)';
                contentElement.classList.remove('disable-pointer-events');
                document.body.classList.remove('no-scroll');
                body.style.paddingRight = '';
            });

            modalProfileElement.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    }

    handleScreenSize();

    window.addEventListener('resize', handleScreenSize);

    const goOut = document.querySelector('.profile-modal__go-out');
        goOut && goOut.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.header__unregistered').forEach(function(element) {
            element.classList.remove('is-hidden');
        });

        document.querySelectorAll('.header__registered').forEach(function(element) {
            element.classList.add('is-hidden');
        });
    });
});


