document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.currency__custom-select');
    const currencyWraps = document.querySelectorAll('.currency__currency-wrap');
    const mobileMenu = document.querySelector('.mobile-menu.container');
    const modalElement = document.getElementById('currency-modal');
    const initModalHeight = 137;

    const adjustModalHeight = (height) => {
        if (modalElement) {
            modalElement.style.transition = 'height 0.3s';
            modalElement.style.height = `${height}px`;
        }
    };

    customSelects.forEach(customSelect => {
        const selectSelected = customSelect.querySelector('.currency__custom-select-selected');
        const selectItems = customSelect.querySelector('.currency__select-items');

        const closeSelectItems = () => {
            selectItems.style.display = 'none';
            customSelect.classList.remove('select-active');
            mobileMenu.classList.remove('no-scroll-all');
            if (modalElement) {
                adjustModalHeight(initModalHeight);
            }
        };

        const openSelectItems = () => {
            selectItems.style.display = 'block';
            customSelect.classList.add('select-active');
            setTimeout(() => {
                mobileMenu.classList.add('no-scroll-all');
            }, 0);
            if (modalElement) {
                adjustModalHeight(modalElement.scrollHeight + (selectSelected.offsetHeight - 28));
            }
        };

        selectSelected.addEventListener('click', function () {
            if (selectItems.style.display === 'none') {
                openSelectItems();
            } else {
                closeSelectItems();
            }
        });

        selectItems.addEventListener('click', function (e) {
            const selectedItemWrap = e.target.closest('.currency__select-item');
            if (selectedItemWrap) {
                selectItems.querySelectorAll('.currency__select-item').forEach(item => {
                    item.classList.remove('selected');
                });
                selectedItemWrap.classList.add('selected');

                const valueSpan = selectedItemWrap.querySelector('span').textContent;
                selectSelected.querySelector('span').textContent = valueSpan;
                closeSelectItems();
            }
        });

        document.addEventListener('click', function (e) {
            if (!customSelect.contains(e.target)) {
                closeSelectItems();
            }
        });

        const defaultOptionWrap = selectItems.querySelector('.currency__select-item');
        if (defaultOptionWrap) {
            const defaultValue = defaultOptionWrap.querySelector('span').textContent;
            selectSelected.querySelector('span').textContent = defaultValue;
            defaultOptionWrap.classList.add('selected');
        }
    });

    currencyWraps.forEach(currencyWrap => {
        const currencyButtons = currencyWrap.querySelectorAll('.currency__currency-item');

        currencyButtons.forEach(button => {
            button.addEventListener('click', function() {
                currencyButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    });
});