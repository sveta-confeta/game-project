document.addEventListener('DOMContentLoaded', function () {
    const passwordInputs = document.querySelectorAll('.input-password');
    const inputWraps = document.querySelectorAll('.input-wrap');
    const loginPassword = document.getElementById('login-password');
    const registrationPassword = document.getElementById('registration-password');
    const loginBtn = document.querySelector('.login__btn');
   const registrationBtn = document.querySelector('.registration__button');

    if (!inputWraps) {
        return;
    }

    inputWraps.forEach(function (inputWrap) {
        const input = inputWrap.querySelector('.input-password');
        if (input) {
            input.addEventListener('input', function () {
                if (input.value.trim() !== '') {
                    inputWrap.style.border = '1px solid var(--link-color)';
                } else {
                    inputWrap.style.border = '';
                }
            });
        }
    });

    passwordInputs.forEach(function (input) {
        const button = input.nextElementSibling;

        button.addEventListener('click', function () {
            if (input.type === 'password') {
                input.type = 'text';
                button.querySelector('.show-password').style.display = 'none';
                button.querySelector('.hide-password').style.display = 'inline';
            } else {
                input.type = 'password';
                button.querySelector('.show-password').style.display = 'inline';
                button.querySelector('.hide-password').style.display = 'none';
            }
        });
    });



    const validatePasswordInput = (input) => {
        const inputWrap = input.closest('.input-wrap');
        const errorSpan = inputWrap.nextElementSibling; // Получаем span для ошибок
        const infoSpan = errorSpan.nextElementSibling; // Получаем span для информации
        if (input.value.trim().length < 6) {
            inputWrap.classList.add('input--error');
            infoSpan.classList.remove('inputInfo');
            infoSpan.style.display = 'none';
            errorSpan.textContent = 'Неверный пароль';
        } else {
            inputWrap.classList.remove('input--error');
            infoSpan.classList.add('inputInfo');
            infoSpan.style.display = 'block';
            errorSpan.textContent = '';
        }
    };

    if (loginBtn && loginPassword) {
        loginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            validatePasswordInput(loginPassword);
        });

        loginPassword.addEventListener('blur', function() {
            validatePasswordInput(loginPassword);
        });
    }
    if (registrationBtn && registrationPassword) {
        registrationBtn.addEventListener('click', function(event) {
            event.preventDefault();
            validatePasswordInput(registrationPassword);
        });

        registrationPassword.addEventListener('blur', function() {
            validatePasswordInput(registrationPassword);
        });
    }
});
