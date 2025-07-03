document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchInputModal = document.getElementById('search-input-modal');
    const oftenSearched = document.getElementById('often-searched');
    const content = document.querySelector('.content');
    const btnBack = document.querySelector('.often-searched__btn-back');
    const listItems = document.querySelectorAll('.searched__list-item .game-status-card__title');
    const searchCloseBtn = document.querySelector('.header__search-close-btn');
    const foundItems = document.querySelectorAll('.found__list-item .game-status-card__title');
    const body = document.body;
    const clearInputBtn = document.querySelector('.often-searched__search-close-btn');
    const oftenSearchInput = document.getElementById('often-searched-input');
    let scrollPosition = 0;
    let isScrollDisabled = false;
    let isSearchFocused = false;

    if (!oftenSearched) {
        return;
    }

    const disableScroll = () => {
        if (!isScrollDisabled) {
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            body.style.position = 'fixed';
            body.style.top = `-${scrollPosition}px`;
            body.style.left = '0';
            body.style.right = '0';
            body.style.overflow = 'hidden';
            body.style.width = '100%';
            isScrollDisabled = true;
        }
    };

    const enableScroll = () => {
        if (isScrollDisabled) {
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            body.style.overflow = '';
            body.style.width = '';
            window.scrollTo(0, scrollPosition);
            isScrollDisabled = false;
        }
    };

    function toggleCloseButton(inputElement, closeButton) {
        if (inputElement && inputElement.value.length > 0) {
            closeButton.style.display = 'block';
        } else {
            closeButton.style.display = 'none';
        }
    }

    function syncInputs(sourceInput, targetInput, closeButton) {
        targetInput.value = sourceInput.value;
        toggleCloseButton(targetInput, closeButton);
        toggleCloseButton(sourceInput, searchCloseBtn);
    }

    searchInput && searchInput.addEventListener('focus', function (e) {
        isSearchFocused = true;
        e.stopPropagation();
        oftenSearched.classList.add('visible');
        content.classList.add('wrapper_blur');

        if (window.innerWidth < 768 && oftenSearchInput) {
            setTimeout(() => {
                searchInput.blur();
                oftenSearchInput.focus();
            }, 10);
        }

        disableScroll();
    });

    searchInput && searchInput.addEventListener('input', function () {
        highlightSearchQuery(searchInput);
        toggleCloseButton(searchInput, searchCloseBtn);
        syncInputs(searchInput, oftenSearchInput, clearInputBtn);  // Синхронизация текста между инпутами
    });

    searchCloseBtn && searchCloseBtn.addEventListener('click', function () {
        if (searchInput) {
            searchInput.value = '';
            toggleCloseButton(searchInput, searchCloseBtn);
            syncInputs(searchInput, oftenSearchInput, clearInputBtn);
            highlightSearchQuery(searchInput);
        }
    });

    searchInputModal && searchInputModal.addEventListener('input', function () {
        highlightSearchQuery(searchInputModal);
    });

    clearInputBtn && clearInputBtn.addEventListener('click', function () {
        if (oftenSearchInput) {
            oftenSearchInput.value = '';
            toggleCloseButton(oftenSearchInput, clearInputBtn);
            syncInputs(oftenSearchInput, searchInput, searchCloseBtn);  // Синхронизируем удаление текста
            oftenSearchInput.focus();
            highlightSearchQuery(oftenSearchInput);
        }
    });

    oftenSearchInput && oftenSearchInput.addEventListener('input', function () {
        highlightSearchQuery(oftenSearchInput);
        toggleCloseButton(oftenSearchInput, clearInputBtn);
        syncInputs(oftenSearchInput, searchInput, searchCloseBtn);  // Синхронизация текста между инпутами
    });

    oftenSearched.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function (event) {
        if (!isSearchFocused && !oftenSearched.contains(event.target) && !searchInput.contains(event.target)) {
            oftenSearched.classList.remove('visible');
            content.classList.remove('wrapper_blur');
            enableScroll();
        }
        isSearchFocused = false;
    });

    btnBack && btnBack.addEventListener('click', function () {
        oftenSearched.classList.remove('visible');
        content.classList.remove('wrapper_blur');
        enableScroll();
    });

    const highlightSearchQuery = (inputElement) => {
        const query = inputElement.value.toLowerCase();
        const regex = new RegExp(`(${query})`, 'gi');

        listItems.forEach(item => {
            const text = item.textContent;
            item.innerHTML = text.replace(regex, '<span style="color: var(--main-blue);">$1</span>');
        });

        foundItems.forEach(item => {
            const text = item.textContent;
            item.innerHTML = text.replace(regex, '<span style="color: var(--main-blue);">$1</span>');
        });
    };

    searchInput && toggleCloseButton(searchInput, searchCloseBtn);
    oftenSearchInput && toggleCloseButton(oftenSearchInput, clearInputBtn);
});
