document.addEventListener('DOMContentLoaded', function () {
    const currencyElement = document.querySelector('.header .currency-btn');
    const currencyElementArrow = document.querySelector('.header .currency-btn .icon--arrow-small');
    const modalElement = document.getElementById('currency-modal');
    const oftenSearched = document.getElementById('often-searched');

    if (!currencyElement || !modalElement) {
        return;
    }

    function closeOftenSearchedModal() {
        if (oftenSearched && oftenSearched.classList.contains('visible')) {
            oftenSearched.classList.remove('visible');
            document.body.classList.remove('no-scroll');
            document.querySelector('.content').classList.remove('wrapper_blur');
        }
    }

    function toggleModal() {
        modalElement.classList.toggle('hidden');
        if (modalElement.classList.contains('hidden')) {
            // Возвращаем стрелку в исходное положение
            currencyElementArrow.style.transform = 'rotate(0deg)';
        } else {
            // Поворачиваем стрелку при открытии модалки
            currencyElementArrow.style.transform = 'rotate(180deg)';
        }
    }

    currencyElement.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleModal();
        closeOftenSearchedModal();
    });

    document.addEventListener('click', function (event) {
        if (!modalElement.contains(event.target) && !currencyElement.contains(event.target)) {
            if (!modalElement.classList.contains('hidden')) {
                toggleModal();  // Закрываем модалку и сбрасываем стрелку
            }
        }
    });

    modalElement.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
