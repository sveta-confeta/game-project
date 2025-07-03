document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuAuthBtn = document.querySelector('.mobile-menu__auth-btn');
    const authButton = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const body = document.body;
    const tabsBtn = document.querySelectorAll('.auth-modal__tabs-item-btn');
    const tabsContent = document.querySelectorAll('.auth-modal__tabs-content');
    const forgotPasswordLink = document.querySelector('.login__link');
    const loginInput = document.getElementById('login-name');
    const loginBtn = document.querySelector('.login__btn');
    const registrationNickname = document.getElementById('registration-nickname');
    const registrationEmail = document.getElementById('registration-email');
    const registrationBtn = document.querySelector('.registration__button');
    const recoveryNickname = document.getElementById('recovery-nickname');
    const recoveryBtn = document.querySelector('.recovery__btn');
    const closeModalBtn = authModal.querySelector('.auth-modal__close-btn');
    const backBtn = authModal.querySelector('.auth-modal__header-back');
    const activeTab = document.querySelector('.auth-modal__tabs-item-btn--active');
    const existingAccountLink = document.getElementById('existing-account-link');
    const unregisteredUserBtn = document.getElementById('unregistered-user-btn');
    const oftenSearched = document.getElementById('often-searched');

    function closeOftenSearchedModal() {
        if (oftenSearched && oftenSearched.classList.contains('visible')) {
            oftenSearched.classList.remove('visible');
            document.body.classList.remove('no-scroll');
            document.querySelector('.content').classList.remove('wrapper_blur');
        }
    }

    function toggleAuthModal() {
        const isHidden = authModal.style.display === 'none' || authModal.style.display === '';
        authModal.style.display = isHidden ? 'flex' : 'none';
        body.style.overflow = isHidden ? 'hidden' : 'auto';
    }

    function handleModalToggle(e) {
        closeOftenSearchedModal();
        e.stopPropagation();
        toggleAuthModal();

    }

    //открытие модалки
    authButton?.addEventListener('click', handleModalToggle);
    mobileMenuAuthBtn?.addEventListener('click', handleModalToggle);
    unregisteredUserBtn?.addEventListener('click', handleModalToggle);

    function tabsHandler(tabsPath, isTabButton) {
        if (isTabButton) {
            tabsBtn.forEach(btn => {
                btn.classList.remove('auth-modal__tabs-item-btn--active');
                btn.setAttribute('aria-selected', 'false');
            });
            const activeBtn = document.querySelector(`.auth-modal__tabs-item-btn[data-tabs-path="${tabsPath}"]`);
            activeBtn.classList.add('auth-modal__tabs-item-btn--active');
            activeBtn.setAttribute('aria-selected', 'true');
        }
        tabsContent.forEach(content => {
            content.classList.remove('auth-modal__tabs-content--active');
        });
        document.querySelector(`.auth-modal__tabs-content[data-tabs-target="${tabsPath}"]`).classList.add('auth-modal__tabs-content--active');

        if (authModal.style.display === 'flex') {
            body.classList.add('no-scroll-all');
        }
    }

    if (tabsBtn.length > 0 && tabsContent.length > 0) {
        if (activeTab) {
            tabsHandler(activeTab.dataset.tabsPath, true);
        } else {
            tabsHandler(tabsBtn[0].dataset.tabsPath, true);
        }
    }

    tabsBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabsPath = btn.dataset.tabsPath;
            tabsHandler(tabsPath, true);
        });
    });

    // Закрытие модального окна
    closeModalBtn && closeModalBtn.addEventListener('click', () => {
        authModal.classList.remove('active');
        authModal.style.display = 'none';
        body.style.overflow = 'auto';
        body.classList.remove('no-scroll-all');
    });

    // Вернуться назад
    backBtn && backBtn.addEventListener('click', () => {
        authModal.classList.remove('active');
        authModal.style.display = 'none';
        body.style.overflow = 'auto';
    });

    // Забыли пароль
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            tabsHandler('recovery');
        });
    }


  // вернутся "вход"
    if (existingAccountLink) {
        existingAccountLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            tabsHandler('login',true);
        });
    }

    // Валидация
    const validateInput = (input) => {
        const errorSpan = input.nextElementSibling;
        const infoSpan = errorSpan.nextElementSibling;
        let isValid = true;

        if (input.id === 'registration-nickname') {
            const nicknamePattern = /^[a-zA-Z0-9]+$/;
            if (!input.value.trim()) {
                errorSpan.textContent = 'Поле должно быть заполнено';
                isValid = false;
            } else if (!nicknamePattern.test(input.value)) {
                errorSpan.textContent = 'Имя или ник должен содержать только латинские буквы и цифры';
                isValid = false;
            } else {
                errorSpan.textContent = '';
            }
        } else if (input.id === 'registration-email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!input.value.trim()) {
                errorSpan.textContent = 'Поле должно быть заполнено';
                isValid = false;
            } else if (!emailPattern.test(input.value)) {
                errorSpan.textContent = 'Введите корректный email';
                isValid = false;
            } else {
                errorSpan.textContent = '';
            }
        } else if (input.id === 'recovery-nickname') {
            if (!input.value.trim()) {
                errorSpan.textContent = 'Поле должно быть заполнено';
                isValid = false;
            } else {
                errorSpan.textContent = '';
            }
        } else {
            if (input.value.trim() === '') {
                errorSpan.textContent = 'Поле должно быть заполнено';
                isValid = false;
            } else {
                errorSpan.textContent = '';
            }
        }

        if (isValid) {
            input.classList.remove('input--error');
            input.classList.add('input--successful');
            if (infoSpan) {
                infoSpan.style.display = 'inline';
            }
        } else {
            input.classList.add('input--error');
            input.classList.remove('input--successful');
            if (infoSpan) {
                infoSpan.style.display = 'none';
            }
        }
    };

    loginBtn.addEventListener('click', function(event) {
        event.preventDefault();
        validateInput(loginInput);
    });

    loginInput.addEventListener('blur', function() {
        validateInput(loginInput);
    });

    registrationBtn.addEventListener('click', function(event) {
        event.preventDefault();
        validateInput(registrationNickname);
        validateInput(registrationEmail);
    });

    registrationNickname.addEventListener('blur', function() {
        validateInput(registrationNickname);
    });

    registrationEmail.addEventListener('blur', function() {
        validateInput(registrationEmail);
    });

    recoveryBtn.addEventListener('click', function(event) {
        event.preventDefault();
        validateInput(recoveryNickname);
    });

    recoveryNickname.addEventListener('blur', function() {
        validateInput(recoveryNickname);
    });

    loginBtn && loginBtn.addEventListener('click', function(e) {
        e.preventDefault();

        validateInput(loginInput);
        const hasErrors = loginInput.classList.contains('input--error');
        if (!hasErrors) {
            document.querySelectorAll('.header__registered').forEach(function(element) {
                element.classList.remove('is-hidden');
            });

            document.querySelectorAll('.header__unregistered').forEach(function(element) {
                element.classList.add('is-hidden');
            });
            authModal.classList.remove('active');
            authModal.style.display = 'none';
            body.style.overflow = 'auto';
            body.classList.remove('no-scroll-all');
        }
    });

});
