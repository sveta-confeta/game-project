document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.accept-cookies-modal__btn');
    const acceptCookiesModal = document.getElementById('accept-cookies-modal');
    const acceptAll = document.getElementById('accept-all');

    if (!acceptCookiesModal && !buttons) {
        return;
    }
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    acceptAll.addEventListener('click', function() {
        acceptCookiesModal.classList.add('visually-hidden');
    })
});