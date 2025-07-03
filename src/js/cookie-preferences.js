document.addEventListener('DOMContentLoaded', function () {
    const cookiePolicyBtn = document.getElementById('cookie-policy');
    const closeButton = document.querySelector('.cookie-preferences__btn');
    const modal = document.getElementById('cookie-preferences');
    const saveButton = document.querySelector('.cookie-preferences__btn-save');
    const agreeButton = document.querySelector('.cookie-preferences__btn-agree');
    const toggleButton = document.getElementById('toggle-button');
    const examplesBlock = document.getElementById('examples-block');
    const body = document.body;

    if (!cookiePolicyBtn) {
        return;
    }
    cookiePolicyBtn.addEventListener('click', function () {
        if (modal && modal.style.display === 'none') {
            window.scrollTo(0, 0);
            modal.style.display = 'block';
            setTimeout(function() {
                body.style.overflow = 'hidden';
            }, 100);
        }
    });

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            body.style.overflow = 'auto';
        });
    }

    function toggleActiveButton(activeBtn, inactiveBtn) {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
    }

    saveButton.addEventListener('click', function () {
        toggleActiveButton(saveButton, agreeButton);
    });

    agreeButton.addEventListener('click', function () {
        toggleActiveButton(agreeButton, saveButton);
    });

    if (toggleButton && examplesBlock) {
        toggleButton.addEventListener('click', function() {
            if (examplesBlock.classList.contains('show')) {
                examplesBlock.classList.remove('show');
                toggleButton.textContent = 'Examples (click to expand)';
            } else {
                examplesBlock.classList.add('show');
                toggleButton.textContent = 'Examples (click to collapse)';
            }
        });
    }
});
